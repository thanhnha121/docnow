var fs 				= require('fs');
var log 			= require('./log');

class File {

  constructor() {
  }

  getAllFilesFromDir(dir) {
  	var p = new Promise((rs) => {
	  	fs.readdir(dir, function(err, filenames) {
		    if (err) log.error(err.message);
		    rs({ err: err, filenames: filenames });
		  });
  	});

  	return p;
  }

}


module.exports = File;