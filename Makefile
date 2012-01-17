
SHELL := /bin/bash

test:
	@vows test/index.test.js --spec
 
.PHONY: test