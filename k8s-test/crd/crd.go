package crd

import (
	metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

var (
	GVR = schema.GroupVersionResource{
		Group:    "foo.example.com",
		Version:  "v1",
		Resource: "foos",
	}
)

type FooSpec struct {
	Value string `json:"value,omitempty"`
}

type FooStatus struct {
	Conditions []metaV1.Condition `json:"conditions,omitempty"`
}

type Foo struct {
	metaV1.TypeMeta   `json:",inline"`
	metaV1.ObjectMeta `json:"metadata,omitempty"`

	Spec   FooSpec   `json:"spec,omitempty"`
	Status FooStatus `json:"status,omitempty"`
}
