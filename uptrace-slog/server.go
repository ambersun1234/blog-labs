package main

import (
	"context"
	"log/slog"
	"os"

	"mytrace/db"

	"github.com/gin-gonic/gin"
	slogmulti "github.com/samber/slog-multi"
	"github.com/uptrace/opentelemetry-go-extra/otelgorm"
	"github.com/uptrace/uptrace-go/uptrace"
	"go.opentelemetry.io/contrib/bridges/otelslog"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/codes"
	sdkTrace "go.opentelemetry.io/otel/sdk/trace"
	"go.opentelemetry.io/otel/trace"
	"gorm.io/gorm"
)

type InsertRequest struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

func initDB() (*gorm.DB, error) {
	conn, err := db.NewDB()
	if err != nil {
		return nil, err
	}

	if err := db.Migrate(conn); err != nil {
		return nil, err
	}

	return conn, nil
}

func main() {
	gin.SetMode(gin.ReleaseMode)

	conn, err := initDB()
	if err != nil {
		panic(err)
	}

	if err := conn.Use(otelgorm.NewPlugin()); err != nil {
		panic(err)
	}

	otelLogger := otelslog.NewHandler("mytrace")
	consoleLogger := slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{AddSource: true})
	logger := slog.New(slogmulti.Fanout(otelLogger, consoleLogger))

	ctx := context.Background()

	uptrace.ConfigureOpentelemetry(
		uptrace.WithDSN("http://my_project_secret_token@localhost:14317/2"),
		uptrace.WithTracingEnabled(true),
		uptrace.WithLoggingEnabled(true),
		uptrace.WithTraceSampler(sdkTrace.AlwaysSample()),
		uptrace.WithResourceAttributes(
			attribute.String("service.name", "mytrace-service"),
		),
	)
	defer uptrace.Shutdown(ctx)

	var tracer = otel.Tracer("myapp")

	router := gin.Default()
	router.Use(otelgin.Middleware("server"))
	router.POST("/", func(c *gin.Context) {
		ctx := c.Request.Context()
		trace.SpanFromContext(ctx)
		ctx, span := tracer.Start(ctx, "kv-service", trace.WithSpanKind(trace.SpanKindServer))
		defer span.End()

		var req InsertRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			logger.ErrorContext(ctx, "failed to bind request", slog.Any("err", err))
			span.SetStatus(codes.Error, err.Error())
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		logger.InfoContext(ctx, "inserting data", slog.Any("req", req))

		if err := conn.WithContext(ctx).Create(&db.KV{Key: req.Key, Value: req.Value}).Error; err != nil {
			logger.ErrorContext(ctx, "failed to insert data", slog.Any("err", err))
			span.SetStatus(codes.Error, err.Error())
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		logger.InfoContext(ctx, "data inserted", slog.Any("req", req))
		c.JSON(200, gin.H{"status": "ok"})
	})

	if err := router.Run(":9999"); err != nil {
		panic(err)
	}
}
