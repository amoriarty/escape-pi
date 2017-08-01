#!/bin/sh

BIN=yarn

install() {
	typings install
	$BIN install
}

cd server/public
install
cd ..
install
cd ../client
install
