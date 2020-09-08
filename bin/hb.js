#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const process = require("process");
const glob = require("glob");
const yargs = require("yargs");
const yamljs = require("yamljs")
const handlebars = require("handlebars");
require('handlebars-helpers')({ handlebars: handlebars });

getPath = (file) => {
  return path.join(process.cwd(), file);
}

globber = (folder, pattern, callback) => {
  const matched = glob.sync(path.join(folder, pattern));
  for (const match of matched) {
    callback(match);
  }
}

getGlobContents = (glob) => {
  var contents = '';
  if (glob.lastIndexOf('*') != -1) {
    globber(".", glob, (m) => {
      var filePath = getPath(m);
      contents += fs.readFileSync(filePath).toString();
    });
  } else if (glob.lastIndexOf(',') != -1) {
    var parts = glob.split(',');
    for (const part of parts) {
      var filePath = getPath(part);
      contents += fs.readFileSync(filePath).toString();
    }
  }
  return contents;
}

loadHelpers = (options) => {
  var folder = path.dirname(options.template.split(',')[0]);
  globber(folder, "**/*.helper.js", (m) => {
    var helper = fs.readFileSync(m).toString();
    var name = path.parse(m).name.split(".")[0];
    handlebars.registerHelper(name, eval(helper));
  });
}

transform = (template, input) => {
  var inputYaml = yamljs.parse(input);
  var compiled = handlebars.compile(template);
  var result = compiled(inputYaml);
  return result.trim();
}

processTransformOutput = (result, outputPath, stdout) => {
  var outputFile = getPath(outputPath);
  if (!stdout) {
    fs.writeFileSync(outputFile, result);
  } else {
    console.log(result);
  }
}

transformFile = (templatePath, inputPath, outputPath, stdout) => {
  var templateFile = getPath(templatePath);
  var template = fs.readFileSync(templateFile).toString();
  var inputFile = getPath(inputPath);
  var input = fs.readFileSync(inputFile).toString();
  var result = transform(template, input);
  processTransformOutput(result, outputPath, stdout);
}

globTransform = (options) => {
  if (!fs.existsSync(options.template) && !fs.existsSync(options.input)) {
    var superTemplate = getGlobContents(options.template);
    var superInput = getGlobContents(options.input);
    var result = transform(superTemplate, superInput);
    processTransformOutput(result, options.output, options.stdout);
  } else if (!fs.existsSync(options.template)) {
    var superTemplate = getGlobContents(options.template);
    var input = fs.readFileSync(options.input).toString();
    var result = transform(superTemplate, input);
    processTransformOutput(result, options.output, options.stdout);
  } else if (!fs.existsSync(options.input)) {
    var template = fs.readFileSync(options.template).toString();
    var superInput = getGlobContents(options.input);
    var result = transform(template, superInput);
    processTransformOutput(result, options.output, options.stdout);
  } else {
    transformFile(options.template, options.input, options.output, options.stdout);
  }
}

const options = yargs
  .usage("Usage: -t <template> -i <input> -o <output>")
  .option("t", { alias: "template", describe: "The path to the handlebars template", type: "string", demandOption: false })
  .option("i", { alias: "input", describe: "The path of the input yml file, can be '**/*.yml'", type: "string", demandOption: false })
  .option("o", { alias: "output", describe: "The path for the transformed output, can be folder", type: "string", demandOption: false, default: "." })
  .option("e", { alias: "extension", describe: "The output extension", type: "string", demandOption: false, default: ".out" })
  .option("s", { alias: "stdout", describe: "Output transforms to stdout", type: "bool", demandOption: false, default: false })
  .help()
  .argv;

try {
  if (options.input && options.template && options.output) {
    loadHelpers(options);
    globTransform(options);
  } else {
    console.log("Invalid options, please use '--help'");
  }
} catch (err) {
  console.log(err);
}
