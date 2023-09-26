UNIQUE_PATH=./benchmark/unique
UNIQUE_LARGE_PATH=./benchmark/unique-large

benchmark-unique:
	@taskset 0x1 npm run $@ && gnuplot $(UNIQUE_PATH)/plot.gp

benchmark-unique-large:
	@taskset 0x1 npm run $@ && gnuplot $(UNIQUE_LARGE_PATH)/plot.gp