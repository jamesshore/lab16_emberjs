// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

// Lists commonly-used directories. They're all relative to the project root.

(function() {
	"use strict";

	module.exports = {
		generatedDir: "generated",

		distDir: "generated/dist",
		clientDistDir: "generated/dist/client",

		compiledTemplatesDir: "generated/hbs",
		compiledTemplatesModule: "generated/hbs/templates.js",

		collatedClientJsDir: "generated/client",

		browserifyEntryPoint: "generated/client/application.js",
		clientDistBundle: "generated/dist/client/bundle.js",

		clientSrcDir: "src/client",
		applicationTemplateSrc: "src/client/application.hbs",
		componentTemplatesSrcDir: "src/client/ui",
		vendorSrcDir: "src/vendor"
	};

}());