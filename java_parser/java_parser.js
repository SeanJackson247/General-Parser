let java_base_parse=require('C:/node/lang/java_base_parse.js').java_base_parse;

let typeCheck = require('C:/node/lang/typeCheck.js').typeCheck;

let JavaToJava = require('C:/node/lang/javaToJava.js').JavaToJava;

let fs = require('fs');

let fileName = process.argv[2];

let tokens = java_base_parse(fileName);

typeCheck(tokens);

let outputString = JavaToJava(tokens,false,0,true);

fs.writeFileSync("C:/node/lang/output.java",outputString);
