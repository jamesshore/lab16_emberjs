// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	describeComponent("stock-market-cell", "StockMarketCell", {}, function() {

		var component;
		var $;

		beforeEach(function() {
			component = this.subject();
			$ = this.$();
		});

		it("renders a <td> tag", function() {
			expect(component.tagName).to.equal("td");
		});

		it("renders the 'value' parameter", function() {
			Ember.run(function() {
				component.set("value", "$10,000");
			});
			expect($.html()).to.equal("$10,000");
		});

	});

}());