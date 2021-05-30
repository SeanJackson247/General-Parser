function javaGatherByStatementsAndKeywords(tokens,parent=null){

	//does not take into account method which throw

	if(tokens == undefined){ return undefined; } //this here is extremely bad , fix later

	function handleGenerics(tokens){
		let ntokens = [];
		for(let token of tokens){
			if(token.type == "delineator" && token.data=="<"){
				if(ntokens.length==0){
					ntokens.push(token);
				}
				else{
					ntokens[ntokens.length-1].generics = token.sub;
				}
			}
			else{
				ntokens.push(token);
			}
		}
		for(let token of ntokens){
			if(token.sub){
				token.sub = handleGenerics(token.sub);
			}
		}
		return ntokens;
	}
	
	tokens = handleGenerics(tokens);

	let ntokens = [];
//make class gather leadingkeywords...

	for(let i=0;i<tokens.length;i++){
		let token = tokens[i];
		if(token.type=='keyword'){
			if(i<tokens.length-1 && token.data=='static' && tokens[i+1].type=='delineator' && tokens[i+1].data=='{'){
				//static block
	//			console.log("Static Block!");
//				throw new Error();
				token.block = tokens[i+1].sub;
				ntokens.push(token);
				i++;
			}
			else if(token.data=="if" || token.data=="while" || token.data=="for" || token.data=="catch" || token.data=="switch"){
				token.condition = tokens[i+1].sub;
				if(tokens[i+2].sub != undefined){ token.block = javaGatherByStatementsAndKeywords(tokens[i+2].sub,token); }
				ntokens.push(token);
				i+=2;
			}
			else if(token.data=="else" || token.data=="try" || token.data=="finally"){
				if(tokens[i+1].sub != undefined){ token.block = javaGatherByStatementsAndKeywords(tokens[i+1].sub,token); }
				ntokens.push(token);
				i++;
			}
			else if(token.data=="do"){
				token.condition = tokens[i+3].sub;
				if(tokens[i+1].sub != undefined){ token.block = javaGatherByStatementsAndKeywords(tokens[i+1].sub,token); }
				ntokens.push(token);
				i+=3;
			}
			else if(token.data=="class" || token.data=="interface"){
				console.log("Encountered complex....");
				//check ntokens for preceeding keywords...
				
				let esc=false;
				let leadingKeywords = [];
				while(!esc && ntokens.length>0){
					let top = ntokens[ntokens.length-1];
					if(top.type!='keyword'){ esc=true; }
					else{
						if(top.data=="static"){
							token._static = top.data;
						}
						else if(top.data=="package" || top.data=="protected" || top.data=="public" || top.data=="private"){
							token.encapsulation = top.data;
						}
						else if(top.data=="native"){
							token._native=true;
						}
						else if(top.data=="final"){
							token._final=true;
						}
						else if(top.data=="abstract"){
							token._abstract=true;							
						}						
						else{
							esc=true;
						}
						if(!esc){
							ntokens.pop();
						}
					}
				}
				i++;
				esc=false;
				let buffer = [];
				while(i<tokens.length && !esc){
					let t = tokens[i];
					if((t.type=='operand' && t.data=='{}') || (t.type=='delineator' && t.data=='{')){
						token.header = buffer;
						let x=0;
						let _implements = [];
						let inImplements = false;
						for(x=0;x<token.header.length;x++){
							if(inImplements){
								_implements.push(token.header[x]);
							}
							if(token.header[x].type=='keyword' && token.header[x].data=='implements'){
								inImplements=true;
							}
						}
						x=0;
						let esc2=false;
						for(x=0;esc2==false && x<token.header.length;x++){
							let t = token.header[x];
							if(t.type=='keyword'){
								if(t.data=='extends'){
									token._extends = token.header[x+1].data;
								}
								esc2=true;
								x--;
							}
						}
						x--;
						if(token.header[x].type=="delineator" && token.header[x].data=="<"){
							token.generics = javaGatherByStatementsAndKeywords(token.header[x].sub,token.header[x]);
							x--;
						}
						token.name = token.header[x].data;
						token._implements = _implements; 
						if(t.sub != undefined){ token.block = javaGatherByStatementsAndKeywords(t.sub,token); }
						delete token.header;//this can be commented in and out for debugging
						ntokens.push(token);
						esc=true;
					}
					else{
						buffer.push(t);
					}
					i++;
				}
				i--;
			}
			else if(token.data=="import"){
				ntokens.push(token);
				i++;
				let buff="";
				let hitTerminal=false;
				while(i<tokens.length && !hitTerminal){
					if(tokens[i].type=="terminator" && tokens[i].data==";"){
						ntokens.push({type:"operand",data:buff,lineNumber:tokens[i].lineNumber,fileName : tokens[i].fileName,caretPosition:tokens[i].caretPosition});
						ntokens.push(tokens[i]);
						hitTerminal=true;
						i--;
					}
					else{
						buff+=tokens[i].data;
					}
					i++;
				}
			}
			else if(token.data=="case"){
				i++;
				tokens[i].typeLabel = "case";
				ntokens.push(tokens[i]);
			}
			else if(token.data=="break"){
				i++;
				if(tokens[i].type != "operand"){
					ntokens.push(token);
					ntokens.push(tokens[i]);
				}
				else{
					tokens[i].typeLabel = "break";
					ntokens.push(tokens[i]);
				}
			}
			else{
				ntokens.push(token);
			}
		}
		else if(
			i<tokens.length-1 &&
			((token.type=="delineator" &&
			token.data=="[") || (token.type=="operand" && token.data=="[]")) &&
			(((tokens[i+1].type=="delineator" &&
			tokens[i+1].data=="{") || (tokens[i+1].type == "operand" && tokens[i+1].data=="{}"))))
			{
				
				console.log("Unwritten Code! Array literal...",tokens[i],tokens[i-1],tokens[i+1]);
//				throw new Error();

				ntokens.pop();

				ntokens.push({
					data: tokens[i-1].data,
					type:"LiteralArray",
					lineNumber:token.lineNumber,
					fileName:token.fileName,
					caretPosition:token.caretPosition
				});
				
				console.log("Making Sub...");
				if(token.sub != undefined){ ntokens[ntokens.length-1].arguments = javaGatherByStatementsAndKeywords(token.sub,ntokens[ntokens.length-1]); }
				if(tokens[i+1].sub != undefined){ ntokens[ntokens.length-1].block = javaGatherByStatementsAndKeywords(tokens[i+1].sub,ntokens[ntokens.length-1]); }
				console.log("Made Sub...");
				i++;

		}
		else if(

			i<tokens.length-1 &&
			token.type=="delineator" &&
			(token.data=="(" || token.data=="()") &&
			
			(((tokens[i+1].type=="delineator" &&
			tokens[i+1].data=="{") || (tokens[i+1].type == "operand" && tokens[i+1].data=="{}"))
				||
			(tokens[i+1].type=="terminator" &&
			tokens[i+1].data==";")
				||
			(tokens[i+1].type=="keyword" &&
			tokens[i+1].data=="throws")
			
			))
			{
			
			console.log("Possible Function Declaration or Signature detected on line "+token.lineNumber,token,tokens[i-1],tokens[i+1]);
			
			//throw new Error();
			
			//DOES NOT TAKE INTO ACCOUNT LITERAL SUBCLASSES .. or array literals for that matter...
			
			//a function...
			//a functions beginning is marked by anything which doesnt belong in the function name i.e. keyword, or name
						
			//OK parent not needed ? rely on terminators....

			let isDeclaration = false;
			if((tokens[i+1].type=="delineator" && tokens[i+1].data=="{") || (tokens[i+1].type=="operand" && tokens[i+1].data=="{}") || (tokens[i+1].type=="keyword" && tokens[i+1].data=="throws")){
				isDeclaration=true;
			}

			let esc=false;
			let buffer = [];
			let isSignature = false;
			let times = 0;
			let isLiteralSubClass = false;
			while(ntokens.length>0 && esc==false){
				let top = ntokens[ntokens.length-1];
				//console.log("Considering ... ",top);
				if(top.type=='Function' || top.type=='terminator' || (top.type=='keyword' && (top.data=='class' || top.data=='interface'))){
					esc=true;
					//isSignature=true;
				}
				else if(top.type=='operator' || top.type=='operator-unary-right' || top.type=='operator-unary-left' || (top.type=='keyword' && top.data=='return')){
				//	console.log("top == ",top,tokens[i+1]);
				//	throw new Error();
					if(top.type=='operator-unary-right' && top.data=='new' &&  ((tokens[i+1].type=="delineator" && tokens[i+1].data=="{") || (tokens[i+1].type=="operand" && tokens[i+1].data=="{}"))){
						//is sub class
						console.log("Sub Class");
						isLiteralSubClass=true;
//						throw new Error();
					}
					esc=true;
				}
				else if(top.type=='delineator' && (top.data=='(' || top.data=='{' || top.data=='[' || top.data=='<')){
	//				throw new Error();
					esc=true;
				}
				else if(top.type=='keyword' && (top.data=='if' || top.data=='else' || top.data=='while' || top.data=='for' || top.data=='case' || top.data=='switch' || top.data=='default' || top.data=='break' || top.data=='case')){
	//				throw new Error();
					esc=true;
				}
				else{
					if(times>0 && !isDeclaration){
						console.log("Is a signature ",top);
//						throw new Error();
						isSignature=true;
					}
					buffer.push(top);
					ntokens.pop();
				}
				times++;
			}

//			if(esc==false){ isSignature=true; }

			
			//the buffer is either a function declaration, signature, or invocation
			//if it is not a declaration, then we must check that it is a signature...
			
			//This is all wrong because the buffer stops short of taking an operator, its not going to detect the '='. needs rethink
			//should be able to detect in loop above! ^ ?
			if(isLiteralSubClass){
				console.log("Unwritten Code, literal subclass");
				//throw new Error();
				
				ntokens.push({
					data: tokens[i-1].data,
					type:"LiteralSubClass",
					lineNumber:token.lineNumber,
					fileName:token.fileName,
					caretPosition:token.caretPosition
				});
				
				console.log("Making Sub...");
				
				if(token.sub != undefined){ ntokens[ntokens.length-1].arguments = javaGatherByStatementsAndKeywords(token.sub,ntokens[ntokens.length-1]); }
				
				if(tokens[i+1].sub != undefined){ ntokens[ntokens.length-1].block = javaGatherByStatementsAndKeywords(tokens[i+1].sub,ntokens[ntokens.length-1]); }
				console.log("Made Sub...");
				i++;

			}
			else if(isSignature || isDeclaration){
				console.log("isSignature || isDeclaration == ",isSignature ,"||", isDeclaration);
				
				console.log(token , ntokens);
				
				//throw new Error();

				let returnType = '';
				let _static = "";
				let encapsulation = "";
				let annotations = "";
				let _native = false;
				let _final =false;
				for(let b of buffer){
					if(b.type!='keyword' && b.data[0]!='@'){
						returnType = b.data;
					}
					if(b.type!='keyword' && b.data[0]=='@'){
						annotations += b.data+" ";
					}
					if(b.type=='keyword' && b.data=='static'){
						_static="static";
					}
					if(b.type=='keyword' && b.data=='package'){
						encapsulation="package";
					}
					if(b.type=='keyword' && b.data=='protected'){
						encapsulation="protected";
					}
					if(b.type=='keyword' && b.data=='public'){
						encapsulation="public";
					}
					if(b.type=='keyword' && b.data=='private'){
						encapsulation="private";
					}
					if(b.type=='keyword' && b.data=='native'){
						_native=true;
					}
					if(b.type=='keyword' && b.data=='final'){
						_final=true;
					}
				}
				
	//			console.log("buffer == ",buffer);
//				throw new Error();
				ntokens.push({
					data: "Function",
					type:"Function",
					_native:_native,
					_final:_final,
					annotations:annotations,
					returnType:returnType,
					_static:_static,
					encapsulation:encapsulation,
//					header: buffer.reverse(),
					name:buffer[0],
					arguments:token.sub ,
					lineNumber:token.lineNumber,
					fileName:token.fileName,
					caretPosition:token.caretPosition
				});
				
				console.log(ntokens);
				
				if(tokens[i+1].type=='keyword' && tokens[i+1].data=='throws'){
					console.log("throws == ",ntokens,tokens[i+1]);
				//	console.log('tokens');
			//		throw new Error();
			
			//needs to be modded to a scoop
					let throwArray=[];					
					i+=2;
					let esc=false;
					while(i<tokens.length && !esc){
						if((tokens[i].type == "delineator" && tokens[i].data=="{") || (tokens[i].type == "operand" && tokens[i].data=="{}")){
							esc=true;
							i--;
						}
						else{
							if(tokens[i].data!=","){
								throwArray.push(tokens[i]);
							}
						}
						i++;
					}
					ntokens[ntokens.length-1]._throws = throwArray;
					if(tokens[i].sub != undefined){ ntokens[ntokens.length-1].block = javaGatherByStatementsAndKeywords(tokens[i].sub,ntokens[ntokens.length-1]); }
				}
				else{
					if(tokens[i+1].sub != undefined){ ntokens[ntokens.length-1].block = javaGatherByStatementsAndKeywords(tokens[i+1].sub,ntokens[ntokens.length-1]); }
					i++;
				}
			}
			else{
				//otherwise is just an invocation...
				console.log("Nope, just an invocation...",isDeclaration,isSignature);
				
				//throw new Error();
				
				buffer=buffer.reverse();
				for(let b of buffer){
					ntokens.push(b);
				}
				ntokens.push(token);
				
				console.log("Tokens ",i,tokens.length,token);
//				i++;
			}
		}
		else{
			ntokens.push(token);
		}
	}

	return ntokens;

}
module.exports.javaGatherByStatementsAndKeywords = javaGatherByStatementsAndKeywords;