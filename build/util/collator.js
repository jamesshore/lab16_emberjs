/* Copyright (c) 2014 Titanium I.T. LLC - See LICENSE.txt for license */
"use strict";

var shell = require("shelljs");
var path = require("path");

exports.collate = function(config, success, failure) {
	var dest = config.dest;
	config.src.forEach(function(src) {
		collateOneSrc(src.root, src.files, dest);
	});
	process.stdout.write("\n");

	return success();
};

function collateOneSrc(srcDir, srcFiles, dest) {
	var files = new jake.FileList(srcDir + "/" + srcFiles);
	files.forEach(function(file) {
		process.stdout.write(".");
		var relativeFilename = "/" + file.replace(srcDir + "/", "");
		shell.mkdir("-p", path.dirname(dest + relativeFilename));
		shell.cp(srcDir + relativeFilename, dest + relativeFilename);
	});
}
