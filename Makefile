all:
	cd cubism-react && npx gulp
	cd datastudio && npx gulp

install:
	cd cubism-react && npm install --dev
	cd datastudio && npm install --dev
