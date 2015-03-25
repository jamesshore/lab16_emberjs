// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	module.exports = Ember.Component.extend({
		text: function() {
			return this.get("_renderedValue").text();
		}.property("_renderedValue"),

		invalid: function() {
			return this.get("_renderedValue").isInvalid();
		}.property("_renderedValue"),

		tooltip: function() {
			return this.get("_renderedValue").tooltip();
		}.property("_renderedValue"),

		_renderedValue: function() {
			var value = this.get("value");
			var renderTarget = new RenderTarget(value);
			value.renderTo(renderTarget);
			return renderTarget;
		}.property("value")
	});

	function RenderTarget(userEnteredValue) {
		this._userEnteredValue = userEnteredValue;
	}

	RenderTarget.prototype.render = function(values) {
		this._values = values;
	};

	RenderTarget.prototype.text = function() {
		return this._userEnteredValue.getUserText();
	};

	RenderTarget.prototype.isInvalid = function() {
		return this._values.invalid;
	};

	RenderTarget.prototype.tooltip = function() {
		return this._values.tooltip;
	};

}());