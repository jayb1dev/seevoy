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
for file in $(ls *iPhone*.png); do

    mogrify -resize 1290x2796! $file

done


