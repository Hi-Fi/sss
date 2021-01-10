OPERATOR_NAME := sss-core
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
	GO111MODULE=on go test . -v -coverprofile=gotest-coverage.out $(GOTEST_REPORT_FORMAT) > gotest-report.out && cat gotest-report.out || (cat gotest-report.out; exit 1)
	GO111MODULE=off ${GOPATH}/bin/golint -set_exit_status .  > golint-report.out && cat golint-report.out || (cat golint-report.out; exit 1)
	GO111MODULE=on go vet -mod vendor .
	../.hack/gofmt.sh
	git diff --exit-code go.mod go.sum

gofmt:
	./.hack/gofmt.sh

ensure:
	GO111MODULE=on go mod tidy
	GO111MODULE=on go mod vendor

run: ${GOPATH}/bin/gin
	${GOPATH}/bin/gin -p 5000 main.go

build-linux-amd64:
	rm -rf bin/linux/$(OPERATOR_NAME)
	GO111MODULE=on GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -v -i -o bin/linux/$(OPERATOR_NAME) .

build:
	rm -f bin/$(OPERATOR_NAME)
	GO111MODULE=on go build -v -i -o bin/$(OPERATOR_NAME) .

build-image: build-linux-amd64
	docker build -t $(IMAGE):latest .

${GOPATH}/bin/gin:
	GO111MODULE=off go get -u github.com/codegangsta/gin

${GOPATH}/bin/golint:
	GO111MODULE=off go get -u golang.org/x/lint/golint
