package pdf

import (
	"fmt"
	"testing"

	"github.com/phpdave11/gofpdf"
	"github.com/stretchr/testify/assert"
)

var pdf *gofpdf.Fpdf

func init() {
	init := &gofpdf.InitType{
		UnitStr: "point",
		Size: gofpdf.SizeType{
			Wd: 105 * 2.835,
			Ht: 297 * 2.835,
		},
	}
	pdf = initFPDF(init, "../../")
	pdf.SetFont("dejavu", "", 10)
	fmt.Println("PDF init")
}

func TestHeightShortLines(t *testing.T) {
	testString := "1\n2\n3\n4\n5"

	needed := getCellHeightNeeded(pdf, testString, 100, 11)

	assert.Equal(t, float64(55), needed, "Short line needed space should be amount of lines times height.")
}

func TestHeightLongLine(t *testing.T) {
	testString := "123456789 123456789"

	needed := getCellHeightNeeded(pdf, testString, 100, 11)

	assert.Equal(t, float64(22), needed, "Both lines should fit to single line.")
}

func TestHeightLongLineBiggerFont(t *testing.T) {
	testString := "12345 6789 12345 6789"
	pdf.SetFont("dejavu", "", 15)

	needed := getCellHeightNeeded(pdf, testString, 100, 16)

	assert.Equal(t, float64(32), needed, "Font is bigger, so each line takes one line.")
}

// func TestHeightCalculationAgainstPdf(t *testing.T) {
// 	init := &gofpdf.InitType{
// 		UnitStr: "point",
// 		Size: gofpdf.SizeType{
// 			Wd: 105 * 2.835,
// 			Ht: 297 * 2.835,
// 		},
// 	}
// 	pdf := initFPDF(init)
// 	testString := "12345\n6789\n12345\n6789"

// 	needed := getCellHeightNeeded(testString, 100, 16, 15)
// 	pdf.AddPage()
// 	pdf.SetY(20)
// 	pdf.SetFont("dejavu", "B", 15)
// 	startY := pdf.GetY()
// 	pdf.MultiCell(100, 16, testString, "1" "", true)
// 	pdf.Ln(-1)
// 	pdf.MultiCell(100, 16, testString, "", "", false)
// 	endY := pdf.GetY()
// 	fmt.Println(endY)
// 	assert.Equal(t, endY-startY, needed, "Font is bigger, so each line takes one line.")

// }
