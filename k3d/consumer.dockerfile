FROM golang:1.22.2 AS build_layer

WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o consumer ./consumer.go

FROM alpine:latest AS final_layer

WORKDIR /app
COPY --from=build_layer /app/consumer .
CMD ["/app/consumer"]
