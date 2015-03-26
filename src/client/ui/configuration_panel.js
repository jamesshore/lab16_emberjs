// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	module.exports = Ember.Component.extend({
		startingBalance: function(key, newValue, previousValue) {
			if (arguments.length > 1) config(this).setStartingBalance(newValue);
			else return config(this).getStartingBalance();
		}.property("value"),

		startingCostBasis: function(key, newValue, previousValue) {
			if (arguments.length > 1) config(this).setStartingCostBasis(newValue);
			else return config(this).getStartingCostBasis();
		}.property("value"),

		yearlySpending: function(key, newValue, previousValue) {
			if (arguments.length > 1) config(this).setYearlySpending(newValue);
			else return config(this).getYearlySpending();
		}.property("value")
	});

	function config(self) {
		return self.get("value");
	}

}());