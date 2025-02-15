# K8s CRD
This Project demonstrates how to use client-go to interact with k8s CRD.

## Install CRD
```bash
$ kubectl apply -f ./crd/crd.yaml
```

## Test
```bash
$ go test -v ./...
```
