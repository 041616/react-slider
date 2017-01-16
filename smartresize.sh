#!/usr/bin/env bash
echo "smart resize >>> $1 to $2";\
mogrify -filter Triangle \
-define filter:support=2 \
-unsharp 0.25x0.08+8.3+0.045 \
-dither None \
-quality 1 \
-define jpeg:fancy-upsampling=off \
-define png:compression-filter=5 \
-define png:compression-level=9 \
-define png:compression-strategy=1 \
-define png:exclude-chunk=all \
-interlace none \
-colorspace sRGB 1.jpg

#find -name "*.jpg" | \
#    grep -v "lqip" | \
#    sed 'p;s/\.jpg/\-lqip.jpg/' | \
#    xargs -n2 convert -resize 100 -strip -interlace Plane -quality 10