module github.com/hi-fi/sss/core

go 1.16

replace go.opencensus.io => go.opencensus.io v0.23.0

require (
	cloud.google.com/go/datastore v1.6.0
	github.com/GoogleCloudPlatform/opentelemetry-operations-go/exporter/trace v1.3.0
	github.com/alecthomas/template v0.0.0-20190718012654-fb15b899a751
	github.com/gin-contrib/cors v1.3.1
	github.com/gin-gonic/gin v1.7.7
	github.com/google/uuid v1.3.0
	github.com/hi-fi/sss v0.0.0-20220312122133-e0e7433d37f6
	github.com/swaggo/gin-swagger v1.4.1
	github.com/swaggo/swag v1.8.0
	go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin v0.29.0
	go.opentelemetry.io/otel v1.4.1
	go.opentelemetry.io/otel/exporters/stdout/stdouttrace v1.4.1
	go.opentelemetry.io/otel/sdk v1.4.1
	go.opentelemetry.io/otel/trace v1.4.1
)
