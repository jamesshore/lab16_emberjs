// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var UserConfiguration = require("../persistence/user_configuration.js");
	var StockMarketYear = require("../domain/stock_market_year.js");
	var StockMarketProjection = require("../domain/stock_market_projection.js");

	module.exports = Ember.Component.extend({
		init: function() {
			this._super();

			var self = this;
			this.get("configuration").onChange(function() {
				self.notifyPropertyChange("projection");
			});
		},

		configuration: new UserConfiguration(),

		projection: function() {
			return projectionFor(this.get("configuration"));
		}.property("configuration")
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

}());