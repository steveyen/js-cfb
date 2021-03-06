///<reference path='node.d.ts'/>
///<reference path='cfb.d.ts'/>

/* vim: set ts=2: */

var CFB = <CFB>require('../cfb');
var fs = require('fs'), program = require('commander');
program
	.version('0.8.1')
	.usage('[options] <file>')
	.option('-q, --quiet', 'print but do not extract')
	.parse(process.argv);

if(program.args.length === 0 || !fs.existsSync(program.args[0])) {
	console.error("Usage: " + process.argv[1] + " [-q] <cfb_file>");
	process.exit(1);
}

var cfb = CFB.read(program.args[0], {type:'file'});
if(program.quiet) {
	console.log("Full Paths:")
	console.log(cfb.FullPaths.map(function(x) { return "  " + x; }).join("\n"));
	console.log("Full Path Directory:")
	console.log(cfb.FullPathDir);
	return;
}
for(var i=0; i != cfb.FullPaths.length; ++i) {
	if(cfb.FullPaths[i].slice(-1) === "/") {
		console.error("mkdir " + cfb.FullPaths[i]);
		fs.mkdirSync(cfb.FullPaths[i]);
	} else {
		console.error("writing " + cfb.FullPaths[i]);
		fs.writeFileSync(cfb.FullPaths[i], cfb.FileIndex[i].content);
	}
}
