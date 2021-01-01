package pdf

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPageOrderCalculation(t *testing.T) {
	pageCount := 8
	expectedOrder := []string{"8", "1", "2", "7", "6", "3", "4", "5"}
	pageOrder := calculatePageOrder(pageCount)

	assert.Equal(t, expectedOrder, pageOrder, "Page order for leaflet print incorrect.")
}
