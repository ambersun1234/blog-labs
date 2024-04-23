if __name__ == "__main__":
    with open("./grpc/grpc-benchmark.txt", "r") as f:
        protoLine = f.readlines()

    with open("./rest/rest-benchmark.txt", "r") as f:
        restLine = f.readlines()

    with open("./json-rpc/json-rpc-benchmark.txt", "r") as f:
        jsonRpcLine = f.readlines()

    with open("./benchmark.txt", "w") as f:
        for proto, jrpc, rest in zip(protoLine, jsonRpcLine, restLine):
            proto_p = proto.replace("\n", "")
            jrpc_p = jrpc.replace("\n", "").split(" ")[1]
            rest_p = rest.replace("\n", "").split(" ")[1]

            f.write(f"{proto_p} {jrpc_p} {rest_p}\n")
