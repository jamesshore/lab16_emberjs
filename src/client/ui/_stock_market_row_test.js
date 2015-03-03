// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

console.log("SMR TEST");

(function() {
	"use strict";

	$("body").html('<div id="ember-testing"></div>');
	var App = require("../application.js");
	App.rootElement = '#ember-testing';
	App.setupForTesting();
	App.injectTestHelpers();

	beforeEach(function() {
		App.reset();
	});

	describe("Nothing", function() {

		it("runs tests", function() {
			expect("foo").to.equal("foo");
		});

	});

}());