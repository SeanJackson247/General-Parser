function parse(code,fileName,config){

	let {splitters,keepers,multiples,labels} = config;

	let stringDelineators = config["string-delineators"];
	let singleLineCommentOpener = config["single-line-comment-opener"];
	let multiLineCommentOpener = config["multi-line-comment-opener"];
	let multiLineCommentCloser = config["multi-line-comment-closer"];

	class Token{
		constructor(data,type,lineNumber,fileName){
			this.data=data;
			this.type=type;
			this.lineNumber=lineNumber;
			this.fileName=fileName;
		}
	};

	let tokens = [];

	function tokens_push(token){
		if(token.type=="code"){
			if(tokens.length==0){
				tokens.push(token);
			}
			else{
				let last = tokens[tokens.length-1];
				if(last.type=="code"){
					let candidate = last.data + token.data;
					let found = false;
					for(let text of multiples){
						if(text==candidate){ found=true; }
					}
					if(!found){
						tokens.push(token);			
					}
					else{
						last.data = candidate;
					}
				}
				else{
					tokens.push(token);			
				}
			}
		}
		else{
			tokens.push(token);
		}
	}

	let mode = "code";

	let buffer = "";

	let stringDelineator = '!';

	let lineNumber = 1;

	for(let i=0;i<code.length;i++){
//		console.log("Considering ",i,code[i].split('\n').join('\\n').split('\r').join('\\r').split('\t').join('\\t'),mode);
		if(mode=="string"){
			if(code[i]==stringDelineator){
				tokens_push(new Token(buffer,mode,lineNumber,fileName));
				buffer="";
				mode = "code";
				stringDelineator = '!';
			}
			else{
				buffer+=code[i];
			}
		}
		else if(mode=="multi-line-comment"){
			if(code.substring(i,i+multiLineCommentCloser.length) == multiLineCommentCloser){
				tokens_push(new Token(buffer,mode,lineNumber,fileName));
				buffer = "";
				mode = "code";
				i++;
			}
			else{
				buffer+=code[i];				
			}
		}
		else if(mode=="single-line-comment"){
			if(code[i]=='\n'){
				tokens_push(new Token(buffer,mode,lineNumber,fileName));
				buffer = "";
				mode = "code";
			}
			else{
				buffer+=code[i];
			}
		}
		else{
			if(stringDelineators.indexOf(code[i])>=0){
				stringDelineator = code[i];
				mode = "string";
			}
			else if(code.substring(i,i+singleLineCommentOpener.length) == singleLineCommentOpener){
				if(buffer.length>0){ tokens_push(new Token(buffer,mode,lineNumber,fileName)); }		
				mode = "single-line-comment";
				buffer="";
				i++;
			}
			else if(code.substring(i,i+multiLineCommentOpener.length) == multiLineCommentOpener){
				if(buffer.length>0){ tokens_push(new Token(buffer,mode,lineNumber,fileName)); }		
				mode = "multi-line-comment";
				buffer="";
				i++;
			}
			else if(splitters.indexOf(code[i])>=0){
				if(buffer.length>0){ tokens_push(new Token(buffer,mode,lineNumber,fileName)); }
				buffer = "";
			}
			else if(keepers.indexOf(code[i])>=0){
				if(buffer.length>0){ tokens_push(new Token(buffer,mode,lineNumber,fileName)); }		
				tokens_push(new Token(code[i],mode,lineNumber,fileName));
				buffer = "";
			}
			else{
				buffer+=code[i];
			}
		}
		if(code[i]=='\n'){
			lineNumber++;
		}
	}

	if(buffer.length>0){
		tokens_push(new Token(buffer,mode,lineNumber,fileName));
	}
	
	for(let token of tokens){
		if(token.type=="code"){
			for(let label in labels){
				for(let sub of labels[label]){
					if(sub == token.data){ token.type = label; }
				}
			}
			if(token.type=="code"){ token.type = "operand"; }
		}
	}
	return tokens;

}
module.exports = parse;
