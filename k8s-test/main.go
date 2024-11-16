package main

import (
	"flag"
	"fmt"
	"path/filepath"

	"ktest/service"

	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

func cfg() *rest.Config {
	var kubeConfig *string
	if home := homedir.HomeDir(); home != "" {
		kubeConfig = flag.String(
			"kubeconfig",
			filepath.Join(home, ".kube", "config"),
			"(optional) absolute path to the kubeconfig file",
		)
	} else {
		kubeConfig = flag.String(
			"kubeconfig",
			"",
			"absolute path to the kubeconfig file",
		)
	}
	flag.Parse()

	config, err := clientcmd.BuildConfigFromFlags("", *kubeConfig)
	if err != nil {
		panic(err)
	}

	return config
}

func main() {
	c := cfg()

	clientSet, err := kubernetes.NewForConfig(c)
	if err != nil {
		panic(err)
	}

	dynamicClient, err := dynamic.NewForConfig(c)
	if err != nil {
		panic(err)
	}

	s := service.NewService(clientSet, dynamicClient)
	// err = s.CreateEmptyJob("my-job")
	err = s.CreateFoo("my-foo", "my-value")
	fmt.Println(err)
}
