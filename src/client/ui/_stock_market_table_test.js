// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var StockMarketProjection = require("../domain/stock_market_projection.js");
	var StockMarketYear = require("../domain/stock_market_year.js");

	var Year = require("../values/year.js");
	var ValidDollars = require("../values/valid_dollars.js");
	var GrowthRate = require("../values/growth_rate.js");
	var TaxRate = require("../values/tax_rate.js");

	var STARTING_YEAR = new Year(2010);
	var STARTING_BALANCE = new ValidDollars(10000);
	var STARTING_COST_BASIS = new ValidDollars(3000);
	var INTEREST_RATE = new GrowthRate(10);
	var CAPITAL_GAINS_TAX_RATE = new TaxRate(25);

	var ENDING_YEAR = new Year(2050);
	var YEARLY_SPENDING = new ValidDollars(36);

	describeComponent("stock-market-table", "StockMarketTable", { needs: "component:stock-market-row" }, function() {

		var firstYear = new StockMarketYear(
			STARTING_YEAR,
			STARTING_BALANCE,
			STARTING_COST_BASIS,
			INTEREST_RATE,
			CAPITAL_GAINS_TAX_RATE
		);

		var component;
		var $;

		beforeEach(function() {
			component = this.subject();
			Ember.run(function() {
				component.set("value", new StockMarketProjection(firstYear, ENDING_YEAR, YEARLY_SPENDING));
			});
			$ = this.$();
		});

		it("converts first year", function() {
			expect(component.get("years")[0]).to.eql(firstYear);
		});

		it("renders all years", function() {
			expect($.find("tbody tr").length).to.equal(41);
		});

		it("converts each year separately", function() {
			expect(component.get("years")[40].year()).to.eql(new Year(2050));
		});

	});

}());