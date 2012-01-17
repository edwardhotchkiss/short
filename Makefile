
SHELL := /bin/bash

test:
	@vows test/index.test.js --spec

benchmark:
	@node benchmarks/index.benchmark.js

.PHONY: test