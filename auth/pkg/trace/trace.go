package trace

import (
	"context"
	"log"
	"os"

	texporter "github.com/GoogleCloudPlatform/opentelemetry-operations-go/exporter/trace"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/stdout/stdouttrace"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/resource"
	"go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.7.0"
)

var (
	tp             *trace.TracerProvider
	localTraceFile *os.File
)

func EnableTracing() {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	var (
		exporter  trace.SpanExporter
		err       error
		tpOptions []trace.TracerProviderOption
	)

	tpOptions = append(tpOptions, trace.WithResource(resource.NewWithAttributes(semconv.SchemaURL, semconv.ServiceNameKey.String("sss-auth"))))

	if len(projectID) > 0 && os.Getenv("DEV") != "1" {
		log.Println("using Cloud trace")
		exporter, err = getCloudTraceExporter(projectID)
		tpOptions = append(tpOptions, trace.WithSampler(trace.TraceIDRatioBased(0.5)))
	} else {
		log.Println("using stdout traces")
		exporter, err = getLocalTraceExporter()
		tpOptions = append(tpOptions, trace.WithSampler(trace.AlwaysSample()))
	}
	if err != nil {
		log.Fatalf("getting exporter failed: %v", err)
	}
	tpOptions = append(tpOptions, trace.WithBatcher(exporter))
	tp := trace.NewTracerProvider(tpOptions...)
	otel.SetTracerProvider(tp)
	otel.SetTextMapPropagator(propagation.NewCompositeTextMapPropagator(propagation.TraceContext{}, propagation.Baggage{}))
}

func StopTracing() {
	log.Printf("Shutting down trace provider")
	tp.ForceFlush(context.Background())
	if localTraceFile != nil {
		log.Println("closing traces file")
		localTraceFile.Close()
	}
	if err := tp.Shutdown(context.Background()); err != nil {
		log.Printf("Error shutting down tracer provider: %v", err)
	}
}

func getCloudTraceExporter(projectID string) (exporter trace.SpanExporter, err error) {
	return texporter.New(texporter.WithProjectID(projectID))

}

// Write local traces to file so those don't mess up other logging
func getLocalTraceExporter() (exporter trace.SpanExporter, err error) {
	// Write telemetry data to a file.
	localTraceFile, err = os.Create("traces.txt")
	if err != nil {
		log.Fatal(err)
	}
	exporter, err = stdouttrace.New(
		stdouttrace.WithWriter(localTraceFile),
		stdouttrace.WithPrettyPrint(),
		stdouttrace.WithoutTimestamps(),
	)
	return
}
