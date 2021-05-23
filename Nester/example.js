
let parse = require('../Basic-Tokenizer/parse.js').parse;

let nest = require('../Nester/nest.js').nest;

let fs = require('fs');

let fileName = process.argv[2];

let config = process.argv[3] + "_parse.json";

let code = fs.readFileSync(fileName,'utf-8');

config = fs.readFileSync("../Basic-Tokenizer/"+config,'utf-8');

config = JSON.parse(config);

let tokens = parse(code,fileName,config);

config = process.argv[3] + "_nest.json";

config = fs.readFileSync(config,'utf-8');

config = JSON.parse(config);

tokens = nest(tokens,config);

console.log(JSON.stringify(tokens,0,2));
