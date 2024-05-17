FROM golang:1.22.2

WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o main .
CMD ["/app/main"]