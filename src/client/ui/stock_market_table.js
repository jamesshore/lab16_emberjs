// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	module.exports = Ember.Component.extend({
		years: function() {
			var projection = this.get("value");
			var rows = [];
		  for (var i = 0; i < (projection.numberOfYears()); i++) {
			  rows.push(projection.getYearOffset(i));
	    }
			return rows;
		}.property("value")
	});

}());