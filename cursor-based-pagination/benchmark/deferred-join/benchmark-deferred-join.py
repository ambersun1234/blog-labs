import os
import requests
import time


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
    deferred_join = "deferred-join"
    
    cdir = os.path.dirname(os.path.abspath(__file__))

    limit = 10000

    page_start_round = 1
    round_offset = 5
    page_end_round = 301

    with open(os.path.join(cdir, f"{deferred_join}-page-benchmark.txt"), "w") as f:
        for i in range(page_start_round, page_end_round + 1, round_offset):
            address = f"http://localhost:3000/users/page/order?pageNumber={i}&pageLimit={limit}"
            benchmark((i - 1) * limit)

    with open(os.path.join(cdir, f"{deferred_join}-pi-benchmark.txt"), "w") as f:
        for i in range(page_start_round, page_end_round + 1, round_offset):
            address = f"http://localhost:3000/users/deferred/pi/order?pageNumber={i}&pageLimit={limit}"
            benchmark((i - 1) * limit)


    with open(os.path.join(cdir, f"{deferred_join}-si-benchmark.txt"), "w") as f:
        for i in range(page_start_round, page_end_round + 1, round_offset):
            address = f"http://localhost:3000/users/deferred/si/order?pageNumber={i}&pageLimit={limit}"
            benchmark((i - 1) * limit)

    with open(os.path.join(cdir, f"{deferred_join}-cursor-benchmark.txt"), "w") as f:
        last_username = None
        last_id = None

        for i in range(page_start_round, page_end_round + 1, round_offset):
            if last_username is None or last_id is None:
                address = f"http://localhost:3000/users/cursor/order?pageLimit={limit}"
            else:
                address = f"http://localhost:3000/users/cursor/order?lastUsername={last_username}&lastId={last_id}&pageLimit={limit}"

            r = benchmark((i - 1) * limit)
            data = r.json()

            last_item = data['data'][-1]
            last_username = last_item['username']
            last_id = last_item['id']
