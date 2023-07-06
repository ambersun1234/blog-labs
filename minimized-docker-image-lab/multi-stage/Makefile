all: optimized

optimized:
	docker build -f ./Dockerfile.optimized -t echo-multi-stage-optimized:latest ..

.PHONY: clean

clean:
	docker rmi echo-multi-stage-optimized:latest
	docker rmi -f $(docker images -f "dangling=true" -q)