
//another loop for chekcing breaks (continues ?) and returns ???

//keep track of parent is necessary to type check switch...

//no support for 'this' operand....

//no support for implicitly accessing methods...


//there is an issue here with detecting numbers, need to use same logic as in Java sanity check...
//need to separate that out...

function typeCheck(tokens,vartable=null){
	
	if(vartable==null){
	

		let java_base_parse=require('./java_base_parse.js').java_base_parse;
		vartable = {};
		let code = java_base_parse("./java/System.java");

		typeCheck(code,vartable);

		for(let item of code){
			vartable[item.name] = item;
		}

		console.log("Vartable == ",vartable);

	}
	
	if(Array.isArray(tokens)){
		for(let token of tokens){
			typeCheck(token,vartable);
		}
	}
	else{
		let token = tokens;
		if(token.type=='string'){
			if(token.delineator=="\""){
				token.typeData = "String";
			}
			else{
				token.typeData = "char";
			}
		}
		else if(token.type=='operand'){
			if(token.data=='true' || token.data=='false'){
				token.typeData = "boolean";				
			}
			else if(token.data=='null'){
				token.typeData = "null";
			}
			else if(parseFloat(token.data)==token.data){
				token.typeData = "float";
			}
			else if(parseInt(token.data)==token.data){
				token.typeData = "int";
			}
			else if(token.typeLabel){
				token.typeData = token.typeLabel;
				vartable[token.data] = token.typeData;
			}
			else if(token.data.indexOf('.')>=0){
				
				function makeFunctionSignature(block){
					let sig = "fn "+block.returnType.data+" "+block.name.data;

					if(block.arguments || block.arguments.length>0){
						return sig;
					}

					let argTree = block.arguments[0];
					let argTreePath = "";
					while(argTree.type == "operator" && argTree.data == ","){
						let leftType = argTree.left.typeData;
						let rightType = argTree.right.typeData;
						argTreePath = leftType + "," + rightType;
//						argTreePath = "leftType , rightType";
					}
					if(argTreePath==""){
						argTreePath = argTree.typeData;
						if(!argTreePath){
							argTreePath = argTree.typeLabel.split(' ');
							argTreePath = argTreePath[argTreePath.length-1];
						}
//						argTreePath="ARGTREEPATH";
					}
					sig+=argTreePath;
					return sig;
				}
				
				function lookUp(typeData,path){
					console.log("look Up = ",path," on ",typeData);
					let oldData = typeData;
					if(typeof typeData == "string"){
						typeData = typeData.split(' ');
						typeData = typeData[typeData.length-1];
						typeData = vartable[typeData];
					}
					if(!typeData){
						console.log("Could not resolve",typeData,oldData);
						throw new Error();
					}
					console.log("look Up = ",path," on ",typeData);
					if(typeData.data=="enum"){
						console.log('enum');
						let enumMembers = [];
						if(!typeData.block || typeData.block.length==0){
							throw new Error();
						}
						function walk(node){
							if(node.type=="operator"){
								walk(node.left);
								walk(node.right);
							}
							else{
								enumMembers.push(node);
							}
						}
						walk(typeData.block[0]);
						for(let emem of enumMembers){
							if(emem.data == path){
								return typeData;
							}
						}
						console.log("Unfound typeData");
						throw new Error();
					}
					if(!typeData.block || typeData.block.length==0){
						if((typeof typeData._extends == "string") && (typeData.length>0)){
							return lookUp(vartable[typeData._extends],path);				
						}
						else{
							console.log("Could not resolve",typeData,oldData);
							throw new Error();							
						}
					}
					for(let block of typeData.block){
						if(block.type=="Function"){
							if(block.name.data==path){
								return makeFunctionSignature(block);
							}
						}
						else if(block.type=="operator" && block.data=="="){
							console.log('assignment ',block.left.data , " == ", path);
							if(block.left.data == path){
								console.log('Found',block.left);
								return block.left.typeData;
							}
						}
						else if(block.type == "operand"){
							if(block.data == path){
								return block.typeData;								
							}
						}
					}
					if(typeData._extends){
						let parentType = typeData._extends;
						parentType = vartable[parentType];
						return lookUp(parentType,path);
					}
					console.log("End of look up and not found");
					throw new Error();
				}
				
				//this does not handle inner classes ... maddening...
				
				console.log("Cannot resolve type of path ",token.data);
				let paths = token.data.split('.');
				console.log("paths == ",paths);
				let root = paths[0];
				let typeData = vartable[root];
				console.log("typeData == "+typeData,vartable);
				if(typeof typeData == "string"){ typeData = vartable[typeData]; }
				if(typeData.type=='keyword' && (typeData.data=='class' || typeData.data=='interface' || typeData.data=='enum')){
					for(let i=1;i<paths.length;i++){
						typeData = lookUp(typeData,paths[i]);
					}
					token.typeData = typeData;
					if(!token.typeData){
						console.log("Cannot resolve type of path ",token.data);
						throw new Error();
					}
				}
				else{
					throw new Error();
				}
			}
			else if(vartable[token.data]){
				if(vartable[token.data].type=='keyword' && (vartable[token.data].data=="class" || vartable[token.data].data=="interface" || vartable[token.data].data=="enum")){
					token.typeData = token.data;
				}
				else{
					token.typeData = vartable[token.data];
				}
			}
			else if(token.data=="int" || token.data=="float" || token.data=="double" || token.data=="boolean" || token.data=="String" || token.data=="char"){
				token.typeData = token.data;
			}
			else if(vartable[token.data]){
				if(vartable[token.data].name){
					token.typeData = vartable[token.data].name;					
				}
				else{
					token.typeData = vartable[token.data];
				}
			}
			else{
				console.log("Cannot resolve type of ",token.data," on vartable == ",vartable);
				throw new Error();
			}
		}
		else if(token.type=='operator' || token.type=='operator-unary-right' || token.type=='operator-unary-left'){
			if(token.data!=":"){
				if(token.left){ typeCheck(token.left,vartable); }
			}
			if(token.right){ typeCheck(token.right,vartable); }
			if(token.data=="=" || token.data=="++" || token.data=="--"){
				token.typeData = "void";
			}
			else if(token.data=="==" || token.data=="<" || token.data==">" || token.data=="<=" || token.data==">=" || token.data=="!=" || token.data=="!" || token.data=="&&" || token.data=="||"){
				token.typeData = "boolean";
			}
			else if(token.data=="%"){
				token.typeData = "int";
			}
			else if(token.data=="+=" || token.data=="-=" || token.data=="/=" || token.data=="*=" || token.data=="%=" || token.data=="^="){
				token.typeData = "void";
			}
			else if(token.data=="+" || token.data=="-" || token.data=="*" || token.data=="/" || token.data=="&" || token.data=="|" || token.data=="<<" || token.data==">>" || token.data=="^"){
				if((token.left && token.left.typeData=="float") || token.right.typeData=="float"){
					token.typeData = "float";					
				}
				else{
					token.typeData = "int";
				}
			}
			else if(token.data=="CALL"){
				console.log("Unrecognised token CALL : ",token);
				let fSig = token.left.typeData.split(' ');
				if(fSig.length<3){
					console.log('Malformed Function Signature.');
					throw new Error();				
				}
				if(fSig[0] != 'fn'){
					console.log('Malformed Function Signature.');
					throw new Error();
				}
				let returnType = fSig[1];
				let fName = fSig[2];
				token.typeData = returnType;
			}
			else if(token.data=="CAST"){
				//casting logic check should occur here...
				console.log('casting ',token);
				token.typeData = token.left.typeData;
			}
			else if(token.data==":"){
				if(token.left.typeData=="case"){
					//switch statement needs to be checked...
				}
				else{
					vartable[token.left.data] = "label";
				}
			}
			else if(token.data=="new"){
				//this only generates the signature for a default constructor, needs to be altered to support finding the actual constructors
				
				//does not handle array literals...
				
				typeCheck(token.right,vartable);
				let rightType = vartable[token.right.typeData];
				console.log("Unrecognised token new : ",token,rightType);
				if(!token.block || token.block.length==0){
					if(typeof rightType == "string"){
						token.typeData = "fn "+rightType+" "+rightType;						
					}
					else{
						token.typeData = "fn "+rightType.name+" "+rightType.name;
					}
				}
				else{
					throw new Error();					
				}
			}
			else if(token.data==","){
				token.typeData = token.left.typeData + "," + token.right.typeData;
			}
			else{
				console.log("Unrecognised token : ",token);
				throw new Error();
			}
		}
		else if(token.type=='keyword'){
			if(token.data=="if" || token.data=="else if" || token.data=="switch" || token.data=="catch" || token.data=="while" || token.data=="for" || token.data=="do"){
				if(token.condition){ typeCheck(token.condition,vartable); }
				if(token.block){ typeCheck(token.block,vartable); }
			}
			else if(token.data=="else" || token.data=="try" || token.data=="finally"){
				if(token.block){ typeCheck(token.block,vartable); }
			}
			else if(token.data=="class" || token.data=="interface" || token.data=="enum"){
				vartable[token.name] = token;
				if(token.data!="enum"){
					if(token.block){
				//		console.log("Vartable == ",vartable);
			//			throw new Error();
						vartable["this"] = token.name;
						typeCheck(token.block,vartable);
					}
				}
			}
			else if(token.data=="break" || token.data=='continue'){
				
			}
			else if(token.data=="throw"){
				
			}
			else if(token.data=="return"){
	//			console.log("Unrecognised token : ",token);
//				throw new Error();
			}
			else{
				console.log("Unrecognised token : ",token);
				throw new Error();
			}
		}
		else if(token.type=="LiteralArray"){
			console.log("Literal Array");
			throw new Error();
			if(token.arguments){ typeCheck(token.arguments,vartable); }
			if(token.block){ typeCheck(token.block,vartable); }
//			token.typeData = token.data;

		}
		else if(token.type=="Function"){
			if(token.arguments){ typeCheck(token.arguments,vartable); }
			if(token.block){ typeCheck(token.block,vartable); }
		}
		else if(token.type=='delineator' && token.data=="("){
			if(token.sub){ typeCheck(token.sub,vartable); }
			if(token.sub && token.sub.length>0){
				token.typeData = token.sub[0].typeData;
			}
		}
		else{
			console.log("Unrecognised token : ",token);
			throw new Error();
		}
	}
	
}
module.exports.typeCheck = typeCheck;