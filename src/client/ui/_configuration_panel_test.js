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
			var newBalance = new UserEnteredDollars("new balance");
			var newCostBasis = new UserEnteredDollars("new cost basis");
			var newSpending = new UserEnteredDollars("new spending");

			Ember.run(function() {
				component.set("startingBalance", newBalance);
			});
			expect(config.getStartingBalance()).to.eql(newBalance);
			expect(component.get("startingBalance")).to.eql(newBalance);

			Ember.run(function() {
				component.set("startingCostBasis", newCostBasis);
			});
			expect(config.getStartingCostBasis()).to.eql(newCostBasis);
			expect(component.get("startingCostBasis")).to.eql(newCostBasis);

			Ember.run(function() {
				component.set("yearlySpending", newSpending);
			});
			expect(config.getYearlySpending()).to.eql(newSpending);
			expect(component.get("yearlySpending")).to.eql(newSpending);
		});
	});

}());