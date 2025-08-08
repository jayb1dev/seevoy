#!/bin/bash
#
#
#
#
echo

echo
echo "Copying dist..."
echo

rm -rf /var/www/html/*
cp -r dist/* /var/www/html

echo
echo "Copied dist."
echo

echo
echo "Opening in browser..."
echo

CACHE_BUSTER=$(date +%s)

xdg-open "http://localhost/?id=${CACHE_BUSTER}" 1>/dev/null 2>&1







