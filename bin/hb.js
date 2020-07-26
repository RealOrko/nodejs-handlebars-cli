#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const process = require("process");

const clui = require("clui");
const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");

const yamljs = require("yamljs")
const handlebars = require("handlebars");

getPath = (file) => {
    return path.join(process.cwd(), file);
}

printHeader = () => {
    console.log(boxen(
        chalk.white.bold("Handebars CLI by <realorko>"), 
            {
                padding: 1,
                margin: 1,
                borderStyle: "round",
                borderColor: "grey",
                backgroundColor: "#d4422b"
            }));    
}

printHeader();

const options = yargs
 .usage("Usage: -t <template> -i <input>")
 .option("t", { alias: "template", describe: "The path to the handlebars template", type: "string", demandOption: true })
 .option("i", { alias: "input", describe: "The path of the input yml file ", type: "string", demandOption: true })
 .option("o", { alias: "output", describe: "The path for the transformed output ", type: "string", demandOption: true })
 .argv;

var spinner = new clui.Spinner("Executing ...", ['|','/','-','\\']);
spinner.start();

var templateFile = getPath(options.template);
var template = fs.readFileSync(templateFile).toString();

var inputFile = getPath(options.input);
var input = fs.readFileSync(inputFile).toString();
var inputYaml = yamljs.parse(input);

var outputFile = getPath(options.output);

setTimeout(() => {
    spinner.stop();
    try {
        var compiled = handlebars.compile(template);
        var result = compiled(inputYaml);
        fs.writeFileSync(outputFile, result);
        console.log("\n" + result);
    } catch(err) {
        console.log(err);
    }
}, 500);
