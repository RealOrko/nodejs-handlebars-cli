#!/usr/bin/env bash

set -eu
rm -rf build/
mkdir build

mkdir -p build/single-template-with-single-input-with-file-output

hb -t examples/bands.yml.hbs -i examples/bands.yml -o build/single-template-with-single-input-with-file-output/bands.yml
hb -t examples/fruits.yml.hbs -i examples/fruits.yml -o build/single-template-with-single-input-with-file-output/fruits.yml

mkdir -p build/single-template-with-single-input-with-std-output

hb -t examples/bands.yml.hbs -i examples/bands.yml -s true > build/single-template-with-single-input-with-std-output/bands.yml
hb -t examples/fruits.yml.hbs -i examples/fruits.yml -s true > build/single-template-with-single-input-with-std-output/fruits.yml

mkdir -p build/single-template-with-glob-input-with-file-output

hb -t examples/bands.yml.hbs -i examples/**/*.yml -o build/single-template-with-glob-input-with-file-output/bands.yml
hb -t examples/fruits.yml.hbs -i examples/**/*.yml -o build/single-template-with-glob-input-with-file-output/fruits.yml

mkdir -p build/single-template-with-glob-input-with-std-output

hb -t examples/bands.yml.hbs -i examples/**/*.yml -s true > build/single-template-with-glob-input-with-std-output/bands.yml
hb -t examples/fruits.yml.hbs -i examples/**/*.yml -s true > build/single-template-with-glob-input-with-std-output/fruits.yml

mkdir -p build/glob-template-with-single-input-with-file-output

hb -t examples/**/*.yml.hbs -i examples/all.yml -o build/glob-template-with-single-input-with-file-output/bands.yml
hb -t examples/**/*.yml.hbs -i examples/all.yml -o build/glob-template-with-single-input-with-file-output/fruits.yml

mkdir -p build/glob-template-with-single-input-with-std-output

hb -t examples/**/*.yml.hbs -i examples/all.yml -s true > build/glob-template-with-single-input-with-std-output/bands.yml
hb -t examples/**/*.yml.hbs -i examples/all.yml -s true > build/glob-template-with-single-input-with-std-output/fruits.yml

mkdir -p build/glob-template-with-glob-input-with-file-output

hb -t examples/**/*.yml.hbs -i examples/**/*.yml -o build/glob-template-with-glob-input-with-file-output/bands.yml
hb -t examples/**/*.yml.hbs -i examples/**/*.yml -o build/glob-template-with-glob-input-with-file-output/fruits.yml

mkdir -p build/glob-template-with-glob-input-with-std-output

hb -t examples/**/*.yml.hbs -i examples/**/*.yml -s true > build/glob-template-with-glob-input-with-std-output/bands.yml
hb -t examples/**/*.yml.hbs -i examples/**/*.yml -s true > build/glob-template-with-glob-input-with-std-output/fruits.yml
