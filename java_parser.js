let parse = require('C:/node/lang/parse.js');

let nest = require('C:/node/lang/nest.js');

let fs = require('fs');

let fileName = process.argv[2];

let config = "java_parse.json";

let code = fs.readFileSync(fileName,'utf-8');

config = fs.readFileSync(config,'utf-8');

config = JSON.parse(config);

let tokens = parse(code,fileName,config);

//first label all < and > operators in class and interface headers...
//note complex types which use these operators

let inHeader =false;
let currentBlockName = "";
let complexesUsingGenerics = [];

for(let i=0;i<tokens.length;i++){
	let token = tokens[i];
	if(!inHeader){
		if(token.type=='keyword' && (token.data=='class' || token.data=='interface')){
			inHeader=true;
			currentBlockName = tokens[i+1].data;
		}
	}
	else{
		if(token.type=='keyword' && (token.data=='extends' || token.data=='implements')){
			inHeader=false;
			currentBlockName="";
		}
		if(token.type=='delineator' && token.data=='{'){
			inHeader=false;
			currentBlockName="";
		}
		if(token.type=='operator' && (token.data=='<' || token.data=='>')){
			token.type = 'delineator';
			if(currentBlockName.length>0){
				complexesUsingGenerics.push({name:currentBlockName,index:i});
			}
		}
	}
}

//now loop thru the tokens and label < and > operators next to entries in complexesUsingGenerics as delineators

for(let i=0;i<tokens.length;i++){
	let token = tokens[i];
	if(token.type=='operand'){
		for(let complex of complexesUsingGenerics){
			if(token.data==complex.name && i!=complex.index){
				if(tokens[i+1].type=='operator' && tokens[i+1].data=='<'){
					tokens[i+1].type = "delineator";
					let depth = 1;
					i+=2;
					while(i<tokens.length && depth>0){
						if(tokens[i].type=='operator' && tokens[i].data=='<'){
							depth++;
							tokens[i].type='delineator';
						}
						else if(tokens[i].type=='operator' && tokens[i].data=='>'){
							depth--;
							tokens[i].type='delineator';
						}
						i++;
					}
				}
			}
		}
	}
}

config = "java_nest.json";

config = fs.readFileSync(config,'utf-8');

config = JSON.parse(config);

tokens = nest(tokens,config);

console.log(JSON.stringify(tokens,0,2));
