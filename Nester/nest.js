function nest(tokens,config){
	function isOpener(data){
		let delins = config.delineators;
		for(let pair of delins){
			if(pair[0] == data){
				return true;
			}
		}
		return false;
	}
	function getEnder(data){
		let delins = config.delineators;
		for(let pair of delins){
			if(pair[0] == data){
				return pair[1];
			}
		}
		throw new Error();
		return '!';		
	}
	let nested = [];
	for(let i=0;i<tokens.length;i++){
		let token = tokens[i];
		if(token.type=='delineator' && isOpener(token.data)){
			let opener = token.data;
			let ender = getEnder(token.data);
			nested.push(token);
			let depth = 1;
			i++;
			let sub = [];
			while(i<tokens.length && depth>0){
				if(tokens[i].type=='delineator' && tokens[i].data==ender){
					depth--;
				}
				else if(tokens[i].type=='delineator' && tokens[i].data==opener){
					depth++;
				}
				if(!(tokens[i].type=='delineator' && tokens[i].data==ender)){sub.push(tokens[i]);}
				i++;
			}
			i--;
			nested[nested.length-1].sub = nest(sub,config);
		}
		else{
			nested.push(token);
		}
	}
	return nested;
}
module.exports = nest;
