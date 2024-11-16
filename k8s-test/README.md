# K8s Test
This Project demonstrates how to test Kubernetes API using Go client.

## Install CRD
```bash
$ kubectl apply -f ./crd/crd.yaml
```

## Test
```bash
$ go test -v ./...
```
