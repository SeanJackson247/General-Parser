function JavaToJava(tokens,includeTerminals=false,indent=0,includeNewLines=false){
	//compile...
	console.log("COMPILING ",tokens);
	if(tokens==undefined){ return undefined; }//hacky
	if(tokens.length==1 && tokens[0]==undefined){ return undefined; }
	let tabs = '\t'.repeat(indent);
	let code = "";//tabs;
	for(let token of tokens){
		if(includeTerminals && includeNewLines){code+=tabs;}
//		if(includeTerminals && includeNewLines){code+="TABS("+tokens.length+")";}
		console.log("COMPILING TOKEN ",token);
		if(token.type=="keyword"){
			if(token.data=='class'){
				let header = token.header;
				code+="class " + token.name;
				if(token._extends){
					code+=" extends "+token._extends;
				}
				if(token.block){
					code+="{\n"+JavaToJava(token.block,true,indent+1,true)+"}\n";
				}
				else{
					code+="{}\n";
				}
			}
			else if(token.data=="interface"){
//				console.log('No!');
	//			throw new Error();
				let header = token.header;
				code+="class " + token.name;
				if(token._extends){
					code+=" extends "+token._extends;
				}
				if(token.block){
					code+="{\n"+JavaToJava(token.block,true,indent+1,true)+"}\n";
				}
				else{
					code+="{}\n";
				}
			}
			else if(token.data=="do" || token.data=="try"){
	//			console.log('No!');
//				throw new Error();
				code+=token.data;
				if(token.block){
					code+="{\n"+JavaToJava(token.block,true,indent+1,true)+tabs+"}\n";
				}
				else{
					code+="{}\n";					
				}
			}
			else if(token.data=="for" || token.data=="while" || token.data=="if" || token.data=="catch"){
				code+=token.data;
				if(token.data=="for"){
					let sub = JavaToJava(token.condition,true,0,false);
					code+="("+sub.substring(0,sub.length-1)+")";
				}
				else{
					code+="("+JavaToJava(token.condition,false,0)+")";					
				}
				if(token.block){
					code+="{\n"+JavaToJava(token.block,true,indent+1,true)+tabs+"}\n";
				}
				else{
					code+="{}\n";					
				}
			}
			else if(token.data=="static"){
				//static block
				code+="static{\n"+JavaToJava(token.block,true,indent+1)+tabs+"}";
			}
			else if(token.data=='return'){
				code+="return";
			}
			else if(token.data=="continue"){
				code+="continue";
				if(includeTerminals){
					code+=";";
				}
				if(includeNewLines){
					code+="\n";
				}

			}
		}
		else if(token.type=="Function"){
			code+=token.annotations+"\n";
			code+=tabs+token._static+" ";
			if(token._native){ code+="native "; }
			if(token._final){ code+="final "; }
			code+=token.encapsulation+" ";
			code+=token.returnType+" ";
			code+=token.name.data;
			code+="("+JavaToJava(token.arguments)+")";
			if(token._throws && token._throws.length>0){
				code+=" throws ";
				for(let index=0;index<token._throws.length;index++){
					code+=token._throws[index].data;
					if(index<token._throws.length-1){
						code+=",";
					}
				}
			}
			if(token.block){
				code+="{\n"+JavaToJava(token.block,true,indent+1,true)+tabs+"}\n";
			}
			else{
				code+=";\n";				
			}
		}
		else if(token.type=='operator-unary-right'){
			code+=token.data+" "+JavaToJava([token.right],false,0);
			if(includeTerminals){
				code+=";";
			}
			if(includeNewLines){
				code+="\n";
			}
		}
		else if(token.type=='operator-unary-left'){
			code+=JavaToJava([token.left],false,0)+token.data;
			if(includeTerminals){
				code+=";";
			}
			if(includeNewLines){
				code+="\n";
			}
		}
		else if(token.type=='operator'){
			console.log('str',JSON.stringify(token,0,2));
			if(token.data=='CALL' || token.data=='LOOK_UP'){
				code+=JavaToJava([token.left],false) + /*token.data +*/ JavaToJava([token.right],false);
				//code+="L call/lookup R";
				if(includeTerminals){
					code+=";";
				}
				if(includeNewLines){
					code+="\n";
				}
			}
			else if(token.data=="instanceof"){
				console.log('Token == ',token);
				code+=JavaToJava([token.left],false,0) + " "+token.data +" "+
					JavaToJava([token.right],false,0);
				if(includeTerminals){
					code+=";";
				}
				if(includeNewLines){
					code+="\n";
				}
			}
			else{
				console.log('Token == ',token);
				code+=JavaToJava([token.left],false,0) + token.data +
					JavaToJava([token.right],false,0);
				if(includeTerminals){
					code+=";";
				}
				if(includeNewLines){
					code+="\n";
				}
			}
		}
		else if(token.type=='delineator'){
			console.log('delineator');
			if(token.data=="("){
				console.log('bracket',token.sub);
				code+="("+JavaToJava(token.sub,false)+")";
			//	code+="(delin)";
			}
			if(token.data=="["){
				code+="["+JavaToJava(token.sub,false)+"]";
			}
			if(token.data=="{"){
				code+="{"+JavaToJava(token.sub,false)+"}";
			}
			if(token.data=="<"){
				code+="<"+JavaToJava(token.sub,false)+">";
			}
		}
		else if(token.type=='string'){
			console.log("string!");
			code+=token.delineator+token.data+token.delineator;
		}
		else if(token.type == "LiteralSubClass"){
//			code+=token.data+"{"+JavaToJava(token.block,false)+"}";
			code+=token.data+"("+JavaToJava(token.arguments,false)+"){"+JavaToJava(token.block,true,indent+1,true)+"}";
		}
		else if(token.type == "LiteralArray"){
			let args = JavaToJava(token.arguments,false);
			if(args){
				code+=token.data+"["+args+"]{"+JavaToJava(token.block,true,indent+1,true)+"}";
			}
			else{
				code+=token.data+"[]{"+JavaToJava(token.block,true,indent+1,true)+"}";				
			}
		}
		else if(token.type!='single-line-comment' && token.type!='multi-line-comment'){
			if(token.typeLabel){
				code+=token.typeLabel + " ";
			}
			code+=token.data;
			
			if(includeTerminals){
				code+=";";
			}
			if(includeNewLines){
				code+="\n";
			}
		}
	}
	if(includeTerminals){
//		code+=";\n";
	}
	return code;
}
module.exports.JavaToJava = JavaToJava;