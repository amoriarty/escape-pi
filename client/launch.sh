#!/bin/sh
NODE_ENV="development" \
SOCKET_URL="http://alegent-mbp.local:8080" \
PI_NAME="yharnam" \
VIDEOS_PATH="/home/pi/Videos" \
node build/app.js
