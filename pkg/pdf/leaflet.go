package pdf

import (
	"bytes"
	"fmt"
	"sss/print/pkg/model"

	"github.com/phpdave11/gofpdf"
)

func CreateLeaflet(data model.Model) bytes.Buffer {
	pages := createLeafletPages(data)
	switch style := data.Style; style {
	case model.COLUMNS:
	case model.LEAFLET, model.HIGH_LEAFLET:
		pages = makePrintableBooklet(&pages)
	}
	return pages
}

func createLeafletPages(data model.Model) (byteBuffer bytes.Buffer) {
	const (
		margin = float64(10.0 * 2.835)
		gutter = 8
	)

	var (
		pageWd          = data.Page.Width
		eventFontSize   = float64(data.FontSize) * 1.3
		eventLineHeight = eventFontSize * 1.1
		y0              = margin
		crrntCol        int
		colNum          = data.Columns
		colWd           = float64((pageWd - 2.0*margin - float64((colNum-1)*gutter)) / float64(colNum))
	)

	init := &gofpdf.InitType{
		OrientationStr: data.Page.Orientation,
		UnitStr:        data.Page.Unit,
		Size: gofpdf.SizeType{
			Wd: data.Page.Width,
			Ht: data.Page.Height,
		},
	}
	pdf := initFPDF(init)

	setCol := func(col int) {
		crrntCol = col
		x := margin + float64(col)*(colWd+gutter)
		pdf.SetLeftMargin(x)
		pdf.SetX(x)
	}
	pdf.SetAcceptPageBreakFunc(func() bool {
		if crrntCol < colNum-1 {
			setCol(crrntCol + 1)
			pdf.SetY(y0)
			// Start new column, not new page
			return false
		}
		setCol(0)
		return true
	})
	pdf.AddPage()
	pdf.SetFont("dejavu", "B", eventFontSize)
	pdf.MultiCell(colWd, eventLineHeight, data.Event, "", "", false)
	if data.Style != model.COLUMNS && data.UseCoverImage && len(data.CoverImage) > 0 {
		imageData, err := decodeBase64ToBytes(data.CoverImage)
		if err != nil {
			fmt.Printf("Error: %v", err)

		} else {
			getImageType(&imageData)
			imageOptions := gofpdf.ImageOptions{
				ImageType: imageData.Type,
			}
			pdf.RegisterImageOptionsReader("coverImage", imageOptions, bytes.NewReader(imageData.Data))
			getImageSize(&imageData)
			y := data.Page.Height/2 - (((pageWd-2.0*margin)/float64(imageData.Width))*float64(imageData.Height))/2.0
			pdf.ImageOptions("coverImage", pdf.GetX(), y, pageWd-2.0*margin, 0, false, imageOptions, 0, "")
			pdf.SetY(data.Page.Height - 2*margin - getCellHeightNeeded(pdf, data.Description, colWd, eventLineHeight))
		}
	}
	pdf.MultiCell(colWd, eventLineHeight, data.Description, "", "", false)
	if !data.SongsOnCover {
		pdf.AddPage()
	}
	addSongs(data, pdf, margin, colWd)
	if data.Style != model.COLUMNS && data.EmptyBack {
		pdf.AddPage()
	}
	err := pdf.Output(&byteBuffer)
	fmt.Print(err)
	return byteBuffer
}
