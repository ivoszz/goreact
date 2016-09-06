APP_NAME      = $(shell pwd | sed 's:.*/::')
TARGET        = bin/$(APP_NAME)
CLIENT_FILES  = $(shell find client -type f)
NODE_BIN      = $(shell npm bin)

build: clean app

clean:
	rm -rf build/*

app:
	go build -o $(TARGET)

bundle: $(CLIENT_FILES)
	$(NODE_BIN)/webpack --progress --colors --bail

serve:
	$(NODE_BIN)/webpack-dev-server &
	sleep 5
	open http://localhost:8080/webpack-dev-server/
