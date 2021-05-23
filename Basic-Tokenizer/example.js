let parse = require('../Basic-Tokenizer/parse.js');

let fs = require('fs');

let fileName = process.argv[2];

let config = process.argv[3] + "_parse.json";

let code = fs.readFileSync(fileName,'utf-8');

config = fs.readFileSync(config,'utf-8');

config = JSON.parse(config);

let tokens = parse(code,fileName,config);

console.log(tokens);
