all:
	npx webpack --mode development

dev:
	npx webpack serve --open --mode development --config webpack.dev.js

test:
	npx jest

upload: dist/cubism.js dist/cubism.css
	gsutil cp -a public-read dist/* gs://orion-sre-datastudio-viz-dev

flow:
	npx flow

css-types:
	npx tcm src -p '*.scss'

.PHONY: test upload flow dev css-types all
