package pdf

import (
	"bytes"
	"fmt"
	"sss/print/pkg/model"

	"github.com/phpdave11/gofpdf"
)

func CreateLeaflet(data model.Model) (byteBuffer bytes.Buffer) {
	const (
		pageWd = 297.0 // A4 210.0 x 297.0
		margin = 10.0
		gutter = 4
	)
	var (
		y0       float64
		crrntCol int
		colNum   = data.Columns
		colWd    = float64((pageWd - 2*margin - (colNum-1)*gutter) / colNum)
	)
	pdf := gofpdf.New("L", "mm", "A4", "")
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
	// combinedSongs := ""
	for _, song := range data.Songs {
		// combinedSongs = fmt.Sprintf("%s\n%s", combinedSongs, song.Title)
		pdf.SetFont("dejavu", "B", 10)
		pdf.MultiCell(colWd, 5, song.Title, "", "", false)
		pdf.Ln(-1)
		// pdf.CellFormat(0, 10, song.Title, "", 1, "", false, 0, "")
		pdf.SetFont("dejavu", "", 8)
		for _, verse := range song.Verses {
			// combinedSongs = fmt.Sprintf("%s\n%s", combinedSongs, verse.Lyrics)
			pdf.MultiCell(colWd, 4, verse.Lyrics, "", "", false)
			pdf.Ln(-1)
			// for _, line := range strings.Split(strings.TrimSuffix(verse.Lyrics, "\n"), "\n") {
			// 	pdf.CellFormat(0, 10, line,
			// 		"", 1, "", false, 0, "")
			// }

		}
	}
	// pdf.MultiCell(5, 60, combinedSongs, "", "", false)

	err := pdf.Output(&byteBuffer)
	fmt.Print(err)
	return byteBuffer
}
