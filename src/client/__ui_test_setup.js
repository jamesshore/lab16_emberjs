// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/* global setResolver:false */

(function() {
	"use strict";

	var App = require("./application.js");

	Ember.Test.MochaAdapter = Ember.Test.Adapter.extend({
		asyncStart: function() {},
		asyncEnd: function() {},
		exception: function(err) { throw err; }
	});
	Ember.Test.adapter = Ember.Test.MochaAdapter.create();

	before(function() {
		App.setupForTesting();
		App.injectTestHelpers();

		setResolver(App.Resolver.create({ namespace: App }));
	});

	beforeEach(function() {
		App.reset();
	});

}());