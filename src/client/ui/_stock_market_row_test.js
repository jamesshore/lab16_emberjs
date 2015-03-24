// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var StockMarketYear = require("../domain/stock_market_year.js");
	var Year = require("../values/year.js");
	var ValidDollars = require("../values/valid_dollars.js");
	var GrowthRate = require("../values/growth_rate.js");
	var TaxRate = require("../values/tax_rate.js");

	describeComponent("stock-market-row", "StockMarketRow", { needs: "component:stock-market-cell" }, function() {

		var year = new StockMarketYear(
			new Year(1984),
			new ValidDollars(986),
			new ValidDollars(20),
			new GrowthRate(10),
			new TaxRate(30)
		);

		var component;
		var $;

		beforeEach(function() {
			component = this.subject();
			Ember.run(function() {
				component.set("value", year);
			});
			$ = this.$();
		});

		it("renders a <tr> tag", function() {
			expect(component.tagName).to.equal("tr");
		});

		it("breaks a stock market year into individual cells", function() {
			expect(component.get("year")).to.eql(year.year());
			expect(component.get("startingBalance")).to.eql(year.startingBalance());
			expect(component.get("costBasis")).to.eql(year.startingCostBasis());
			expect(component.get("sellOrders")).to.eql(year.totalSellOrders().flipSign());
			expect(component.get("taxes")).to.eql(year.capitalGainsTaxIncurred().flipSign());
			expect(component.get("growth")).to.eql(year.growth());
			expect(component.get("endingBalance")).to.eql(year.endingBalance());
		});

		it("updates the cells when the year changes", function() {

		});

	});

}());