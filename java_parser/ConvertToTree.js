function insertOperators(tokens){
	let ntokens = [];
	let isFunctionCall = false;
	for(let i=0;i<tokens.length;i++){
		isFunctionCall=false;
		let token = tokens[i];
		if(i>0 && ((token.type=='delineator' && (token.data=='(' || token.data=='[')) || (token.type=='operand' && (token.data=='()')))){
			let last = tokens[i-1];
			if(last.type=='operand' && last.data[0]!=parseInt(last.data[0])){	//is a var ref...
				if(token.data=='('){
					console.log("VARREF with open bracket");
					ntokens.push({ data:"CALL", type:"operator" , lineNumber:token.lineNumber , fileName:token.fileName, caretPosition:token.caretPosition });
					isFunctionCall = true;
				}
				if(token.data=='['){
					ntokens.push({ data:"LOOK_UP", type:"operator" , lineNumber:token.lineNumber , fileName:token.fileName, caretPosition:token.caretPosition });
				}
			}
		}
		for(let prop in token){
			if(token.hasOwnProperty(prop)){
				if(Array.isArray(token[prop])){
					token[prop] = insertOperators(token[prop]);
				}
			}
		}
		ntokens.push(token);
		if(token.data=="(" && !isFunctionCall){
			ntokens.push({ data:"CAST", type:"operator" , lineNumber:token.lineNumber , fileName:token.fileName, caretPosition:token.caretPosition });
		}
	}
	return ntokens;
}

function getPrecedence(data){
	
	//http://www.cs.bilkent.edu.tr/~guvenir/courses/CS101/op_precedence.html
	
	let ops = [
		"CAST",
		"CALL",
		"LOOK_UP",
		".",
		"++",
		"--",
		"+",
		"-",
		"!",
		"~",
		"*",
		"/",
		"%",
		"+",
		"-",
		"<<",
		">>",
		">>>",
		"<",
		"<=",
		">",
		">=",
		"instanceof",
		"==",
		"!=",
		"&",
		"^",
		"|",
		"&&",
		"||",
		"?",
		":",
		"=",
		"+=",
		"-=",
		"*=",
		"/=",
		"%=",
		":"
	];
	ops = ops.reverse();
	return ops.indexOf(data);
}

function toRPN(tokens){
	//Shunting yard algorithm operating on operators, everything else simply dragged along.
	//type associations also performed here
	
	//There are really two kinds here : expressions demarcated by terminators and expressions demarcated by two consecutive operands
	
	//For now this is just RPN conversion for the first type.
	
	//Also static and final keywords are essentially operands...
	
	console.log("Prior to RPN : ",tokens);
	
	let andstack = [];
	let atorstack = [];
	let lastToken=null;
	for(let i=0;i<tokens.length;i++){
		let token = tokens[i];
//		console.log("Procesing Token == ",token.data);
		if(token.type=='terminator'){
			while(atorstack.length>0){
				andstack.push(atorstack[atorstack.length-1]);
				atorstack.pop();
			}
			andstack.push(token);
		}
		else if(token.type=='operator'){
			if(atorstack.length==0){
				atorstack.push(token);
			}
			else{
				let last = atorstack[atorstack.length-1];
				while(atorstack.length>0 && getPrecedence(last.data) > getPrecedence(token.data)){
					andstack.push(last);
					atorstack.pop();
					last = atorstack[atorstack.length-1];
				}
				atorstack.push(token);
			}
		}
		else if(token.type=='operator-unary-right'){
			andstack.push(tokens[i+1]);
			i++;
			andstack.push(token);
		}
		else if(
			
			(token.type=='operand' || (token.type=='keyword' && ((token.data=='static' && !token.block) || token.data=='final' || token.data=='native' || token.data=='private' || token.data=='public' || token.data=='protected'))) &&
			(lastToken!=null && lastToken.type=='operand' || (lastToken!=null && lastToken.type=='keyword' && ((lastToken.data=='static' && !lastToken.block) || lastToken.data=='final' || lastToken.data=='native' || lastToken.data=='private' || lastToken.data=='public' || lastToken.data=='protected')))
			
			){
				
				//this check needs to be modded to include privacy checks
			
			let last = andstack[andstack.length-1];
			andstack.pop();
			if(last.typeLabel){
				last.data = last.typeLabel+" "+ last.data;
			}
			token.typeLabel = last.data;
			andstack.push(token);
		}
		else if(token.type=='keyword'){
			//flush operator stack when keyword is encountered
			andstack.push(token);
			while(atorstack.length>0){
				andstack.push(atorstack[atorstack.length-1]);
				atorstack.pop();
			}
		}
		else if(token.type!='single-line-comment' && token.type!='multi-line-comment'){
			andstack.push(token);
		}
		if(token.type!='single-line-comment' && token.type!='multi-line-comment'){
			lastToken=token;
		}
	//	console.log("Processed Token == ",token.data);
		//console.log("andstack == ",andstack);
	//	console.log("atorstack == ",atorstack);
	}
	while(atorstack.length>0){
		andstack.push(atorstack[atorstack.length-1]);
		atorstack.pop();
	}
	for(let token of andstack){
		for(let prop in token){
			if(token.hasOwnProperty(prop)){
				if(Array.isArray(token[prop])){
					token[prop] = toRPN(token[prop]);
				}
			}
		}
	}
	console.log("After RPN : ",andstack);
	return andstack;
}
function toTree(tokens){
	for(let token of tokens){
		for(let prop in token){
			if(token.hasOwnProperty(prop)){
				if(Array.isArray(token[prop])){
					token[prop] = toTree(token[prop]);
				}
			}
		}
	}
	let buffer = [];
	for(let token of tokens){
		if(token.type=='operator'){
			let right = buffer[buffer.length-1];
			buffer.pop();
			let left = buffer[buffer.length-1];
			buffer.pop();
			token.left = left;
			token.right = right;
			buffer.push(token);			
		}
		else if(token.type=='operator-unary-left'){
			let last = buffer[buffer.length-1];
			buffer.pop();
			token.left = last;
			buffer.push(token);
		}
		else if(token.type=='operator-unary-right'){
			let last = buffer[buffer.length-1];
			buffer.pop();
			token.right = last;
			buffer.push(token);
		}
		else if(token.type!='terminator'){
			buffer.push(token);
		}
	}
	tokens = buffer;
	return tokens;
}

function ConvertToTree(tokens){
	tokens = insertOperators(tokens);
	tokens = toRPN(tokens);
	tokens = toTree(tokens);
	return tokens;
}
module.exports.ConvertToTree = ConvertToTree;