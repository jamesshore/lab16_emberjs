// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var UserConfiguration = require("../persistence/user_configuration.js");
	var StockMarketProjection = require("../domain/stock_market_projection.js");
	var StockMarketYear = require("../domain/stock_market_year.js");
	var UserEnteredDollars = require("../values/user_entered_dollars.js");

	var needs = [ "component:configuration-panel", "component:stock-market-table" ];
	describeComponent("example-application", "ExampleApplication", { needs: needs }, function() {

		var component;
		var $me;

		beforeEach(function() {
			component = this.subject();
			$me = this.$();
		});

		it("starts out with default configuration", function() {
			var config = component.get("configuration");

			expect(config.getStartingBalance()).to.eql(UserConfiguration.DEFAULT_STARTING_BALANCE);
			expect(config.getStartingCostBasis()).to.eql(UserConfiguration.DEFAULT_STARTING_COST_BASIS);
			expect(config.getYearlySpending()).to.eql(UserConfiguration.DEFAULT_YEARLY_SPENDING);
		});
		
		it("renders stock market table with projection based on user configuration", function() {
			expect(component.get("projection")).to.eql(projectionFor(new UserConfiguration()));
		});

		it("updates stock market table when user configuration changes", function() {
			var config = component.get("configuration");
			Ember.run(function() {
				config.setStartingBalance(new UserEnteredDollars("new value"));
			});

			expect(component.get("projection")).to.eql(projectionFor(config));
		});

		function projectionFor(config) {
			var firstYear = new StockMarketYear(
				UserConfiguration.STARTING_YEAR,
				config.getStartingBalance(),
				config.getStartingCostBasis(),
				UserConfiguration.INTEREST_RATE,
				UserConfiguration.CAPITAL_GAINS_TAX_RATE
			);
			return new StockMarketProjection(
				firstYear,
				UserConfiguration.ENDING_YEAR,
				config.getYearlySpending()
			);
		}
	});

}());