all: origin

origin:
	docker build -f ./Dockerfile -t echo-origin:latest ..

.PHONY: clean

clean:
	docker rmi echo-origin:latest
	docker rmi -f $(docker images -f "dangling=true" -q)