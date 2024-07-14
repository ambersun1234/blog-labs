# k3d Example
This project demonstrates how to use k3d to create a Kubernetes cluster on your local machine.

## Prerequisites
- [Docker](https://www.docker.com/)
- [k3d](https://k3d.io/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Run
```bash
$ make image_build
$ make k3d-create
$ make k3d-apply
```