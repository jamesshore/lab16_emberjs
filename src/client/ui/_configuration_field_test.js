// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var UserEnteredDollars = require("../values/user_entered_dollars.js");

	describeComponent("configuration-field", "ConfigurationField", {}, function() {

		var component;
		var $me;

		beforeEach(function() {
			component = this.subject();
			Ember.run(function() {
				component.set("value", new UserEnteredDollars(""));
			});
			$me = this.$();
		});

		it("renders legal values", function() {
			Ember.run(function() {
				component.set("value", new UserEnteredDollars("1234"));
			});
			var inputField = $me.find("input");
			expect(inputField.val()).to.equal("1234");
		});

	});

}());