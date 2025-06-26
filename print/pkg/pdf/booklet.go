package pdf

import (
	"bytes"
	"context"
	"fmt"

	"github.com/pdfcpu/pdfcpu/pkg/api"
	"github.com/pdfcpu/pdfcpu/pkg/pdfcpu"
	"github.com/pdfcpu/pdfcpu/pkg/pdfcpu/model"
	"go.opentelemetry.io/otel"
)

var bookletTracer = otel.GetTracerProvider().Tracer("booklet")

func makePrintableBooklet(ctx context.Context, pages *bytes.Buffer) (printablePages bytes.Buffer, err error) {
	_, span := bookletTracer.Start(ctx, "makePrintableBooklet")
	defer span.End()
	config := model.NewDefaultConfiguration()
	pageCount, _ := api.PageCount(bytes.NewReader(pages.Bytes()), config)
	// Add empty pages to make leaflet to be printable
	if pageCount%4 > 0 {
		for i := 0; i < (4 - pageCount%4); i++ {
			printablePages.Reset()
			pageConfig := pdfcpu.DefaultPageConfiguration()
			err := api.InsertPages(bytes.NewReader(pages.Bytes()), &printablePages, []string{fmt.Sprintf("%d", pageCount)}, false, pageConfig, config)
			if err != nil {
				fmt.Printf("Error at InsertPages: %v\n", err)
			}
			*pages = printablePages
		}
	}
	pageCount, _ = api.PageCount(bytes.NewReader(pages.Bytes()), config)

	printablePages.Reset()
	err = api.Collect(bytes.NewReader(pages.Bytes()), &printablePages, calculatePageOrder(pageCount), config)
	if err != nil {
		fmt.Printf("Error at Collect: %v\n", err)
	}
	*pages = printablePages
	printablePages.Reset()
	nupConfig, err := pdfcpu.PDFGridConfig(1, 2, "", config)
	if err != nil {
		fmt.Printf("Error at PDFGridConfig: %v\n", err)
	}
	err = api.NUp(bytes.NewReader(pages.Bytes()), &printablePages, nil, nil, nupConfig, config)
	if err != nil {
		fmt.Printf("Error at NUp: %v\n", err)
	}
	return
}

func calculatePageOrder(pageCount int) (pageOrder []string) {
	for i := 0; i < pageCount/2; i++ {
		if i%2 == 0 {
			pageOrder = append(pageOrder, fmt.Sprint(pageCount-i), fmt.Sprint(i+1))
		} else {
			pageOrder = append(pageOrder, fmt.Sprint(i+1), fmt.Sprint(pageCount-i))
		}
	}
	return
}
