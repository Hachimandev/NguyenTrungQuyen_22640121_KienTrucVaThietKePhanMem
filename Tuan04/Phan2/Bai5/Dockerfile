FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY . .

# Chỉ cần tải dependency + build
RUN go mod tidy && go build -o app

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/app .

EXPOSE 8080

CMD ["./app"]