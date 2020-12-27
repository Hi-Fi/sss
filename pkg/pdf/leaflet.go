package pdf

import (
	"bytes"
	"fmt"
	"sss/print/pkg/model"

	"github.com/phpdave11/gofpdf"
)

func CreateLeaflet(data model.Model) (byteBuffer bytes.Buffer) {
	const (
		margin = 10.0 * 2.835
		gutter = 8
	)

	var (
		pageWd          = data.Page.Width
		pageHt          = data.Page.Height
		titleFontSize   = float64(data.FontSize) * 1.2
		verseFontSize   = float64(data.FontSize)
		titleLineHeight = titleFontSize * 1.1
		verseLineHeight = verseFontSize * 1.1
		y0              = margin
		crrntCol        int
		colNum          = data.Columns
		colWd           = float64((pageWd - 2.0*margin - float64((colNum-1)*gutter)) / float64(colNum))
	)

	init := gofpdf.InitType{
		OrientationStr: data.Page.Orientation,
		UnitStr:        data.Page.Unit,
		Size: gofpdf.SizeType{
			Wd: data.Page.Width,
			Ht: data.Page.Height,
		},
	}
	pdf := gofpdf.NewCustom(&init)
	pdf.AddUTF8Font("dejavu", "", "fonts/DejaVuSansCondensed.ttf")
	pdf.AddUTF8Font("dejavu", "B", "fonts/DejaVuSansCondensed-Bold.ttf")
	pdf.AddUTF8Font("dejavu", "I", "fonts/DejaVuSansCondensed-Oblique.ttf")
	pdf.AddUTF8Font("dejavu", "BI", "fonts/DejaVuSansCondensed-BoldOblique.ttf")
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
	for _, song := range data.Songs {
		pdf.SetFont("dejavu", "B", float64(data.FontSize)*1.2)
		titleHeightNeeded := getCellHeightNeeded(song.Title, colWd, titleLineHeight, titleFontSize) + float64(data.FontSize)
		if len(song.Verses) > 0 && (pdf.GetY()+(titleHeightNeeded+getCellHeightNeeded(song.Verses[0].Lyrics, colWd, verseLineHeight, verseFontSize))) > (pageHt-margin) {
			fmt.Println("Whole song to next column/page")
			pdf.Ln(pageHt - pdf.GetY())
		}
		pdf.MultiCell(colWd, titleLineHeight, song.Title, "", "", false)
		pdf.Ln(-1)
		pdf.SetFont("dejavu", "", float64(data.FontSize))
		for _, verse := range song.Verses {
			verseHeight := getCellHeightNeeded(verse.Lyrics, colWd, verseLineHeight, verseFontSize)
			if pdf.GetY()+verseHeight > (pageHt - margin) {
				pdf.Ln(pageHt - pdf.GetY())
			}
			pdf.MultiCell(colWd, verseLineHeight, verse.Lyrics, "", "", false)
			pdf.Ln(-1)
		}
	}

	err := pdf.Output(&byteBuffer)
	fmt.Print(err)
	return byteBuffer
}
