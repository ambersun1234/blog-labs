package service

import (
	"context"

	"ktest/crd"

	batchV1 "k8s.io/api/batch/v1"
	coreV1 "k8s.io/api/core/v1"
	metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/kubernetes"
)

type Service struct {
	clientSet     kubernetes.Interface
	dynamicClient dynamic.Interface
}

func NewService(clientSet kubernetes.Interface, dynamicClient dynamic.Interface) *Service {
	return &Service{
		clientSet:     clientSet,
		dynamicClient: dynamicClient,
	}
}

func (s *Service) CreateFoo(name, value string) error {
	foo := &crd.Foo{
		TypeMeta: metaV1.TypeMeta{
			Kind:       "Foo",
			APIVersion: "foo.example.com/v1",
		},
		ObjectMeta: metaV1.ObjectMeta{
			Name: name,
		},
		Spec: crd.FooSpec{
			Value: value,
		},
	}

	object, err := runtime.DefaultUnstructuredConverter.ToUnstructured(foo)
	if err != nil {
		return err
	}

	_, err = s.dynamicClient.Resource(crd.GVR).
		Namespace("default").
		Create(context.TODO(), &unstructured.Unstructured{Object: object}, metaV1.CreateOptions{})

	return err
}

func (s *Service) CreateEmptyJob(name string) error {
	completions := int32(1)

	job := &batchV1.Job{
		ObjectMeta: metaV1.ObjectMeta{
			Name: name,
		},
		Spec: batchV1.JobSpec{
			Completions: &completions,
			Template: coreV1.PodTemplateSpec{
				Spec: coreV1.PodSpec{
					Containers: []coreV1.Container{
						{
							Name:  "empty-job",
							Image: "gcr.io/k8s-staging-perf-tests/sleep:v0.1.0",
							Args:  []string{"30s"},
						},
					},
					RestartPolicy: coreV1.RestartPolicyNever,
				},
			},
		},
	}

	_, err := s.clientSet.BatchV1().
		Jobs("default").
		Create(context.TODO(), job, metaV1.CreateOptions{})

	return err
}
