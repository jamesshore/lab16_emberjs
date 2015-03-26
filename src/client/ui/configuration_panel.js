// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	module.exports = Ember.Component.extend({
		startingBalance: function(key, newValue, previousValue) {
			var value = this.get("value");

			if (arguments.length > 1) value.setStartingBalance(newValue);
			else return value.getStartingBalance();
		}.property("value"),

		startingCostBasis: function(key, newValue, previousValue) {
			var value = this.get("value");

			if (arguments.length > 1) value.setStartingCostBasis(newValue);
			else return value.getStartingCostBasis();
		}.property("value"),

		yearlySpending: function(key, newValue, previousValue) {
			var value = this.get("value");

			if (arguments.length > 1) value.setYearlySpending(newValue);
			else return value.getYearlySpending();
		}.property("value")
	});

}());