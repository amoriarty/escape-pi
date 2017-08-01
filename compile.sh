#!/bin/sh

BIN=yarn

cd server/public
ng build --target production -aot
cd ..
tsc
cd ../client
tsc
