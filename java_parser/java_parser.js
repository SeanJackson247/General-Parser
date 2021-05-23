let java_base_parse=require('./java_base_parse.js').java_base_parse;

let typeCheck = require('./typeCheck.js').typeCheck;

let JavaToJava = require('./JavaToJava.js').JavaToJava;

let fs = require('fs');

let fileName = process.argv[2];

let tokens = java_base_parse(fileName);

typeCheck(tokens);

let outputString = JavaToJava(tokens,false,0,true);

fs.writeFileSync("output.java",outputString);
