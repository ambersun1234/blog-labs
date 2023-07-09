import requests
import time
from datetime import date

def benchmark(startIndex):
    start_time = time.perf_counter_ns()
    r = requests.get(
        address
    )
    end_time = time.perf_counter_ns()
    assert r.status_code == 200
    f.write(f"{startIndex} {end_time - start_time}\n")
    return r.json()

if __name__ == "__main__":
    round = 9999

    with open("benchmark-sort0.txt", "w") as f:
        for i in range(0, round, 10):
            address = f"http://localhost:3000/users/fast?cursor={i}&pageLimit={10}"
            benchmark(i)

    with open("benchmark-sort1.txt", "w") as f:
        username = ""
        for i in range(0, round - 10, 10):
            # /users/sort-name?username=xxx&pageLimit=10
            address = f"http://localhost:3000/users/sort-name?username={username}&pageLimit={10}"
            response = benchmark(i)
            
            username = response["data"][9]["username"]

    with open("benchmark-sort2.txt", "w") as f:
        username = ""
        createdAt = date(3020,1,1)
        for i in range(0, round - 10, 10):
            # /users/sort-multi?createdAt=xxx&username=xxx&pageLimit=10
            address = f"http://localhost:3000/users/sort-multi?username={username}&createdAt={createdAt}&pageLimit={10}"
            response = benchmark(i)

            username = response["data"][9]["username"]
            createdAt = response["data"][9]["created_at"]
