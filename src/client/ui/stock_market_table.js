// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var StockMarketYear = require("../domain/stock_market_year.js");
	var Year = require("../values/year.js");
	var ValidDollars = require("../values/valid_dollars.js");
	var GrowthRate = require("../values/growth_rate.js");
	var TaxRate = require("../values/tax_rate.js");

	var DEFAULT_YEAR = new StockMarketYear(
		new Year(2010),
		new ValidDollars(10000),
		new ValidDollars(3000),
		new GrowthRate(10),
		new TaxRate(25)
	);
	DEFAULT_YEAR.sell(new ValidDollars(36));

	module.exports = Ember.Component.extend({
		year: DEFAULT_YEAR
	});

}());