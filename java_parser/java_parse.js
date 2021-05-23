let parse = require('C:/node/lang/parse.js').parse;
let fs = require('fs');
function java_parse(fileName,requester){
	let config = "java_parse.json";

	let code;
	try{
		code = fs.readFileSync(fileName,'utf-8');
	}catch(e){
		console.log(e);
		console.log("Requested by ",requester);
		throw new Error();
	}

	config = fs.readFileSync(config,'utf-8');

	config = JSON.parse(config);

	let tokens = parse(code,fileName,config);
	
	return tokens;
}
module.exports.java_parse = java_parse;