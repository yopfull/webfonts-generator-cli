#!/bin/bash
# Generate font
${BASH_SOURCE%/*}/../lib/index.js --fontHeight 1024 --descent 64 --icons '../icons/*' --fontName basic-icons --out fonts/
