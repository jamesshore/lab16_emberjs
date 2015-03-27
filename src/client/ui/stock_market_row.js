// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var Year = require("../values/year.js");
	var ValidDollars = require("../values/valid_dollars.js");
	var InvalidDollars = require("../values/invalid_dollars.js");

	module.exports = Ember.Component.extend({
	  tagName: "tr",

		year: function() {
			return this.get("_value").year();
		}.property("_value"),

		startingBalance: function() {
			return this.get("_value").startingBalance();
		}.property("_value"),

		costBasis: function() {
			return this.get("_value").startingCostBasis();
		}.property("_value"),

		sellOrders: function() {
			return this.get("_value").totalSellOrders().flipSign();
		}.property("_value"),

		taxes: function() {
			return this.get("_value").capitalGainsTaxIncurred().flipSign();
		}.property("_value"),

		growth: function() {
			return this.get("_value").growth();
		}.property("_value"),

		endingBalance: function() {
			return this.get("_value").endingBalance();
		}.property("_value"),

		value: "",
		_value: Ember.computed.oneWay("value")

	});

}());