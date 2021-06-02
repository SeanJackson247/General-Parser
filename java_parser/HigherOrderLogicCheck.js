function operatorCheck(token,parents,label="none"){
	if(token.type!='string' && token.data==','){
		//check for parents being CALL operation...
		let i=1;
		let lastParent = parents[parents.length-i];
		while(lastParent.type=='delineator' && lastParent.data=='('){
			i++;
			lastParent = parents[parents.length-i];
		}
		if(!(lastParent.type=='operator' && lastParent.data == 'CALL')){
			if(!(lastParent.type=='Function' && label == "arguments")){
				if(!(lastParent.type=='LiteralArray')){
					console.log("Unexpected , on line "+token.lineNumber+":"+token.caretPosition+" in file "+token.fileName);
					throw new Error();
				}
			}
		}
	}
	if(token.type!='string' && token.data==':'){
		if(token.left.type!='operand'){
			console.log("Unexpected : on line "+token.lineNumber+":"+token.caretPosition+" in file "+token.fileName);
			throw new Error();
		}
		if(token.hasOwnProperty('right') && token.right!=undefined){ HigherOrderLogicCheck([token.right],parents,"none"); }		
	}
	else{
		if(token.hasOwnProperty('left') && token.left!=undefined){ HigherOrderLogicCheck([token.left],parents,"none"); }
		if(token.hasOwnProperty('right') && token.right!=undefined){ HigherOrderLogicCheck([token.right],parents,"none"); }
	}
}
function HigherOrderLogicCheck(tokens,parents=[],label='none'){
	let parent = null;
	if(parents.length>0){ parent = parents[parents.length-1]; }
	console.log("Performing Higher Order Logic Check ",parents.length);
	if(parents.length==0){
		//only interfaces and classes permitted at the root
		for(let token of tokens){
			if(!(token.type=='keyword' && (token.data=='class' || token.data=='interface'))){
				console.log("Unexpected "+token.data+" on line "+token.lineNumber+" in file "+token.fileName);
				throw new Error();
			}
			else{
				parents.push(token);
				HigherOrderLogicCheck(token.block,parents,"block");
				parents.pop();
			}
		}
	}
	else if(parent.type=='keyword' && (parent.data=='class' || parent.data=='interface')){
		for(let token of tokens){
			if(token.type=='keyword'){
				console.log("Unexpected "+token.data+" on line "+token.lineNumber+" in file "+token.fileName);
				throw new Error();
			}
			else if(token.type=='Function'){
				parents.push(token);
				if(token.hasOwnProperty('arguments') && Array.isArray(token.arguments)){
					HigherOrderLogicCheck(token.arguments,parents,"arguments");
				}
				if(token.hasOwnProperty('block') && Array.isArray(token.block)){
					HigherOrderLogicCheck(token.block,parents,"block");
				}
				parents.pop();
			}
			else{
				parents.push(token);
				operatorCheck(token,parents);
				parents.pop();
			}
		}
	}
	else if(parent.type=='keyword' && parent.data=='switch'){
		console.log("Must also check switch statement internals...");
		//pretty much everything is ok in a method...
		for(let token of tokens){
			parents.push(token);
			operatorCheck(token,parents);
			if(token.hasOwnProperty('arguments') && Array.isArray(token.arguments)){HigherOrderLogicCheck(token.arguments,parents,"arguments");}
			if(token.hasOwnProperty('condition') && Array.isArray(token.condition)){HigherOrderLogicCheck(token.condition,parents,"condition");}
			if(token.hasOwnProperty('block') && Array.isArray(token.block)){HigherOrderLogicCheck(token.block,parents,"block");}
			parents.pop();
		}
	}
	else if(parent.type=='Function' && (parent.type=='keyword' && (parent.data=='if' || parent.data=='else if' || parent.data=='else' || parent.data=='catch' || parent.data=='switch' || parent.data=='for' || parent.data=='while'  || parent.data=='do'))){
		//pretty much everything is ok in a method...
		for(let token of tokens){
			parents.push(token);
			operatorCheck(token,parents);
			if(token.hasOwnProperty('arguments') && Array.isArray(token.arguments)){HigherOrderLogicCheck(token.arguments,parents,"arguments");}
			if(token.hasOwnProperty('condition') && Array.isArray(token.condition)){HigherOrderLogicCheck(token.condition,parents,"condition");}
			if(token.hasOwnProperty('block') && Array.isArray(token.block)){HigherOrderLogicCheck(token.block,parents,"block");}
			parents.pop();
		}
	}
	
	
	//Now check else if and else always follow ifs
	//try and catch
	//do and while
	//for loops are well formed

	let prevToken = null;
	for(let token of tokens){
		if(token.type=='keyword' && (token.data=='else if' || token.data=='else')){
			if(prevToken==null){
				console.log("Unexpected "+token.data);
				throw new Error();
			}
			if(!(prevToken.type=='keyword' && (prevToken.data=='if' || prevToken.data=='else if'))){
				console.log("Unexpected "+token.data + " following "+prevToken.data);
				throw new Error();
			}
		}
		prevToken = token;
	}


	prevToken = null;
	for(let token of tokens){
		if(token.type=='keyword' && (token.data=='catch' || token.data=='finally')){
			if(prevToken==null){
				console.log("Unexpected "+token.data);
				throw new Error();
			}
			if(!(prevToken.type=='keyword' && (prevToken.data=='try' || prevToken.data=='catch'))){
				console.log("Unexpected "+token.data + " following "+prevToken.data);
				throw new Error();
			}
		}
		prevToken = token;
	}
 
	prevToken = null;
	for(let token of tokens){
		if(token.type=='keyword' && token.data=='for'){
			if(!(token.condition.length == 1 || token.condition.length == 3)){
				console.log("Malformed for loop "+token.data + " following "+prevToken.data);
				throw new Error();				
			}
			else if(token.condition.length == 1){
				if(!(token.condition[0].type=='operator' && token.condition[0].data==':')){
					console.log("Malformed for loop "+token.data + " following "+prevToken.data);
					throw new Error();
				}
			}
		}
		prevToken = token;
	}

	for(let token of tokens){
		if(token.type=='keyword' && token.data=='throws'){
			console.log("Unexpected "+token.data+" on line "+token.lineNumber+" in file "+token.fileName);
			throw new Error();
		}
	}
	
//	parents.pop();
}
module.exports.HigherOrderLogicCheck = HigherOrderLogicCheck;