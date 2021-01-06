package model

func CalculatePageSize(data *Model) {
	switch style := data.Style; style {
	case COLUMNS:
		data.Page = Page{
			// Size given as lanscape, but orientation as Portrait to prevent fpdf size invert
			Height:      210 * 2.835,
			Width:       297 * 2.835,
			Orientation: "Portrait",
			Unit:        "point",
		}
	case LEAFLET:
		data.Page = Page{
			Height:      210 * 2.835,
			Width:       148.5 * 2.835,
			Orientation: "Portrait",
			Unit:        "point",
		}
	case HIGH_LEAFLET:
		data.Columns = 1
		data.Page = Page{
			Height:      297 * 2.835,
			Width:       105 * 2.835,
			Orientation: "Portrait",
			Unit:        "point",
		}
	}
}
