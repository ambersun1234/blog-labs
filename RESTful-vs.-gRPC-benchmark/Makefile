grpc:
	mkdir -p ./grpc/proto
	protoc -I./grpc --go_out=plugins=grpc:./grpc/proto ./grpc/echo.proto
	python3 -m grpc_tools.protoc -I./grpc --python_out=./grpc/proto --grpc_python_out=./grpc/proto ./grpc/echo.proto
	sed -i 's/import echo_pb2 as echo__pb2/from . import echo_pb2 as echo__pb2/g' ./grpc/proto/echo_pb2_grpc.py

plot: ./plot.gp
	python3 preprocess.py
	gnuplot plot.gp

.PHONY: grpc

clean:
	rm -rf ./grpc/*.pb.go