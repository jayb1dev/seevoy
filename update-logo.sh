#!/bin/bash
#
# Usage: update-logo.sh <src-file>
#
# E.g.
# ./update-logo.sh ~/Documents/seevoy-logo-014.png
#

if [ "$1" == "" ]; then
    echo "No source file specified."
    exit 1
fi

src=$1

size=$(ls -l public/logo.png | awk '{print $5'})

#
# echo "Size $size"
# 

for file in $(find . -name \*.png -exec ls -l {} \; | grep $size | awk '{print $9}'); do
    echo Update $file
    cp $src $file
done






