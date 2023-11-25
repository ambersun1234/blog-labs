UNIQUE_PATH=./benchmark/unique
UNIQUE_LARGE_PATH=./benchmark/unique-large

init:
	@docker cp fakeData/unique.csv gist-gin-benchmark:/
	@docker cp fakeData/unique-large.csv gist-gin-benchmark:/
	@docker cp fakeData/str-array.csv gist-gin-benchmark:/
	@docker cp fakeData/str-array-large.csv gist-gin-benchmark:/

benchmark-unique:
	@taskset 0x1 npm run $@ && gnuplot $(UNIQUE_PATH)/plot.gp

benchmark-unique-large:
	@taskset 0x1 npm run $@ && gnuplot $(UNIQUE_LARGE_PATH)/plot.gp