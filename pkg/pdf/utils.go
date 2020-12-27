package pdf

import "strings"

func getCellHeightNeeded(text string, lineWidth, lineHeight, fontSize float64) float64 {
	words := strings.Fields(strings.TrimSpace(text))
	if len(words) == 0 {
		return lineHeight
	}
	wrapped := words[0]
	spaceLeft := lineWidth - float64(len(wrapped))*fontSize
	for _, word := range words[1:] {
		if float64(len(word)+1)*fontSize > spaceLeft {
			wrapped += "\n" + word
			spaceLeft = lineWidth - float64(len(word))*fontSize
		} else {
			wrapped += " " + word
			spaceLeft -= 1.0 + float64(len(word))*fontSize
		}
	}
	return float64(len(strings.Split(strings.TrimSuffix(wrapped, "\n"), "\n"))) * lineHeight
}
