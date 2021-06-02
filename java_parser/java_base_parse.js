let fs = require('fs');

let java_parse = require('./java_parse.js').java_parse;

let nest = require('../Nester/nest.js').nest;

let ConvertToTree = require('./ConvertToTree.js').ConvertToTree;

let associateComments = require('./associateComments.js').associateComments;

let handleInclusions = require('./handleInclusions.js').handleInclusions;

let javaSanityCheck = require('./javaSanityCheck.js').javaSanityCheck;

let javaContextDependentOperatorLabellingAndMerging = require('./javaContextDependentOperatorLabellingAndMerging.js').javaContextDependentOperatorLabellingAndMerging;

let javaGatherByStatementsAndKeywords=require('./javaGatherByStatementsAndKeywords.js').javaGatherByStatementsAndKeywords;

let HigherOrderLogicCheck = require('./HigherOrderLogicCheck.js').HigherOrderLogicCheck;

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

	config = "../Nester/java_nest.json";

	config = fs.readFileSync(config,'utf-8');

	config = JSON.parse(config);

	tokens = nest(tokens,config);
	console.log("Nested:",JSON.stringify(tokens,0,2));

	//we must now gather by statements and keywords
	tokens=javaGatherByStatementsAndKeywords(tokens);
	console.log("Gathered By Statements And Keywords:",JSON.stringify(tokens,0,2));

	//final conversion to reverse polish notation and then tree, and association of types...
	tokens=ConvertToTree(tokens);

	//now a sanity check for semanticlimitations, like nested classes and so on...
	HigherOrderLogicCheck(tokens);

	console.log("Converted to Tree:",JSON.stringify(tokens,0,2));

	console.log("Handled Inclusions:",JSON.stringify(tokens,0,2));

	return tokens;
}
module.exports.java_base_parse = java_base_parse;