SRC := src
DIST := dist
JS_SOURCES := $(wildcard $(SRC)/*.js)
JS_SOURCES := $(filter-out %.stories.js, $(JS_SOURCES))
JS_DIST := $(patsubst $(SRC)/%, $(DIST)/%, $(JS_SOURCES))
JS_DIST_FLOW := $(JS_DIST:%=%.flow)
SCSS_SOURCES := $(wildcard $(SRC)/*.scss)
SCSS_SOURCES_FLOW := $(SCSS_SOURCES:%=%.d.ts)
SCSS_DIST := $(patsubst $(SRC)/%, $(DIST)/%, $(SCSS_SOURCES:%.scss=%.css))
SCSS_DIST_FLOW := $(SCSS_DIST:%=%.d.ts)


all: $(JS_DIST) $(SCSS_DIST) $(JS_DIST_FLOW) $(SCSS_DIST_FLOW) $(SCSS_SOURCES_FLOW)

flow:
	npx flow

$(DIST)/%.js: $(SRC)/%.js
	npx babel -o "$@" "$<"

$(DIST)/%.css: $(SRC)/%.scss
	npx sass "$<":"$@"

$(DIST)/%.js.flow: $(SRC)/%.js
	npx gen-flow-files "$(SRC)" --out-dir "$(DIST)"
	sed -i 's/"\(.*\)\.scss"/"\1.css"/g' $(DIST)/*.js.flow
	rm $(DIST)/*.stories.js.flow && true

$(DIST)/%.css.d.ts: $(SRC)/%.scss
	npx tcm $(DIST)

$(SRC)/%.scss.d.ts: $(SRC)/%.scss
	npx tcm -p '*.scss' $(SRC)

clean:
	rm dist/*

demos: all
	npx webpack --mode development

.PHONY: clean flow all demos

.NOTPARALLEL: clean $(DIST)/%.js.flow $(DIST)/%.css.d.ts $(SRC)/%.css.d.ts
