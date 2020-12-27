package pdf

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestHeightShortLines(t *testing.T) {
	testString := "1\n2\n3\n4\n5"

	needed := getCellHeightNeeded(testString, 10, 11, 10)

	assert.Equal(t, float64(55), needed, "Short line needed space should be amount of lines times height.")
}

func TestHeightLongLine(t *testing.T) {
	testString := "123456789 123456789"

	needed := getCellHeightNeeded(testString, 100, 11, 10)

	assert.Equal(t, float64(22), needed, "Both lines should fit to single line.")
}

func TestHeightLongLineBiggerFont(t *testing.T) {
	testString := "12345 6789 12345 6789"

	needed := getCellHeightNeeded(testString, 100, 16, 15)

	assert.Equal(t, float64(64), needed, "Font is bigger, so each line takes one line.")
}
