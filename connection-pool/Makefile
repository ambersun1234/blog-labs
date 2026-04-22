benchmark:
	taskset 0x1 go run main.go -mode=nopool -out nopool.txt -n 10000
	taskset 0x3 go run main.go -mode=pool -out pool.txt -n 10000

benchmark-concurrent:
	taskset 0x5 go run main-concurrent.go -n 1000 -c 10 -max 1

plot:
	gnuplot ./plot.gp

concurrent-plot:
	gnuplot ./concurrent-plot.gp

.PHONY: benchmakr plot
