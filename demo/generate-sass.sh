#!/bin/bash
# Generate font
${BASH_SOURCE%/*}/../lib/index.js --fontHeight 1024 --descent 64 --sass --icons '../icons/*' -baseSelector 'wfg-cli' --classPrefix 'wfg-cli-' --cssExt css --fontName sass-icons --out fonts/ --cssTemplate ${BASH_SOURCE%/*}/../templates/css.hbs --types=ttf,woff,eot
