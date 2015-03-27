// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var Year = require("../values/year.js");
	var ValidDollars = require("../values/valid_dollars.js");
	var InvalidDollars = require("../values/invalid_dollars.js");

	module.exports = Ember.Component.extend({
	  tagName: "tr",

		year: function() {
			return this.get("value").year();
		}.property("value").readOnly(),

		startingBalance: function() {
			return this.get("value").startingBalance();
		}.property("value").readOnly(),

		costBasis: function() {
			return this.get("value").startingCostBasis();
		}.property("value").readOnly(),

		sellOrders: function() {
			return this.get("value").totalSellOrders().flipSign();
		}.property("value").readOnly(),

		taxes: function() {
			return this.get("value").capitalGainsTaxIncurred().flipSign();
		}.property("value").readOnly(),

		growth: function() {
			return this.get("value").growth();
		}.property("value").readOnly(),

		endingBalance: function() {
			return this.get("value").endingBalance();
		}.property("value").readOnly()

	});

}());