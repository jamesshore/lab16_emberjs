// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	module.exports = Ember.Component.extend({
		years: function() {
			var thisRow;
			var projection = this.get("value");
			var numYears = projection.numberOfYears();
			var rows = this.get("_yearsArray");
			for (var i = 0; i < numYears; i++) {
				thisRow = rows.objectAt(i);
				if (!thisRow) {
					thisRow = {};
					rows.insertAt(i, thisRow);
				}
				Ember.set(thisRow, "perfOptimization", projection.getYearOffset(i));
			}
			if (numYears < rows.length) rows.removeAt(numYears, rows.length - numYears);
			return rows;
		}.property("value"),

		_yearsArray: []
	});

}());