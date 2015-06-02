#!/bin/sh
rm -rf build
mkdir -p build
mkdir -p build/tmp
#mkdir -p build/css
mkdir -p build/fonts
mkdir -p build/fontawesome
mkdir -p build/images

vulcanize \
    --inline-scripts \
    --inline-css \
    --strip-comments \
    --exclude "conf/config.js" \
    --exclude "conf/genome-maps.css" \
    genome-maps-index.html \
    | crisper \
    --html build/tmp/index.html \
    --js build/tmp/genome-maps.js

uglifyjs build/tmp/genome-maps.js > build/tmp/genome-maps.min.js

sed -i s@genome-maps.js@genome-maps.min.js@g build/tmp/index.html

#fix paths
sed -i s@lib/jsorolla/styles/fonts/@fonts/@g build/tmp/index.html
cp -r lib/jsorolla/styles/fonts/* build/fonts/

sed -i s@lib/jsorolla/bower_components/fontawesome/fonts/@fontawesome/fonts/@g build/tmp/index.html
sed -i s@bower_components/fontawesome/fonts/@fontawesome/fonts/@g build/tmp/index.html
cp -r bower_components/fontawesome/css build/fontawesome/
cp -r bower_components/fontawesome/fonts build/fontawesome/

sed -i s@lib/jsorolla/styles/img/@images/@g build/tmp/index.html
cp -r lib/jsorolla/styles/img/* build/images/


##sed -i s@src/images/@images/@g build/tmp/index.html
##cp -r src/images/* build/images/

# end fix paths

#cp LICENSE build/
cp README.md build/

mv build/tmp/index.html build/
mv build/tmp/genome-maps.js build/
mv build/tmp/genome-maps.min.js build/
cp -r conf build/

rm -rf build/tmp
