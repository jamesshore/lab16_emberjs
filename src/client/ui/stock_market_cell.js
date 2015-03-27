// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	module.exports = Ember.Component.extend({
	  tagName: "td",
		attributeBindings: "title",
		classNameBindings: "negative",

		text: function() {
			return this.get("_renderedValue").text();
		}.property("_renderedValue").readOnly(),

		title: function() {
			return this.get("_renderedValue").tooltip();
		}.property("_renderedValue").readOnly(),

		negative: function() {
			return this.get("_renderedValue").isNegative();
		}.property("_renderedValue").readOnly(),

		invalid: function() {
			return this.get("_renderedValue").isInvalid();
		}.property("_renderedValue").readOnly(),

		_renderedValue: function() {
			var renderTarget = new RenderTarget();
			this.get("value").renderTo(renderTarget);
			return renderTarget;
		}.property("value").readOnly()
	});

	function RenderTarget() {}

	RenderTarget.prototype.render = function(values) {
		this._values = values;
	};

	RenderTarget.prototype.text = function() {
		return this._values.text;
	};

	RenderTarget.prototype.isNegative = function() {
		return this._values.negative;
	};

	RenderTarget.prototype.isInvalid = function() {
		return this._values.invalid;
	};

	RenderTarget.prototype.tooltip = function() {
		return this._values.tooltip;
	};

}());