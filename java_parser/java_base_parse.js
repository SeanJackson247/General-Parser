let fs = require('fs');

let java_parse = require('C:/node/lang/java_parse.js').java_parse;

let nest = require('C:/node/lang/nest.js').nest;

let ConvertToTree = require('C:/node/lang/ConvertToTree.js').ConvertToTree;

let associateComments = require('C:/node/lang/associateComments.js').associateComments;

let handleInclusions = require('C:/node/lang/handleInclusions.js').handleInclusions;

let javaSanityCheck = require('C:/node/lang/javaSanityCheck.js').javaSanityCheck;

let javaContextDependentOperatorLabellingAndMerging = require('C:/node/lang/javaContextDependentOperatorLabellingAndMerging.js').javaContextDependentOperatorLabellingAndMerging;

let javaGatherByStatementsAndKeywords=require('C:/node/lang/javaGatherByStatementsAndKeywords.js').javaGatherByStatementsAndKeywords;

function java_base_parse(fileName,requester=null){
	let tokens = java_parse(fileName);
	console.log("First Parse:",JSON.stringify(tokens,0,2));

	//now the importation of external files into one file
	tokens = handleInclusions(tokens);

	tokens = associateComments(tokens);

	//first label all < and > operators in class and interface headers...
	//note complex types which use these operators
	tokens=javaContextDependentOperatorLabellingAndMerging(tokens);

	//a sanity check that all tokens are valid... note that this is not a type check...
	javaSanityCheck(tokens);

	console.log("Operator Labelled:",JSON.stringify(tokens,0,2));

	config = "java_nest.json";

	config = fs.readFileSync(config,'utf-8');

	config = JSON.parse(config);

	tokens = nest(tokens,config);
	console.log("Nested:",JSON.stringify(tokens,0,2));

	//we must now gather by statements and keywords
	tokens=javaGatherByStatementsAndKeywords(tokens);
	console.log("Gathered By Statements And Keywords:",JSON.stringify(tokens,0,2));

	//now a sanity check for syntactic limitations, like nested classes and so on...
	//there's nothing i really care to enforce here at this time...

	//final conversion to reverse polish notation and then tree, and association of types...
	tokens=ConvertToTree(tokens);

	console.log("Converted to Tree:",JSON.stringify(tokens,0,2));

	console.log("Handled Inclusions:",JSON.stringify(tokens,0,2));

	return tokens;
}
module.exports.java_base_parse = java_base_parse;