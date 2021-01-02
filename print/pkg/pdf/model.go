package pdf

type Font struct {
	Font     string
	Style    string
	FilePath string
}

type Image struct {
	Data   []byte
	Type   string
	Width  int
	Height int
}
