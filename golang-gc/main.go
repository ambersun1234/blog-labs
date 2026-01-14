package main

import (
	"flag"
	"fmt"
	"os"
	"runtime"
	"runtime/debug"
	"time"
)

func main() {
	debug.SetGCPercent(-1)

	var filename string
	flag.StringVar(&filename, "filename", "", "the filename of the benchmark")
	flag.Parse()

	f, err := os.OpenFile(filename, os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	f.Truncate(0)

	for i := 1000; i <= 100000; i += 1000 {
		runExperiment(f, i)
	}
}

func runExperiment(f *os.File, count int) {
	ch := make(chan struct{})
	defer close(ch)

	for range count {
		go func() {
			time.Sleep(10 * time.Second)
			// <-ch
		}()
	}

	runtime.Gosched()

	start := time.Now()
	runtime.GC()
	elapsed := time.Since(start)

	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	// count,time,heap,stack,stw
	fmt.Printf("Goroutines: %7d | GC Pause: %v | HeapAlloc: %d MB | StackInuse: %d MB | STW: %v | cycle: %v\n",
		count, elapsed, m.HeapAlloc/1024/1024, m.StackInuse/1024/1024, time.Duration(m.PauseNs[(m.NumForcedGC+255)%256]), m.NumForcedGC)

	_, err := fmt.Fprintf(f, "%v %v %v %v %v\n", count, elapsed.Nanoseconds(), m.HeapAlloc, m.StackInuse, time.Duration(m.PauseNs[(m.NumForcedGC+255)%256]).Nanoseconds())
	if err != nil {
		panic(err)
	}

	time.Sleep(10 * time.Second)
}
