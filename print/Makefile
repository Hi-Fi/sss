OPERATOR_NAME := sss-print
ifeq ($(USE_JSON_OUTPUT), 1)
GOTEST_REPORT_FORMAT := -json
endif

ifndef $(GOPATH)
    GOPATH=$(shell go env GOPATH)
    export GOPATH
endif

.PHONY: clean test gofmt ensure run build build-image build-linux-amd64

clean:
	git clean -Xdf

test: ${GOPATH}/bin/golint
	go test . -v -coverprofile=gotest-coverage.out $(GOTEST_REPORT_FORMAT) > gotest-report.out && cat gotest-report.out || (cat gotest-report.out; exit 1)
	${GOPATH}/bin/golint -set_exit_status .  > golint-report.out && cat golint-report.out || (cat golint-report.out; exit 1)
	go vet .
	../.hack/gofmt.sh
	git diff --exit-code go.mod go.sum

gofmt:
	./.hack/gofmt.sh

ensure:
	go mod tidy

run: ${GOPATH}/bin/gin
	${GOPATH}/bin/gin -i -p 5000 main.go

debug: ${GOPATH}/bin/dlv
	${GOPATH}/bin/dlv attach `pgrep -f /go/bin/gin` --headless --listen=:2345 --api-version=2

build-linux-amd64:
	rm -rf bin/linux/$(OPERATOR_NAME)
	GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -v -i -o bin/linux/$(OPERATOR_NAME) .

build:
	rm -f bin/$(OPERATOR_NAME)
	go build -v -i -o bin/$(OPERATOR_NAME) .

build-image: build-linux-amd64
	docker build -t $(IMAGE):latest .

${GOPATH}/bin/gin:
	go install github.com/codegangsta/gin@latest

${GOPATH}/bin/golint:
	go install golang.org/x/lint/golint@latest
