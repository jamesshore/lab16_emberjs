// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var ValidDollars = require("../values/valid_dollars.js");
	var InvalidDollars = require("../values/invalid_dollars.js");

	describeComponent("stock-market-cell", "StockMarketCell", {}, function() {

		var component;
		var $me;

		beforeEach(function() {
			component = this.subject();
			Ember.run(function() {
				component.set("value", new ValidDollars(100));
			});
			$me = this.$();
		});

		it("renders a <td> tag", function() {
			expect(component.tagName).to.equal("td");
		});

		it("renders positive values", function() {
			Ember.run(function() {
				component.set("value", new ValidDollars(10000));
			});
			expect($me.html().trim()).to.equal("$10,000");
			expect($me.hasClass("negative")).to.be(false);
			expect($me.attr("title")).to.be(undefined);
		});

		it("renders negative values with a 'negative' CSS class", function() {
			Ember.run(function() {
				component.set("value", new ValidDollars(-1234));
			});

			expect($me.html().trim()).to.equal("($1,234)");
			expect($me.hasClass("negative")).to.be(true);
			expect($me.attr("title")).to.be(undefined);
		});

		it("renders invalid values with a 'invalid' icon and tooltip", function() {
			Ember.run(function() {
				component.set("value", new InvalidDollars());
			});

			expect($me.html().trim()).to.equal('<img src="/invalid_dollars.png">');
			expect($me.attr("title")).to.equal("Invalid dollar amount");
		});

	});

}());