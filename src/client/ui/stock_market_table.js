// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	module.exports = Ember.Component.extend({
		years: function() {
			var projection = this.get("value");

			var current;
			var rows = this.get("_projection");
			var numYears = projection.numberOfYears();
			console.log(numYears);
			for (var i = 0; i < ( numYears); i++) {
				current = rows.objectAt(i);
				if (!current) {
					current = {};
					rows.insertAt(i, current);
				}
				Ember.set(current, "perfOptimization", projection.getYearOffset(i));
			}
			if (numYears < rows.length) rows.removeAt(numYears - 1, rows.length - numYears);
			return rows;
		}.property("value"),

		_projection: []
	});

}());