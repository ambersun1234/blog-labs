import json
import requests
import time

def benchmark():
    start_time = time.perf_counter_ns()
    r = requests.post(
        address,
        data=postData
    )
    end_time = time.perf_counter_ns()
    assert r.status_code == 200
    f.write(f"{i + 1} {end_time - start_time}\n")

if __name__ == "__main__":
    round = 100000
    address = "http://localhost:6000"
    postData = json.dumps({'input': '1'}).encode('utf-8')

    with open("rest-benchmark.txt", "w") as f:
        for i in range(round):
            benchmark()

    # curl -X POST -H "Content-Type: application/json" -d '{"input": "1"}' http://localhost:6000
