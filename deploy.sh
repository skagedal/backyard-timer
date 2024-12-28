#!/bin/bash

set -e

TARGET=_site

echo "💁 Building project..."
npm run build

echo "💁 Uploading..."
rsync \
    --archive \
    --compress \
    --delete \
    --info=progress2 \
    out/ \
    simon@skagedal.tech:backyard

