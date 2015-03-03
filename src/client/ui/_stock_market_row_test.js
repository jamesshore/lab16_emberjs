// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/* global describeComponent:false, setResolver:false */
(function() {
	"use strict";

	var App = require("../application.js");
	App.setupForTesting();
	setResolver(App.Resolver.create({ namespace: App }));

	beforeEach(function() {
		App.reset();
	});

	describeComponent("stock-market-row", "StockMarketRow", {}, function() {

		it("runs tests", function() {
			var component = this.subject();
			expect(component.tagName).to.equal("tr");
			expect(this.$().html()).to.equal(
				"<td>2010</td>\n" +
				"<td>$10,000</td>\n" +
				"<td>$7,000</td>\n" +
				'<td class="negative">($695)</td>\n' +
				'<td class="negative">($232)</td>\n' +
				"<td>$907</td>\n" +
				"<td>$9,981</td>\n"
			);
		});

	});
}());