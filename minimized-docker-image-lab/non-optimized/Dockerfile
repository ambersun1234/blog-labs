FROM golang:1.19 AS builder_stage
WORKDIR /
COPY ./echo ./
RUN go mod download
RUN CGO_ENABLED=0 go build -o server
CMD ["/server"]