package main

import (
	"context"
	"fmt"

	// "os"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"

	// "github.com/minio/minio-go/v7/pkg/lifecycle"
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
	e1 := minioClient.MakeBucket(context.Background(), bucketName, minio.MakeBucketOptions{
		ObjectLocking: true,
	})
	fmt.Printf("creating minio bucket... %v\n", e1)
	e2 := minioClient.SetBucketNotification(context.Background(), bucketName, cfg)
	fmt.Printf("registering webhook... %v\n", e2)

	// // test lifecycle hook
	// file, err := os.Open("go.mod")
	// if err != nil {
	// 	panic(err)
	// }
	// defer file.Close()

	// fileinfo, err := file.Stat()
	// if err != nil {
	// 	panic(err)
	// }

	// ee := minioClient.SetBucketLifecycle(context.Background(), bucketName, &lifecycle.Configuration{
	// 	Rules: []lifecycle.Rule{
	// 		{
	// 			ID:     "expire",
	// 			Status: "Enabled",
	// 			Expiration: lifecycle.Expiration{
	// 				Days: 1,
	// 			},
	// 		},
	// 	},
	// })
	// fmt.Printf("setting bucket lifecycle... %v\n", ee)

	// _, e := minioClient.PutObject(
	// 	context.Background(),
	// 	bucketName,
	// 	"test",
	// 	file,
	// 	fileinfo.Size(),
	// 	minio.PutObjectOptions{},
	// )
	// fmt.Printf("uploading file to minio... %v\n", e)
}
