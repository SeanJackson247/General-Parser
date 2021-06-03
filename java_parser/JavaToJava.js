function JavaToJava(tokens,includeTerminals=false,indent=0,includeNewLines=false){
	//compile...
//	console.log("COMPILING ",tokens);
	if(tokens==undefined){ return undefined; }//hacky
	if(tokens.length==1 && tokens[0]==undefined){ return undefined; }
	let tabs = '\t'.repeat(indent);
	let code = "";//tabs;
	for(let token of tokens){
		if(includeTerminals && includeNewLines){code+=tabs;}
//		console.log("COMPILING TOKEN ",token);
		if(token.type=="keyword"){
			if(token.data=='class' || token.data=='enum' || token.data=='interface'){
				let header = token.header;
				if(token._abstract){
					code+="abstract ";
				}
				if(token._static){
					code+="static ";
				}
				if(token._final){
					code+="final ";
				}
				if(token.encapsulation){
					code+=token.encapsulation+" ";
				}
				code+=token.data+" " + token.name;
				if(token._extends){
					code+=" extends "+token._extends;
				}
				if(token.block){
					if(token.data=="enum"){
						code+="{\n"+tabs+"\t"+JavaToJava(token.block,false,indent+1,true)+tabs+"}\n";						
					}
					else{
						code+="{\n"+JavaToJava(token.block,true,indent+1,true)+"\n"+tabs+"}\n";
					}
				}
				else{
					code+="{}\n";
				}
			}
			else if(token.data=="do" || token.data=="try" || token.data=="else" || token.data=="finally"){
				code+=token.data;
				if(token.data=="do"){
					if(token.block){
						code+="{\n"+JavaToJava(token.block,true,indent+1,true)+tabs+"}";
					}
					else{
						code+="{}";
					}
					code+="while("+JavaToJava(token.condition,false,indent+1,false)+")";
				}
				else{
					if(token.block){
						code+="{\n"+JavaToJava(token.block,true,indent+1,true)+tabs+"}\n";
					}
					else{
						code+="{}\n";					
					}
				}
			}
			else if(token.data=="for" || token.data=="while" || token.data=="if" || token.data=="else if" || token.data=="catch" || token.data=="switch"){
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
				code+="static{\n"+JavaToJava(token.block,true,indent+1)+tabs+"}";
			}
			else if(token.data=='return'){
				code+="return";
			}
			else if(token.data=='throw'){
				code+="throw";
			}
			else if(token.data=="continue"){
				code+="continue";
			}
			else if(token.data=="break"){
				code+="break";
			}
			else if(token.data=="default"){
				code+="default";
			}
			else{
				console.log("Unrecongised keyword : "+token.data);
				throw new Error();
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
		}
		else if(token.type=='operator-unary-left'){
			code+=JavaToJava([token.left],false,0)+token.data;
		}
		else if(token.type=='operator'){
			console.log('str',JSON.stringify(token,0,2));
			if(token.data=='CALL' || token.data=='LOOK_UP' || token.data=="CAST"){
				code+=JavaToJava([token.left],false) + JavaToJava([token.right],false);
			}
			else if(token.data=="instanceof"){
				console.log('Token == ',token);
				code+=JavaToJava([token.left],false,0) + " "+token.data +" "+
					JavaToJava([token.right],false,0);
			}
			else{
				console.log('Token == ',token);
				if(token.data==":"){
					code+=JavaToJava([token.left],false,indent,false) + token.data +
						JavaToJava([token.right],false,indent,false);
				}
				else{
					code+=JavaToJava([token.left],false,indent,false) + token.data +
						JavaToJava([token.right],false,indent,false);					
				}
			}
		}
		else if(token.type=='delineator'){
			console.log('delineator');
			if(token.data=="("){
				console.log('bracket',token.sub);
				code+="("+JavaToJava(token.sub,false)+")";
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
			code+=token.data+"("+JavaToJava(token.arguments,false)+"){"+JavaToJava(token.block,true,indent+1,true)+"}";
		}
		else if(token.type == "LiteralArray"){
			let args = JavaToJava(token.arguments,false);
			if(args){
				code+=token.data+"["+args+"]{"+JavaToJava(token.block,false,indent+1,false)+"}";
			}
			else{
				code+=token.data+"[]{"+JavaToJava(token.block,false,indent+1,false)+"}";				
			}
		}
		else if(token.type!='single-line-comment' && token.type!='multi-line-comment'){
			if(token.typeLabel){
				code+=token.typeLabel + " ";
			}
			code+=token.data;
		}
//		if(includeTerminals && includeNewLines){code+=";\n";}
		if(!(token.type == "operator" && token.data==":" && (token.right.type=="keyword"))){
			if(includeTerminals && token.type!="Function" && !(token.type=="keyword" && (token.data=="switch" || token.data=="if" || token.data=="else if" || token.data=="else" || token.data=="for" || token.data=="class" || token.data=="interface"  || token.data=="enum"  || token.data=="return"))){code+=";";}
		}
		if(includeNewLines && !(token.type=="keyword" && token.data=="return")){code+="\n";}
	}
	return code;
}
module.exports.JavaToJava = JavaToJava;