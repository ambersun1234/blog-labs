package main

import (
	"database/sql"
	"encoding/csv"
	"flag"
	"fmt"
	"log"
	"os"
	"sync"
	"time"

	_ "github.com/lib/pq"
)

func main() {
	iters := flag.Int("n", 100, "Total number of iterations")
	tasks := flag.Int("c", 10, "Number of tasks per iteration")
	concurrency := flag.Int("max", 3, "Concurrent connections in pool")
	flag.Parse()

	dsn := "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable"
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.Close()

	db.SetMaxOpenConns(*concurrency)
	db.SetMaxIdleConns(*concurrency)

	runBenchmark(db, "Concurrent", "conn.txt", *tasks, *concurrency, *iters)

	fmt.Println("\nBenchmark Completed!")
}

func runBenchmark(db *sql.DB, label string, filename string, tasks, concurrency int, totalIters int) {
	fmt.Printf("\n>>> Running %s...\n", label)

	file, err := os.Create(filename)
	if err != nil {
		log.Fatalf("Failed to create file: %v", err)
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	var mu sync.Mutex

	for r := 0; r < totalIters; r++ {
		var wg sync.WaitGroup
		for c := 0; c < tasks; c++ {
			wg.Add(1)
			go func(iteration, taskID int) {
				defer wg.Done()

				var result int
				start := time.Now()
				err := db.QueryRow("SELECT 1 FROM pg_sleep(0.1)").Scan(&result)
				if err != nil {
					return
				}
				duration := time.Since(start).Nanoseconds()

				mu.Lock()
				defer mu.Unlock()
				writer.Write([]string{
					fmt.Sprintf("%v %v", iteration*tasks+taskID, duration),
				})
			}(r, c)
		}
		wg.Wait()
		writer.Flush()
	}
	file.Sync()
}
