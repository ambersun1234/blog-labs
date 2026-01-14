benchmark-flood:
	@export GOEXPERIMENT= GODEBUG=gctrace=1
	@taskset 0x3 go run main.go --filename gc-benchmark.txt

benchmark-greentea:
	@export GOEXPERIMENT=greenteagc GODEBUG=gctrace=1
	@taskset 0x3 go run main.go --filename gc-greentea-benchmark.txt

plot:
	@gnuplot memory.gp
	@gnuplot gc-total.gp
	@gnuplot gc-swt.gp

.PHONY: benchmark-flood benchmark-greentea
