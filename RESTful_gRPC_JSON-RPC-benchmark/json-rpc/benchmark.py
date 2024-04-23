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
    round = 10000
    address = "http://localhost:6666/rpc"
    data = {
        "jsonrpc": "1.0",
        "method": "Server.Echo",
        "params": [
            {"msg": "test"}
        ],
        "id": 1
    }
    postData = json.dumps(data).encode('utf-8')

    with open("json-rpc-benchmark.txt", "w") as f:
        for i in range(round):
            benchmark()
