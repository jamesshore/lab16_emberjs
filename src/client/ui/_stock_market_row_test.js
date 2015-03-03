// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	describeComponent("stock-market-row", "StockMarketRow", {}, function() {

		var component;
		var $;

		beforeEach(function() {
			component = this.subject();
			$ = this.$();
		});

		it("renders", function() {
			expect(component.tagName).to.equal("tr");
			expect($.html()).to.equal(
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