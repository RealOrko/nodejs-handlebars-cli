#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const process = require("process");
const glob = require("glob");
const yargs = require("yargs");
const yamljs = require("yamljs")
const handlebars = require("handlebars");
require('handlebars-helpers')({handlebars: handlebars});

header = (options) => {
    if (!options.stdout) {
        console.log("hb (https://github.com/RealOrko/handlebars-cli)");
    }
}

getPath = (file) => {
    return path.join(process.cwd(), file);
}

globber = (folder, pattern, callback) => {
    const matched = glob.sync(path.join(folder, pattern));
    for (const match of matched) {
        callback(match);
    }
}

loadHelpers = (options) => {
    var folder = path.dirname(options.template);
    globber(folder, "**/*.helper.js", (m) => {
        var helper = fs.readFileSync(m).toString();
        var name = path.parse(m).name.split(".")[0];
        handlebars.registerHelper(name, eval(helper));            
    });
}

transform = (templatePath, inputPath, outputPath, stdout) => {
    var templateFile = getPath(templatePath);
    var template = fs.readFileSync(templateFile).toString();
    var inputFile = getPath(inputPath);
    var input = fs.readFileSync(inputFile).toString();
    var inputYaml = yamljs.parse(input);
    var outputFile = getPath(outputPath);
    var compiled = handlebars.compile(template);
    var result = compiled(inputYaml);
    if (!stdout) {
        fs.writeFileSync(outputFile, result);
    } else {
        console.log(result);
    }
    return result;
}

globTransform = (options) => {
    if (!fs.existsSync(options.template)) {
      globber(".", options.template, (m) => {
          var inputName = path.parse(m).name;
          transform(m, options.input,path.join(options.output, inputName + options.extension), options.stdout);
      });
    } else if (!fs.existsSync(options.input)) {
        globber(".", options.input, (m) => {
            var inputName = path.parse(m).name;
            transform(options.template, m, path.join(options.output, inputName + options.extension), options.stdout);
        });
    } else {
        transform(options.template, options.input, options.output, options.stdout);
    }
}

isGlob = (input) => {
  return input.lastIndexOf('**') != -1;
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

header(options);

try {
    if (options.input && options.template && options.output) {
        loadHelpers(options);
        globTransform(options);
    } else {
        console.log("Invalid options, please use '--help'");
    }
} catch(err) {
    console.log(err);
}
