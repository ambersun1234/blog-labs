package main

import (
	"context"
	"fmt"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/minio/minio-go/v7/pkg/notification"
)

func main() {
	// connect to minio
	endpoint := "localhost:9000"
	accessKeyID := "minio"
	secretAccess := "miniominio"

	minioClient, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKeyID, secretAccess, ""),
		Secure: false,
	})
	if err != nil {
		panic(err)
	}

	queueArn := notification.NewArn("minio", "sqs", "", "_", "webhook")

	queueConfig := notification.NewConfig(queueArn)
	queueConfig.AddEvents(notification.ObjectRemovedDelete, notification.ObjectCreatedPut)

	cfg := notification.Configuration{}
	cfg.AddQueue(queueConfig)

	bucketName := "mybucket"
	fmt.Printf("creating minio bucket... %v\n", minioClient.MakeBucket(context.Background(), bucketName, minio.MakeBucketOptions{}))
	fmt.Printf("registering webhook... %v\n", minioClient.SetBucketNotification(context.Background(), bucketName, cfg))
}
