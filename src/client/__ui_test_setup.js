// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/* global setResolver:false */

(function() {
	"use strict";

	var App = require("./application.js");

	before(function() {
		App.setupForTesting();
		setResolver(App.Resolver.create({ namespace: App }));
	});

	beforeEach(function() {
		App.reset();
	});

}());