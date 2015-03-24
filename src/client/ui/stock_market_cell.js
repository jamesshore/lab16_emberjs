// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	module.exports = Ember.Component.extend({
	  tagName: "td",
		classNameBindings: "negative",

		negative: function() {
			return this.get("_renderedValue").isNegative();
		}.property("_renderedValue"),

		_renderedValue: function() {
			var renderTarget = new RenderTarget(this);
			this.get("value").renderTo(renderTarget);
			return renderTarget;
		}.property("value")
	});

	function RenderTarget() {}

	RenderTarget.prototype.render = function(values) {
		this._values = values;
	};

	RenderTarget.prototype.isNegative = function() {
		return this._values.negative;
	};

}());