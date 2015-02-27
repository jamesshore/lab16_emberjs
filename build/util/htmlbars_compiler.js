/* Copyright (c) 2015 Titanium I.T. LLC - See LICENSE.txt for license */
"use strict";

var fs = require("fs");
var path = require("path");
var jake = require("jake");
var htmlBarsCompiler = require("../../src/vendor/ember-template-compiler-1.10.0.js");

exports.compile = function(config, success, failure) {
	var output = compileTemplate(config.application, "application");
	output += compileComponents(config.components);
	fs.writeFileSync(config.outfile, output);

	process.stdout.write("\n");
	return success();
};

function compileComponents(components) {
	var result = "";

	var templatePaths = new jake.FileList(components);
	templatePaths.forEach(function(templatePath) {
		var templateName = "components/" + path.basename(templatePath, ".hbs").replace(/_/g, "-");
		result += compileTemplate(templatePath, templateName);
	});
	return result;
}

function compileTemplate(templatePath, templateName) {
	process.stdout.write(".");

	var template = fs.readFileSync(templatePath, { encoding: "utf8" });
	return "exports['" + templateName + "'] = Ember.HTMLBars.template(" +
		htmlBarsCompiler.precompile(template, false) +
	");";
}
