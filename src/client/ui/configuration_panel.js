// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	module.exports = Ember.Component.extend({
		_configWatcher: function() {
			var self = this;
			config(this).onChange("configuration_panel", function() {
				self.notifyPropertyChange("value");
			});
		}.observes("value"),

		startingBalance: function(key, newValue, previousValue) {
			if (arguments.length > 1) config(this).setStartingBalance(newValue);

			return config(this).getStartingBalance();
		}.property("value"),

		startingCostBasis: function(key, newValue, previousValue) {
			if (arguments.length > 1) config(this).setStartingCostBasis(newValue);

			return config(this).getStartingCostBasis();
		}.property("value"),

		yearlySpending: function(key, newValue, previousValue) {
			if (arguments.length > 1) config(this).setYearlySpending(newValue);

			return config(this).getYearlySpending();
		}.property("value")


	});

	function config(self) {
		return self.get("value");
	}

}());