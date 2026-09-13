# run make demo, make generate-user-csv, make generate-post-csv first

benchmark-deferred-join:
	@taskset 0xf uv run ./benchmark/deferred-join/benchmark-deferred-join.py
	@cd ./benchmark/deferred-join/ && gnuplot benchmark-deferred-join.gp
	@cd ../..

benchmark-deferred-join-subquery:
	@echo "testing sortasc"
	@docker restart rest-db
	@sleep 5
	@taskset 0xf uv run ./benchmark/deferred-join-subquery/benchmark-deferred-join-subquery.py --index pi --type sortasc
	@docker restart rest-db
	@sleep 5
	@taskset 0xf uv run ./benchmark/deferred-join-subquery/benchmark-deferred-join-subquery.py --index si --type sortasc
	@cd ./benchmark/deferred-join-subquery && gnuplot benchmark-deferred-join-withsort-subquery.gp
	@cd ../..
	@echo "testing sortdesc"
	@docker restart rest-db
	@sleep 5
	@taskset 0xf uv run ./benchmark/deferred-join-subquery/benchmark-deferred-join-subquery.py --index pi --type sortdesc
	@docker restart rest-db
	@sleep 5
	@taskset 0xf uv run ./benchmark/deferred-join-subquery/benchmark-deferred-join-subquery.py --index si --type sortdesc
	@cd ./benchmark/deferred-join-subquery && gnuplot benchmark-deferred-join-withsort-desc-subquery.gp
	@cd ../..
	@echo "testing nosort"
	@docker restart rest-db
	@sleep 5
	@taskset 0xf uv run ./benchmark/deferred-join-subquery/benchmark-deferred-join-subquery.py --index pi --type nosort
	@docker restart rest-db
	@sleep 5
	@taskset 0xf uv run ./benchmark/deferred-join-subquery/benchmark-deferred-join-subquery.py --index si --type nosort
	@cd ./benchmark/deferred-join-subquery && gnuplot benchmark-deferred-join-withoutsort-subquery.gp
	@cd ../..

benchmark-sort:
	@taskset 0xf uv run ./benchmark/cursor/benchmark-sort.py
	@gnuplot ./benchmark/cursor/benchmark-sort-plot.gp

benchmark:
	@taskset 0xf uv run ./benchmark/cursor/benchmark.py
	@gnuplot ./benchmark/cursor/benchmark-plot.gp
