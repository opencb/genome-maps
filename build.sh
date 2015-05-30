#!/bin/sh
rm -rf build
mkdir -p build
mkdir -p build/tmp
mkdir -p build/css
mkdir -p build/fontawesome
#mkdir -p build/images
mkdir -p build/fonts

vulcanize  --inline-scripts --exclude "conf/" genome-maps-index.html > build/tmp/index.html

#fix config js include
sed -i 's@<script fix="config"></script>@<script src="conf/config.js"></script>@g' build/tmp/index.html

#fix paths
sed -i s@lib/jsorolla/styles/fonts/fonts.css@fonts/fonts.css@g build/tmp/index.html
cp -r lib/jsorolla/styles/fonts/* build/fonts/

sed -i s@bower_components/fontawesome/css/font-awesome.min.css@fontawesome/css/font-awesome.min.css@g build/tmp/index.html
cp -r bower_components/fontawesome/css build/fontawesome/
cp -r bower_components/fontawesome/fonts build/fontawesome/

sed -i s@lib/jsorolla/src/lib/components/jso-global.css@css/jso-global.css@g build/tmp/index.html
cp -r lib/jsorolla/src/lib/components/jso-global.css build/css/

sed -i s@lib/jsorolla/src/lib/components/jso-form.css@css/jso-form.css@g build/tmp/index.html
cp -r lib/jsorolla/src/lib/components/jso-form.css build/css/

sed -i s@lib/jsorolla/vendor/ChemDoodleWeb.css@css/ChemDoodleWeb.css@g build/tmp/index.html
cp -r lib/jsorolla/vendor/ChemDoodleWeb.css build/css/

#sed -i s@src/images/@images/@g build/tmp/index.html
#cp -r src/images/* build/images/


sed -i s@bower_components/qtip2/jquery.qtip.css@css/jquery.qtip.css@g build/tmp/index.html
cp -r bower_components/qtip2/jquery.qtip.css build/css/


sed -i s@src/components/components/components/lib/jsorolla/styles/css/style.css@css/style.css@g build/tmp/index.html
cp -r lib/jsorolla/styles/css/style.css build/css/

sed -i s@src/components/components/components/lib/jsorolla/bower_components/fontawesome/css/font-awesome.css@fontawesome/css/font-awesome.min.css@g build/tmp/index.html

cp -r lib/jsorolla/styles/img/ build/
# end fix paths


#cp LICENSE build/
cp README.md build/

mv build/tmp/index.html build/
cp -r conf build/

rm -rf build/tmp
