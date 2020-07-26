# Handlebars CLI

A simple implementation of a handlebars CLI with globbing capabilities. 

## Installing

Please first install [nodejs](https://nodejs.org/en/download/package-manager/).

```
git clone https://github.com/RealOrko/handlebars-cli.git && cd handlebars-cli && npm install -g . && hb --help
```

## Guide

<a href="https://handlebarsjs.com/guide/" target="_blank">handlebarsjs.com/guide</a>

## Examples

All examples can be run from the root folder for where this repository is checked out.

### Help

```
hb --help
```

### Single transform

```
hb -t examples/array.yml.hbs -i examples/array.yml -o examples/out.output
```

### Folder transform

```
hb -t examples/array.yml.hbs -i examples/**/*.yml
```

### Folder transform with custom extension

```
hb -t examples/array.yml.hbs -i examples/**/*.yml -e .output
```

### Stdout transform

```
hb -t examples/array.yml.hbs -i examples/array.yml -s true
```

### Stdout folder transform (merge)

```
hb -t examples/array.yml.hbs -i examples/**/*.yml -s true
```
