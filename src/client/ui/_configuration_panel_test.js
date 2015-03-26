// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var UserConfiguration = require("../persistence/user_configuration.js");
	var UserEnteredDollars = require("../values/user_entered_dollars.js");

	describeComponent("configuration-panel", "ConfigurationPanel", { needs: [ "component:configuration-field" ]}, function() {

		var config;
		var component;
		var $me;

		beforeEach(function() {
			config = new UserConfiguration();
			component = this.subject();
			Ember.run(function() {
				component.set("value", config);
			});
			$me = this.$();
		});

		it("initializes configuration fields from user configuration", function() {
			expect(component.get("startingBalance")).to.eql(config.getStartingBalance());
			expect(component.get("startingCostBasis")).to.eql(config.getStartingCostBasis());
			expect(component.get("yearlySpending")).to.eql(config.getYearlySpending());
		});

		it("updates user configuration when configuration fields change", function() {
			Ember.run(function() {
				component.set("startingBalance", new UserEnteredDollars("new balance"));
			});
			expect(config.getStartingBalance()).to.eql(new UserEnteredDollars("new balance"));

			Ember.run(function() {
				component.set("startingCostBasis", new UserEnteredDollars("new cost basis"));
			});
			expect(config.getStartingCostBasis()).to.eql(new UserEnteredDollars("new cost basis"));

			Ember.run(function() {
				component.set("yearlySpending", new UserEnteredDollars("new spending"));
			});
			expect(config.getYearlySpending()).to.eql(new UserEnteredDollars("new spending"));
		});
	});

}());