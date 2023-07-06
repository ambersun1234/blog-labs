all: origin optimized

origin:
	docker build -f ./Dockerfile.origin -t minimized-layer-origin:latest .

optimized:
	docker build -f ./Dockerfile.optimized -t minimized-layer-optimized:latest .

.PHONY: clean

clean:
	docker rmi minimized-layer-origin:latest
	docker rmi minimized-layer-optimized:latest
	docker rmi -f $(docker images -f "dangling=true" -q)
