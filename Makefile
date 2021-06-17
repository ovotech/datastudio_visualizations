all:
	cd cubism-react && npx gulp
	$(MAKE) -C datastudio all
