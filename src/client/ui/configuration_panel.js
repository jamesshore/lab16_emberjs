// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	module.exports = Ember.Component.extend({
		_configWatcher: function() {
			var self = this;
			var userConfig = config(this);
			if (userConfig) userConfig.onChange("configuration_panel", function() {
				self.notifyPropertyChange("_value");
			});
		}.observes("value").on("init"),

		startingBalance: function(key, newValue, previousValue) {
			if (arguments.length > 1) config(this).setStartingBalance(newValue);

			return config(this).getStartingBalance();
		}.property("_value"),

		startingCostBasis: function(key, newValue, previousValue) {
			if (arguments.length > 1) config(this).setStartingCostBasis(newValue);

			return config(this).getStartingCostBasis();
		}.property("_value"),

		yearlySpending: function(key, newValue, previousValue) {
			if (arguments.length > 1) config(this).setYearlySpending(newValue);

			return config(this).getYearlySpending();
		}.property("_value")

	});

	function config(self) {
		return self.get("value");
	}

}());