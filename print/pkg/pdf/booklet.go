package pdf

import (
	"bufio"
	"bytes"
	"fmt"

	"github.com/pdfcpu/pdfcpu/pkg/api"
	"github.com/pdfcpu/pdfcpu/pkg/pdfcpu"
)

func makePrintableBooklet(pages *bytes.Buffer) (printablePages bytes.Buffer) {
	config := pdfcpu.NewDefaultConfiguration()
	pageCount, _ := api.PageCount(bytes.NewReader(pages.Bytes()), config)
	// Add empty pages to make leaflet to be printable
	if pageCount%4 > 0 {
		for i := 0; i < (4 - pageCount%4); i++ {
			printablePages.Reset()
			err := api.InsertPages(bytes.NewReader(pages.Bytes()), bufio.NewWriter(&printablePages), []string{fmt.Sprintf("%d", pageCount)}, false, config)
			if err != nil {
				fmt.Printf("Error: %v", err)
			}
			*pages = printablePages
		}
	}
	pageCount, _ = api.PageCount(bytes.NewReader(pages.Bytes()), config)

	printablePages.Reset()
	api.Collect(bytes.NewReader(pages.Bytes()), bufio.NewWriter(&printablePages), calculatePageOrder(pageCount), config)
	*pages = printablePages
	printablePages.Reset()
	nupConfig, err := pdfcpu.PDFGridConfig(1, 2, "")
	if err != nil {
		fmt.Printf("Error: %v", err)
	}
	api.NUp(bytes.NewReader(pages.Bytes()), bufio.NewWriter(&printablePages), nil, nil, nupConfig, config)
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
