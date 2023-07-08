import json
import requests
import time

def benchmark(startIndex):
    start_time = time.perf_counter_ns()
    r = requests.get(
        address
    )
    end_time = time.perf_counter_ns()
    assert r.status_code == 200
    f.write(f"{startIndex} {end_time - start_time}\n")

if __name__ == "__main__":
    round = 1000
    with open("slow-benchmark.txt", "w") as f:
        for i in range(1, round + 1):
            address = f"http://localhost:3000/users/slow?pageNumber={i}&pageLimit={10}"
            benchmark((i - 1) * 10)

    round = 9990
    with open("fast-benchmark.txt", "w") as f:
        for i in range(0, round + 1, 10):
            # cursor range from 0 to 9990
            address = f"http://localhost:3000/users/fast?cursor={i * 9}&pageLimit={10}"
            benchmark(i + 1)
