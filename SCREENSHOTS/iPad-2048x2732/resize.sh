#!/bin/bash
#
# Resize png files. 
#

#
# Check for files containing space characters
#
ls *\ * >/dev/null 2>&1

if [ $? == 0 ]; then

    #
    # Replace spaces
    #
    for f in *\ *; do mv "$f" "${f// /_}"; done

fi

#
# Resize files.
#
for file in $(ls *iPad*.png); do

    mogrify -resize 2048x2732! $file

done


