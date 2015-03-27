// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	module.exports = Ember.Component.extend({
		years: function() {
			var projection = this.get("value");

			var current;
			var rows = this.get("_projection");
			for (var i = 0; i < (projection.numberOfYears()); i++) {
				current = rows.objectAt(i);
				if (!current) {
					current = {};
					rows.insertAt(i, current);
				}
				Ember.set(current, "yearObject", projection.getYearOffset(i));
			}
			return rows;
		}.property("value"),

		_projection: []
	});

}());