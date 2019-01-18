#!/bin/bash
# Generate font
${BASH_SOURCE%/*}/../lib/index.js --fontHeight 1024 --descent 64 --html --htmlTemplate ${BASH_SOURCE%/*}/../templates/html.hbs --icons '../icons/*' -baseSelector 'wfg-cli' --classPrefix 'wfg-cli-' --cssExt css --fontName advanced-icons --out fonts/ --codepoints ${BASH_SOURCE%/*}/codepoints.json --cssTemplate ${BASH_SOURCE%/*}/../templates/css.hbs --types=ttf,woff,eot
