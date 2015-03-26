// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var UserConfiguration = require("../persistence/user_configuration.js");
	var StockMarketYear = require("../domain/stock_market_year.js");
	var StockMarketProjection = require("../domain/stock_market_projection.js");
	var Year = require("../values/year.js");
	var ValidDollars = require("../values/valid_dollars.js");
	var GrowthRate = require("../values/growth_rate.js");
	var TaxRate = require("../values/tax_rate.js");

	var firstYear = new StockMarketYear(
		new Year(2010),
		new ValidDollars(10000),
		new ValidDollars(3000),
		new GrowthRate(10),
		new TaxRate(25)
	);

	module.exports = Ember.Component.extend({
		configuration: new UserConfiguration(),
		projection: new StockMarketProjection(firstYear, new Year(2050), new ValidDollars(36))
	});

}());