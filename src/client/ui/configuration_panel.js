// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var UserEnteredDollars = require("../values/user_entered_dollars.js");

	module.exports = Ember.Component.extend({
		startingBalance: new UserEnteredDollars("1"),
		startingCostBasis: new UserEnteredDollars("x"),
		yearlySpending: new UserEnteredDollars("3")
	});

}());