let java_base_parse=require('./java_base_parse.js').java_base_parse;

let typeCheck = require('./typeCheck.js').typeCheck;

let JavaToJava = require('./JavaToJava.js').JavaToJava;

let fs = require('fs');

let fileName = process.argv[2];

let tokens = java_base_parse(fileName);

typeCheck(tokens);

let outputString = JavaToJava(tokens);

let breaker = "\n\n\n***************************************************\n\n\n";

fs.writeFileSync("output.java",JSON.stringify(tokens,0,2)+breaker+outputString);
