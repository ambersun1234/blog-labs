# run make demo, make generate-user-csv, make generate-post-csv first

benchmark-deferred-join:
	@taskset 0xf uv run ./benchmark/deferred-join/benchmark-deferred-join.py
	@gnuplot ./benchmark/deferred-join/benchmark-deferred-join.gp

benchmark-deferred-join-subquery:
	@docker restart rest-db
	@sleep 5
	@taskset 0xf uv run ./benchmark/deferred-join-subquery/benchmark-deferred-join-subquery.py --index pi
	@docker restart rest-db
	@sleep 5
	@taskset 0xf uv run ./benchmark/deferred-join-subquery/benchmark-deferred-join-subquery.py --index si
	@cd ./benchmark/deferred-join-subquery && gnuplot benchmark-deferred-join-subquery.gp
	@cd ../..

benchmark-sort:
	@taskset 0xf uv run ./benchmark/cursor/benchmark-sort.py
	@gnuplot ./benchmark/cursor/benchmark-sort-plot.gp

benchmark:
	@taskset 0xf uv run ./benchmark/cursor/benchmark.py
	@gnuplot ./benchmark/cursor/benchmark-plot.gp
