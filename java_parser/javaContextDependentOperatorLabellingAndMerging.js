function javaContextDependentOperatorLabellingAndMerging(tokens){

	//let inHeader =false;
	//let currentBlockName = "";
	let complexes = [];

	for(let i=0;i<tokens.length;i++){
		let token = tokens[i];
/*		if(!inHeader){
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
		}*/
		if(token.type=='keyword' && (token.data=='class' || token.data=='interface')){
//			inHeader=true;
			complexes.push(tokens[i+1].data);
		}
	}

	console.log("complexes == ",complexes);

	//now loop thru the tokens and label < and > operators next to entries in complexesUsingGenerics as delineators

	for(let i=0;i<tokens.length;i++){
		let token = tokens[i];
		if(token.type=='operand'){
			for(let complex of complexes){
				if(token.data==complex){
					if(i<tokens.length-1 && tokens[i+1].type=='operator' && tokens[i+1].data=='<'){
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

	//we must also use context to correct + and - to unary operators where appropriate...
	//and also ++ and --
	let prevToken = null;
	for(let i=0;i<tokens.length;i++){
		let token = tokens[i];
		if(token.type=='operator' && (token.data=="+" || token.data=="-")){
			if(prevToken==null || (prevToken.type!="operand" && prevToken.type!="string")){
				token.type = "operator-unary-right";
			}
		}
		if(token.type!='single-line-comment' && token.type!='multi-line-comment'){
			prevToken=token;
		}
	}


	prevToken = null;
	for(let i=0;i<tokens.length;i++){
		let token = tokens[i];
		if(token.type=='operator-unary-left' && (token.data=="++" || token.data=="--")){
			if(prevToken==null || (prevToken.type!="operand" && prevToken.type!="string")){
				token.type = "operator-unary-right";
			}
		}
		if(token.type!='single-line-comment' && token.type!='multi-line-comment'){
			prevToken=token;
		}
	}

	//merge exponents ...
	let ntokens = [];
	for(let i=0;i<tokens.length;i++){
		let token = tokens[i];
		let data = token.data;
		if(token.type=="operand" && parseInt(data[0])==data[0] && data[data.length-1] == "e"){
//			console.log("Exponent");
	//		throw new Error();
			token.data+=tokens[i+1].data+tokens[i+2].data;
			ntokens.push(token);
			i+=2;
		}
		else{
			ntokens.push(token);
		}
	}
	
	//also paths beginning with . must be split into operators and operands...
	tokens = ntokens;
	ntokens = [];
	for(let i=0;i<tokens.length;i++){
		let token = tokens[i];
		let data = token.data;
		if(token.type=="operand" && data[0]=='.'){
			ntokens.push({data:".",type:"operator",lineNumber:token.lineNumber,fileName:token.fileName,caretPosition:token.caretPosition});
			token.data = token.data.substring(1);
			token.caretPosition++;
			ntokens.push(token);
		}
		else{
			ntokens.push(token);
		}
	}
	
	//finally else and if should be merged to make an else if
	tokens = ntokens;
	ntokens = [];
	prevToken=null;
	let index =0;
	let prevIndex=null;
	for(let token of tokens){
		if(!prevToken){
			ntokens.push(token);
		}
		else if(prevToken.type=="keyword" && prevToken.data=="else" && token.type=="keyword" && token.data=="if"){
			console.log("Prev Token:",prevToken," and token ",token);
			console.log("ntokens : ",JSON.stringify(ntokens,0,2));
			let commentScoop = [];
			while(ntokens.length>prevIndex+1){
				console.log("While loop");
				commentScoop.push(ntokens[ntokens.length-1]);
				ntokens.pop();
			}
			console.log("ntokens : ",JSON.stringify(ntokens,0,2));
			ntokens[ntokens.length-1].data+=" if";
			commentScoop = commentScoop.reverse();
			for(let comment of commentScoop){
				ntokens.push(comment);
			}
		}
		else{
			ntokens.push(token);			
		}
		if(token.type!='single-line-comment' && token.type!='multi-line-comment'){
			prevToken=token;
			prevIndex=index;
		}
		index++;
	}
	
	return ntokens;
}
module.exports.javaContextDependentOperatorLabellingAndMerging = javaContextDependentOperatorLabellingAndMerging;