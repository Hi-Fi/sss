package pdf

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"image"
	"net/http"
	"sss/print/pkg/model"

	"github.com/phpdave11/gofpdf"
)

var gofpdfDir string

func addSongs(data model.Model, pdf *gofpdf.Fpdf, margin, colWd float64) {
	var (
		verseFontSize   = float64(data.FontSize)
		titleFontSize   = verseFontSize * 1.2
		titleLineHeight = titleFontSize * 1.1
		verseLineHeight = verseFontSize * 1.1
		pageHt          = data.Page.Height
	)
	for _, song := range data.Songs {
		pdf.SetFont("dejavu", "B", titleFontSize)
		titleHeightNeeded := getCellHeightNeeded(pdf, song.Title, colWd, titleLineHeight) + float64(data.FontSize)
		if len(song.Verses) > 0 && (pdf.GetY()+(titleHeightNeeded+getCellHeightNeeded(pdf, song.Verses[0].Lyrics, colWd, verseLineHeight))) > (pageHt-margin) {
			pdf.Ln(pageHt - pdf.GetY())
		}
		pdf.MultiCell(colWd, titleLineHeight, song.Title, "", "", false)
		pdf.Ln(-1)
		pdf.SetFont("dejavu", "", verseFontSize)
		for _, verse := range song.Verses {
			verseHeight := getCellHeightNeeded(pdf, verse.Lyrics, colWd, verseLineHeight)
			if pdf.GetY()+verseHeight > (pageHt - margin) {
				pdf.Ln(pageHt - pdf.GetY())
			}
			pdf.MultiCell(colWd, verseLineHeight, verse.Lyrics, "", "", false)
			pdf.Ln(-1)
		}
	}
}

func getCellHeightNeeded(pdf *gofpdf.Fpdf, text string, lineWidth, lineHeight float64) float64 {
	lines := len(pdf.SplitText(text, lineWidth))
	return float64(lines) * lineHeight
}

func initFPDF(init *gofpdf.InitType) (pdf *gofpdf.Fpdf) {
	pdf = gofpdf.NewCustom(init)
	fontsToLoad := []Font{
		{Font: "dejavu", Style: "", FilePath: "fonts/DejaVuSansCondensed.ttf"},
		{Font: "dejavu", Style: "B", FilePath: "fonts/DejaVuSansCondensed-Bold.ttf"},
		{Font: "dejavu", Style: "I", FilePath: "fonts/DejaVuSansCondensed-Oblique.ttf"},
		{Font: "dejavu", Style: "BI", FilePath: "fonts/DejaVuSansCondensed-BoldOblique.ttf"},
	}

	for _, font := range fontsToLoad {
		pdf.AddUTF8Font(font.Font, font.Style, font.FilePath)
		if pdf.Error() != nil {
			fmt.Printf("Font loading failed. Error: %v\n", pdf.Error())
		}
	}
	return
}

func getImageType(image *Image) error {
	switch imageType := http.DetectContentType(image.Data); imageType {
	case "image/png":
		image.Type = "PNG"
	case "image/jpg":
		image.Type = "JPG"
	case "image/jpeg":
		image.Type = "JPEG"
	case "image/gif":
		image.Type = "GIF"
	default:
		return fmt.Errorf("Not valid image")
	}
	return nil
}

func decodeBase64ToBytes(data string) (Image, error) {
	decodedData, err := base64.StdEncoding.DecodeString(data)
	return Image{Data: decodedData}, err
}

func getImageSize(imageData *Image) {
	info, _, err := image.DecodeConfig(bytes.NewReader(imageData.Data))
	if err != nil {
		fmt.Printf("Error. %v", err)
	}
	imageData.Width = info.Width
	imageData.Height = info.Height
}
