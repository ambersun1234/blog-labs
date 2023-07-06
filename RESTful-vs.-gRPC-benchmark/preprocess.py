if __name__ == "__main__":
    with open("./grpc/grpc-benchmark.txt", "r") as f:
        protoLine = f.readlines()

    with open("./rest/rest-benchmark.txt", "r") as f:
        restLine = f.readlines()

    with open("./benchmark.txt", "w") as f:
        for proto, rest in zip(protoLine, restLine):
            proto_p = proto.replace("\n", "")
            rest_p = rest.replace("\n", "").split(" ")[1]

            f.write(f"{proto_p} {rest_p}\n")
