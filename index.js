var program 	= require('commander');
var fs 				= require('fs');
var log 			= require('./src/log');
var File 			= require('./src/file');

let dir = outdir = cmd = '';
const COMMANDS = [
	{
		command: 'make',
		desc: 
		`
			Main function, make destination folder!
		`
	}
];

program
	.arguments('command')
	.option('-d, --dir <dir>', 'Input folder')
	.option('-o, --outdir <outdir>', 'Destination folder')
	.action(function(command) {
  	console.log(
  		'dir: %s outdir: %s command: %s',
    	program.dir, program.outdir, command
  	);

  	if (program.dir && program.outdir && command) {
  		if (!COMMANDS.some(x => x.command === command)) {
  			log.warn('Invalid command!');
  			log.warn('Quit!');
  		} else if (!fs.existsSync(program.dir)) {
  			log.warn('Dir Folder Not Found:', program.dir);
  			log.warn('Quit!');
  		} else if (!fs.existsSync(program.dir)) {
  			log.warn('Outdir Folder Not Found:', program.outdir);
  			log.warn('Quit!');
  		} else {
  			dir 		= program.dir;
  			outdir 	= program.outdir;
  			cmd 		= command;

  			log.info('dir: ' + dir);
  			log.info('outdir: ' + outdir);
  			log.info('cmd: ' + cmd);

  			var file = new File();
  			var p = file.getAllFilesFromDir(dir);
  			p.then((e, filenames) => {
  				console.log(2, e);
  				console.log(1, filenames);
  			});

  		}
  	} else if (typeof(command) !== 'string') {
			log.warn('Command missed!');
			log.warn('Quit!');
  	} else if (!program.dir) {
			log.warn('Dir missed!');
			log.warn('Quit!');
  	} else if (!program.outdir) {
			log.warn('Outdir missed!');
			log.warn('Quit!');
  	}
 })
 .parse(process.argv);
