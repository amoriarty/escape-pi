#!/bin/sh
tsc && \
NODE_ENV="development" \
SOCKET_URL="http://192.168.0.14:8080" \
PI_NAME="yharnam" \
VIDEOS_PATH="/home/pi/Videos" \
node build/app.js
