package main

import (
	"bytes"
	"context"
	"log/slog"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	slogmulti "github.com/samber/slog-multi"
	"github.com/uptrace/uptrace-go/uptrace"
	"go.opentelemetry.io/contrib/bridges/otelslog"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/propagation"
	sdkTrace "go.opentelemetry.io/otel/sdk/trace"
	"go.opentelemetry.io/otel/trace"
)

func main() {
	gin.SetMode(gin.ReleaseMode)

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
			attribute.String("service.name", "mytrace-gateway"),
		),
	)
	defer uptrace.Shutdown(ctx)

	var tracer = otel.Tracer("mygateway")

	router := gin.Default()
	router.Use(otelgin.Middleware("gateway-server"))
	router.POST("/", func(c *gin.Context) {
		ctx := c.Request.Context()
		ctx, span := tracer.Start(ctx, "gateway-server", trace.WithSpanKind(trace.SpanKindServer))
		defer span.End()

		data := []byte(`{"key":"xyz","value":"xyz"}`)

		req, err := http.NewRequest("POST", "http://localhost:9999/", bytes.NewReader(data))
		if err != nil {
			logger.ErrorContext(ctx, "failed to create request", slog.Any("error", err))
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		req.Header.Set("Content-Type", "application/json")
		otel.GetTextMapPropagator().Inject(ctx, propagation.HeaderCarrier(req.Header))
		logger.InfoContext(ctx, "sending request", slog.Any("header", req.Header))

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			logger.ErrorContext(ctx, "failed to send request", slog.Any("error", err))
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": resp.Status})
	})

	if err := router.Run(":8888"); err != nil {
		panic(err)
	}
}
