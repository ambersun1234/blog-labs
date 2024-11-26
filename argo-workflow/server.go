package main

import (
	"context"
	"flag"
	"path/filepath"

	wfv1 "github.com/argoproj/argo-workflows/v3/pkg/apis/workflow/v1alpha1"
	wfclientset "github.com/argoproj/argo-workflows/v3/pkg/client/clientset/versioned"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

var (
	namespace = "default"
)

func newK8sConfig() *rest.Config {
	kubeconfig := flag.String(
		"kubeconfig",
		filepath.Join(homedir.HomeDir(), ".kube", "config"),
		"(optional) absolute path to the kubeconfig file",
	)
	flag.Parse()

	config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	if err != nil {
		panic(err)
	}

	return config
}

func createWorkflow() *wfv1.Workflow {
	job := `
        apiVersion: batch/v1
        kind: Job
        metadata:
          generateName: myworkflows-job-
          namespace: default
        spec:
          template:
            spec:
              containers:
              - name: my-container
                image: busybox
                command: ["echo"]
                args: ["{{inputs.parameters.message}}"]
              restartPolicy: Never
    `

	return &wfv1.Workflow{
		ObjectMeta: metav1.ObjectMeta{
			GenerateName: "dag-",
		},
		Spec: wfv1.WorkflowSpec{
            ServiceAccountName: "argo-workflow-account",
			Entrypoint: "root",
			Templates: []wfv1.Template{
				{
					Name: "root",
					DAG: &wfv1.DAGTemplate{
						Tasks: []wfv1.DAGTask{
							{
								Name:     "A",
								Template: "job",
								Arguments: wfv1.Arguments{
									Parameters: []wfv1.Parameter{
										{
											Name: "message", Value: wfv1.AnyStringPtr("my name is A"),
										},
									},
								},
							},
							{
								Name:         "B",
								Template:     "job",
								Dependencies: []string{"A"},
								Arguments: wfv1.Arguments{
									Parameters: []wfv1.Parameter{
										{
											Name: "message", Value: wfv1.AnyStringPtr("my name is B"),
										},
									},
								},
							},
						},
					},
				},
				{
					Name: "job",
					Inputs: wfv1.Inputs{
						Parameters: []wfv1.Parameter{
							{Name: "message"},
						},
					},
					Resource: &wfv1.ResourceTemplate{
						Action:            "create",
						SetOwnerReference: true,
						Manifest:          job,
					},
				},
			},
		},
	}
}

func main() {
	config := newK8sConfig()

	wfClient := wfclientset.NewForConfigOrDie(config).ArgoprojV1alpha1().Workflows(namespace)

	dagWorkflow := createWorkflow()
	_, err := wfClient.Create(context.Background(), dagWorkflow, metav1.CreateOptions{})
	if err != nil {
		panic(err)
	}
}
