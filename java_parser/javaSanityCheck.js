function javaSanityCheck(tokens){
	//exponents
	for(let token of tokens){
		if(token.type=='keyword'){
			//check for subset of java
			if(
				token.data!="if" &&
				token.data!="for" &&
				token.data!="while" &&
				token.data!="else" &&
				token.data!="else if" &&
				token.data!="try" &&
				token.data!="catch" &&
				token.data!="throws" &&
				token.data!="class" &&
				token.data!="interface" &&
				token.data!="extends" &&
				token.data!="implements" &&
				token.data!="throw" &&
				token.data!="static" &&
				token.data!="private" &&
				token.data!="public" &&
				token.data!="package" &&
				token.data!="protected" &&
				token.data!="import" &&
				token.data!="final" &&
				token.data!="return" &&
				token.data!="finally" &&
				token.data!="abstract"){
					
					console.log("Error! This compiler supports a limited subset of Java features.\nUnsupported keyword \'"+token.data+"\' on line "+token.lineNumber+" in file "+token.fileName);
					throw new Error();
			}
		}
		else if(token.type=='operator' && token.data=="->"){
			console.log("Error! This compiler supports a limited subset of Java features.\nLambdas are not supported.\nUnsupported operator \'"+token.data+"\' on line "+token.lineNumber+" in file "+token.fileName);
			throw new Error();
		}
		else if(token.type=='operator' && token.data==":"){
			console.log("Error! This compiler supports a limited subset of Java features.\nSpecial for loops are not supported.\nUnsupported operator \'"+token.data+"\' on line "+token.lineNumber+" in file "+token.fileName);
			throw new Error();
		}
		else if(token.type=='string' && token.data.length!=1 && token.delineator!='\"'){
			if(token.data.length>0){
				console.log("Error! Use of \' delineator on non-char String.\nPerhaps you meant to use \" for the String \'"+token.data+"\' on line "+token.lineNumber+" in file "+token.fileName);
				throw new Error();
			}
			else{
				console.log("Error! Use of ' delineator on non-char.\nEmpty char \'"+token.data+"\' on line "+token.lineNumber+" in file "+token.fileName);
				throw new Error();
			}
		}
		else if(token.type=="string" && token.data.indexOf('\n')>=0){
			console.log("Error! Use of newline within a String.\nThis is not supported in Java.\nProblem for String \'"+token.data+"\' beginning on line "+token.lineNumber+" in file "+token.fileName);
			throw new Error();			
		}
		else if(token.type=='operand'){
			let handled=false;
			if(token.data=='[]' || token.data=='()' || token.data=='{}'){ handled=true; }
			if(parseInt(token.data[0])==token.data[0] && token.data[0]!='0'){
				handled=true;
				if(parseFloat(token.data)!=token.data && parseInt(token.data)!=token.data){
					if(token.data[token.data.length-1] == 'f' || token.data[token.data.length-1] == 'F'){
						let substr = token.data.substring(0,token.data.length-1);
						if(parseFloat(substr)!=substr){
							console.log('Invalid token ',token);
							throw new Error();
						}
					}
					else if(token.data[token.data.length-1] == 'L'){
						let substr = token.data.substring(0,token.data.length-1);
						if(parseInt(substr)!=substr){
							console.log('Invalid token ',token);
							throw new Error();
						}
					}
					else{
						console.log('Invalid token ',token);
						throw new Error();
					}
				}
			}
			if(token.data[0]=='0' && token.data.length>1){
				handled=true;
				if(token.data.indexOf('.')<=0){
					//octal , hexadecimal, or binary
					if(token.data[1]=='x' || token.data[1]=='X'){
						if(isNaN(parseInt(token.data.substring(2).toLowerCase(),16))){
							console.log('Invalid token ',token);
							throw new Error();
						}
					}
					else if(token.data[1]=='b' || token.data[1]=='B'){
						if(isNaN(parseInt(token.data.substring(2).toLowerCase(),2))){
							console.log('Invalid token ',token);
							throw new Error();
						}
					}
					else{
						if(isNaN(parseInt(token.data.substring(2).toLowerCase,8))){
							console.log('Invalid token ',token);
							throw new Error();
						}
					}
				}
			}
			if(!handled){
				for(let i=0;i<token.data.length;i++){
					if("_QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890.@".indexOf(token.data[i])<0){
						console.log('Invalid token ',token);
						throw new Error();
					}
				}
			}
		}
	}
}
module.exports.javaSanityCheck = javaSanityCheck;
