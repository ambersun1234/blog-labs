package main

import (
	"database/sql"
	"encoding/csv"
	"flag"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/lib/pq"
)

func main() {
	mode := flag.String("mode", "pool", "benchmark mode: \"pool\" or \"nopool\"")
	filename := flag.String("out", "result.csv", "output file name")
	iters := flag.Int("n", 10000, "iteration")
	flag.Parse()

	dsn := "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable"

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("cannot initialize postgresql connection: %v", err)
	}
	defer db.Close()

	if *mode == "nopool" {
		fmt.Println("mode set: no pool")
		db.SetMaxIdleConns(0)
		db.SetMaxOpenConns(0)
		db.SetConnMaxLifetime(time.Nanosecond)
	} else {
		fmt.Println("mode set: pool")
		db.SetMaxIdleConns(10)
		db.SetMaxOpenConns(100)
	}

	file, err := os.Create(*filename)
	if err != nil {
		log.Fatalf("cannot create: %v", err)
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	fmt.Printf("benchmarking (%d time)...\n", *iters)

	for i := 1; i <= *iters; i++ {
		start := time.Now()

		var result int
		err := db.QueryRow("SELECT 1").Scan(&result)
		if err != nil {
			i -= 1
			continue
		}

		duration := time.Since(start).Nanoseconds()
		writer.Write([]string{fmt.Sprintf("%v %v", i, duration)})

		if i%1000 == 0 {
			fmt.Printf("Finished %d...\n", i)
		}
	}

	fmt.Printf("Complete, benchmark test result has been saved to: %s\n", *filename)
}
