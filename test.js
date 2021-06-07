let fs = require('fs');

let list = fs.readdirSync('tests/features');

for(let f of list){
	if(f.indexOf('.')>=0){
		const { exec } = require("child_process");
		exec("node java_parser.js tests/features/"+f + " tests/features/output/"+f, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				throw new Error();
				return;
			}
			if (stderr) {
	//			console.log(`stderr: ${stderr}`);
				return;
			}
	//		console.log(`stdout: ${stdout}`);
		});
	}
}
/*
list = fs.readdirSync('tests/programs');

for(let f of list){
	const { exec } = require("child_process");
	exec("node java_parser.js tests/programs/"+f + " tests/programs/output/"+f, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
//			console.log(`stderr: ${stderr}`);
			return;
		}
	//	console.log(`stdout: ${stdout}`);
	});
}*/