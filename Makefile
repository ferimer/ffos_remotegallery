GIT  ?= git

.PHONY = all

all: build

version.info:
	@$(GIT) describe --all > src/version.info

build: clean version.info
	@cp -a contrib/buildingblocks src/css/buildingblocks
	@ln libs/gallery3.js/g3client.js src/js/.
	@cp LICENSE src/.

clean:
	@rm -rf src/css/buildingblocks
	@rm -f src/js/g3client.js
	@rm -f src/version.info
	@rm -f src/LICENSE
