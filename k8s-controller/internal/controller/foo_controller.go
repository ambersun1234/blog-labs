/*
Copyright 2024.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controller

import (
	"context"

	foov1 "mycontroller/api/v1"

	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"
)

// FooReconciler reconciles a Foo object
type FooReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=foo.example.com,resources=foos,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=foo.example.com,resources=foos/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=foo.example.com,resources=foos/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the Foo object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.17.3/pkg/reconcile
func (r *FooReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	resource := &foov1.Foo{}
	if err := r.Get(ctx, req.NamespacedName, resource); err != nil {
		if errors.IsNotFound(err) {
			logger.Info("Foo resource not found")
			return ctrl.Result{}, nil
		}

		logger.Error(err, "unable to fetch Foo")
		return ctrl.Result{}, err
	}

	if resource.Spec.Value != "bar" {
		logger.Info("Foo field is not equal to bar")
		meta.SetStatusCondition(&resource.Status.Conditions, metav1.Condition{
			Type:               "Failed",
			Status:             metav1.ConditionUnknown,
			Reason:             "FooNotBar",
			Message:            "Value field is not equal to bar",
			LastTransitionTime: metav1.Now(),
		})
		if err := r.Status().Update(ctx, resource); err != nil {
			logger.Error(err, "unable to update Foo status")
			return ctrl.Result{}, err
		}

		return ctrl.Result{Requeue: true}, nil
	}

	meta.SetStatusCondition(&resource.Status.Conditions, metav1.Condition{
		Type:               "Ready",
		Status:             metav1.ConditionTrue,
		Reason:             "FooIsBar",
		Message:            "Value field is equal to bar",
		LastTransitionTime: metav1.Now(),
	})

	if err := r.Status().Update(ctx, resource); err != nil {
		logger.Error(err, "unable to update Foo status")
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *FooReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&foov1.Foo{}).
		Complete(r)
}
