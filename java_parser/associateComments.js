function associateComments(tokens){
	let ntokens = [];
	let commmentBuffer=[];
	for(let token of tokens){
		if(token.type=="single-line-comment" || token.type=="multi-line-comment"){
			commmentBuffer.push(token);
		}
		else{
			if(commmentBuffer.length>0){
				token.comments = commmentBuffer;
				commmentBuffer=[];
			}
			ntokens.push(token);
		}
	}
	return ntokens;
}
module.exports.associateComments = associateComments;