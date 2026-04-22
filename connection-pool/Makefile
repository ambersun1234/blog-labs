benchmark:
	go run main.go -mode=nopool -out nopool.txt -n 10000
	go run main.go -mode=pool -out pool.txt -n 10000

plot:
	gnuplot ./plot.gp

.PHONY: benchmakr plot
