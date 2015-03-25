// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var StockMarketYear = require("../domain/stock_market_year.js");
	var Year = require("../values/year.js");
	var ValidDollars = require("../values/valid_dollars.js");
	var GrowthRate = require("../values/growth_rate.js");
	var TaxRate = require("../values/tax_rate.js");

	module.exports = Ember.Component.extend({
		years: function() {
			var projection = this.get("value");
			var rows = [];
		  for (var i = 0; i < (projection.numberOfYears()); i++) {
			  rows.push(projection.getYearOffset(i));
	    }
			return rows;
		}.property("value")
	});

}());