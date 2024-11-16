package service

import (
	"context"
	"testing"

	"ktest/crd"

	"github.com/stretchr/testify/require"
	metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	fakeDynamic "k8s.io/client-go/dynamic/fake"
	"k8s.io/client-go/kubernetes/fake"
)

func TestService_CreateEmptyJob(t *testing.T) {
	sc := fake.NewSimpleClientset()
	dc := fakeDynamic.NewSimpleDynamicClient(runtime.NewScheme())

	s := NewService(sc, dc)
	require.NoError(t, s.CreateEmptyJob("test"))

	job, err := sc.BatchV1().Jobs("default").Get(context.TODO(), "test", metaV1.GetOptions{})
	require.NoError(t, err)
	require.Equal(t, "test", job.Name)
}

func TestService_CreateFoo(t *testing.T) {
	sc := fake.NewSimpleClientset()
	dc := fakeDynamic.NewSimpleDynamicClient(runtime.NewScheme())

	s := NewService(sc, dc)
	require.NoError(t, s.CreateFoo("test", "value"))

	foo, err := dc.Resource(crd.GVR).Namespace("default").Get(context.TODO(), "test", metaV1.GetOptions{})
	require.NoError(t, err)

	data, found, err := unstructured.NestedString(foo.Object, "spec", "value")
	require.NoError(t, err)
	require.True(t, found)
	require.Equal(t, "value", data)
}
