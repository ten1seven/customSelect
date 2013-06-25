/*! jquery.customSelect.js v 0.10 | Author: Jeremy Fields [jeremy.fields@viget.com], 2013 | License: MIT */

(function($) {

	$.customSelect = function(el, options) {

		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// Add a reverse reference to the DOM object
		base.$el.data("customSelect", base);

		base.init = function() {
			base.options = $.extend({},$.customSelect.defaultOptions, options);
			base.setup();
		};

		// first time input setup
		base.setup = function() {
			base.$el.css("opacity", 0).wrap("<span class='" + base.options.wrapperClass + "'></span>");
			base.$wrapper = base.$el.closest("." + base.options.wrapperClass);

			// add text wrapper
			$(base.options.text + base.options.arrow).appendTo(base.$wrapper);

			// do initial pass to set state of select
			base.change();

			// bind events
			base.bind();
		};

		// updates the select's class and text value
		base.change = function() {
			var $selected = base.$el.find("option:selected");
			var text = $selected.text();
			var val = $selected.val();

			// otherwise check to see if it's required and add a *
			if (val === "") {
				if (base.$el.data("validate")) {
					text = text + " " + base.options.required;
				}

				base.$wrapper.removeClass(base.options.filledClass);

			// if it's a legit value
			} else {
				base.$wrapper.addClass(base.options.filledClass);
			}

			// update the text
			base.$wrapper.find(".select-wrapper-text").html(text);
		};

		// binds the focus, blur, change and keyup events
		base.bind = function() {
			base.$el.on("focus.customSelect", function() {
				base.$wrapper.addClass(base.options.focusClass);

			}).on("blur.customSelect",base.$select, function() {
				base.$wrapper.removeClass(base.options.focusClass);

			}).on("change.customSelect keyup.customSelect",base.$select, function() {
				base.change();
			});
		};

		// Run initializer
		base.init();
	};

	$.customSelect.defaultOptions = {
		wrapperClass: "select-wrapper",
		arrow: "<span class='select-wrapper-arrow'></span>",
		text: "<span class='select-wrapper-text'></span>",
		focusClass: "select-focus",
		filledClass: "select-wrapper-filled",
		required: "<em class='input-required'>*</em>"
	};

	$.fn.customSelect = function(options) {
		return this.each(function() {
			(new $.customSelect(this, options));
		});
	};

})(jQuery);