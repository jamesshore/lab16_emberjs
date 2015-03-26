// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var UserConfiguration = require("../persistence/user_configuration.js");

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

	});

}());