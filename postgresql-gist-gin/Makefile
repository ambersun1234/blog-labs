UNIQUE_PATH=./benchmark/unique
UNIQUE_LARGE_PATH=./benchmark/unique-large
STR_ARRAY_PATH=./benchmark/string-array
STR_ARRAY_LARGE_PATH=./benchmark/string-array-large

init:
	@docker cp fakeData/unique.csv gist-gin-benchmark:/
	@docker cp fakeData/unique-large.csv gist-gin-benchmark:/
	@docker cp fakeData/str-array.csv gist-gin-benchmark:/
	@docker cp fakeData/str-array-large.csv gist-gin-benchmark:/

benchmark-unique:
	@taskset 0x1 npm run $@ && gnuplot $(UNIQUE_PATH)/plot.gp

benchmark-unique-large:
	@taskset 0x1 npm run $@ && gnuplot $(UNIQUE_LARGE_PATH)/plot.gp

benchmark-string-array:
	@taskset 0x1 npm run $@ && gnuplot $(STR_ARRAY_PATH)/plot.gp

benchmark-string-array-large:
	@taskset 0x1 npm run $@ && gnuplot $(STR_ARRAY_LARGE_PATH)/plot.gp