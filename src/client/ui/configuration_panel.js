// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var UserEnteredDollars = require("../values/user_entered_dollars.js");

	module.exports = Ember.Component.extend({
		startingBalance: function() {
			return this.get("value").getStartingBalance();
		}.property("value"),

		startingCostBasis: function() {
			return this.get("value").getStartingCostBasis();
		}.property("value"),

		yearlySpending: function() {
			return this.get("value").getYearlySpending();
		}.property("value")
	});

}());