#!/bin/sh
tsc && \
NODE_ENV="development" \
SOCKET_URL="http://yharnam.local" \
PI_NAME="yharnam" \
VIDEOS_PATH="/home/pi/Videos" \
node build/app.js
