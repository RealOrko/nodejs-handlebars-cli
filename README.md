# Handlebars CLI

A simple implementation of a handlebars CLI with globbing capabilities. 

## Prerequisites

You must make sure you have the following pre-requisites installed:

 - [nodejs](https://nodejs.org/en/download/package-manager/)


#### Using source

```
git clone https://github.com/RealOrko/handlebars-cli.git && cd handlebars-cli && npm install -g . && hb --help
```

#### Using npm

```
npm install https://github.com/RealOrko/nodejs-handlebars-cli.git -g --force
```

#### Using package

Or alternatively you can use the latest [published package](https://github.com/RealOrko/nodejs-handlebars-cli/packages/).

## Guide

<a href="https://handlebarsjs.com/guide/" target="_blank">handlebarsjs.com/guide</a>

## Examples

All examples can be run from the root folder for where this repository is checked out.

To see the effects of:
 - One template to one input
 - Many templates to one input
 - One template to many inputs
 - Many templates to many inputs

Please run `test/test.sh` and navigate to the output in `build/`.

#### Help

```
hb --help
```

#### Single transform

```
hb -t examples/bands.yml.hbs -i examples/bands.yml -o build/single-template-with-single-input-with-file-output/bands.yml
hb -t examples/fruits.yml.hbs -i examples/fruits.yml -o build/single-template-with-single-input-with-file-output/fruits.yml
```

#### Single transform (stdout)

```
hb -t examples/bands.yml.hbs -i examples/bands.yml -s true > build/single-template-with-single-input-with-std-output/bands.yml
hb -t examples/fruits.yml.hbs -i examples/fruits.yml -s true > build/single-template-with-single-input-with-std-output/fruits.yml
```

#### Single template transform with glob inputs

```
hb -t examples/bands.yml.hbs -i examples/**/*.yml -o build/single-template-with-glob-input-with-file-output/bands.yml
hb -t examples/fruits.yml.hbs -i examples/**/*.yml -o build/single-template-with-glob-input-with-file-output/fruits.yml
```


#### Single template transform with glob inputs (stdout)

```
hb -t examples/bands.yml.hbs -i examples/**/*.yml -s true > build/single-template-with-glob-input-with-std-output/bands.yml
hb -t examples/fruits.yml.hbs -i examples/**/*.yml -s true > build/single-template-with-glob-input-with-std-output/fruits.yml
```

#### Multiple template transform with single input

```
hb -t examples/**/*.yml.hbs -i examples/all.yml -o build/glob-template-with-single-input-with-file-output/bands.yml
hb -t examples/**/*.yml.hbs -i examples/all.yml -o build/glob-template-with-single-input-with-file-output/fruits.yml
```

#### Multiple template transform with single input (stdout)

```
hb -t examples/**/*.yml.hbs -i examples/all.yml -s true > build/glob-template-with-single-input-with-std-output/bands.yml
hb -t examples/**/*.yml.hbs -i examples/all.yml -s true > build/glob-template-with-single-input-with-std-output/fruits.yml
```

#### Multiple template transform with multiple inputs

```
hb -t examples/**/*.yml.hbs -i examples/**/*.yml -o build/glob-template-with-glob-input-with-file-output/bands.yml
hb -t examples/**/*.yml.hbs -i examples/**/*.yml -o build/glob-template-with-glob-input-with-file-output/fruits.yml
```

#### Multiple template transform with multiple inputs (stdout)

```
hb -t examples/**/*.yml.hbs -i examples/**/*.yml -s true > build/glob-template-with-glob-input-with-std-output/bands.yml
hb -t examples/**/*.yml.hbs -i examples/**/*.yml -s true > build/glob-template-with-glob-input-with-std-output/fruits.yml
```
