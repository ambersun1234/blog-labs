import os
import requests
import time
import argparse


def benchmark(startIndex):
    start_time = time.perf_counter_ns()
    r = requests.get(
        address
    )
    end_time = time.perf_counter_ns()
    if r.status_code != 200:
        print(r.json())
        assert r.status_code == 200
    f.write(f"{startIndex} {end_time - start_time}\n")

    return r


if __name__ == "__main__":
    deferred_join_subquery = "deferred-join-subquery"

    parser = argparse.ArgumentParser(
        description="Benchmark testing for deferred join subquery")
    parser.add_argument("--index", type=str, required=True,
                        help="type of index")

    args = parser.parse_args()

    cdir = os.path.dirname(os.path.abspath(__file__))

    limit = 10000

    page_start_round = 1
    round_offset = 10
    page_end_round = 200

    match args.index:
        case "pi":
            with open(os.path.join(cdir, f"{deferred_join_subquery}-pi-benchmark.txt"), "w") as f:
                for i in range(page_start_round, page_end_round + 1, round_offset):
                    address = f"http://localhost:3000/users/deferred/pi/subquery?pageNumber={i}&pageLimit={limit}"
                    benchmark((i - 1) * limit)

        case "si":
            with open(os.path.join(cdir, f"{deferred_join_subquery}-si-benchmark.txt"), "w") as f:
                for i in range(page_start_round, page_end_round + 1, round_offset):
                    address = f"http://localhost:3000/users/deferred/si/subquery?pageNumber={i}&pageLimit={limit}"
                    benchmark((i - 1) * limit)
