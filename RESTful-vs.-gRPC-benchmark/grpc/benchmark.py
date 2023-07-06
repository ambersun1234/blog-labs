import grpc
import time
from proto import echo_pb2
from proto import echo_pb2_grpc

def time_elapsed(func):
    def measure_time():
        start_time = time.perf_counter_ns()
        func()
        end_time = time.perf_counter_ns()
        time_diff = end_time - start_time

        f.write(f"{i + 1} {time_diff}\n")

    return measure_time

@time_elapsed
def benchmark():
    stub.Echo(echo_pb2.EchoRequest(input="2"))

if __name__ == "__main__":
    round = 100000
    with grpc.insecure_channel('localhost:6600') as channel:
        stub = echo_pb2_grpc.EchoStub(channel)

        with open("grpc-benchmark.txt", "w") as f:
            for i in range(round):
                benchmark()