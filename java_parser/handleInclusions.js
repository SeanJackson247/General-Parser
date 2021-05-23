//there is a problem here with circular dependencies...

//this must be checked for circular references

let imported = [];

function handleInclusions(tokens,parent){
	let ntokens = [];
	function load(file){
		console.log("Loading ",file);
//		let java_base_parse=require('C:/node/lang/java_base_parse.js').java_base_parse;
		let java_parse=require('C:/node/lang/java_parse.js').java_parse;
		if(imported.length==0){
			imported.push(file);
			let newTokens = java_parse(file);//java_base_parse(file);
			console.log("New Tokens for appending ",newTokens);
			//ntokens = ntokens.concat(newTokens,parent);
			for(let token of newTokens){
				if(token!=null){
					ntokens.push(token);
				}
			}
			//this is bizarre ?
			console.log("End of load function ",ntokens);
		}
		else{
			let circular=false;
			for(let f of imported){
				if(f == file){
					console.log("Warning : Circular dependency, ",f," requested multiple times");
					//throw new Error();
					circular=true;
				}
			}
			if(!circular){
				imported.push(file);			
				ntokens = ntokens.concat(/*java_base_parse(file)*/java_parse(file),parent);
			}
		}
	}
	for(let i=0;i<tokens.length;i++){
		let token = tokens[i];
		let handled=false;
		if(token.type=='keyword'){
			if(token.data=='import'){
				i++;
				//console.log("java_base_parse == ",java_base_parse);
				let filename = tokens[i].data.split('.').join('/');
				if(filename.indexOf('*')>=0){
					console.log("Unwritten Code : * in import.");
					filename = filename.split()[0];
					//remove last /
					filename = filename.substring(0,filename.length-1);
					let fs = require('fs');
					function loadDir(filename){
						let filelist = fs.readdirSync(filename);
						console.log("Filelist == ",filelist);
						for(let file of filelist){
							if(file.indexOf('.')>=0){
								console.log("File := ",filename+'/'+file);
								load(filename+'/'+file,tokens[i]);							
							}
							else{
								loadDir(filename+'/'+file);
							}
						}
					}
					loadDir(filename);
				}
				else{
					console.log("Prior to import processing:",ntokens);
					load(filename+'.java',tokens[i]);
					handled=true;
//					i--;
				}
				console.log("End of import processing:",ntokens);
			}
		}
		if(!handled){ ntokens.push(token); }
	}
	console.log("NTOKENS:",ntokens);
	return ntokens;
}
module.exports.handleInclusions = handleInclusions;