//	
//	jQuery Custom Form Elements
//	Aleksei Aniskin
//	alexniksin@gmail.com
//
//	$('ELEMENT/S TO CUSTOMIZE').CFElements();
//		Will replace all elements specified by the selector.
//		If you dynamicly add new elements call CFElements again. Existing elements will be updated, new ones created.
//	
//	To update element/s trigger 'change' on original element/s.
//	'change' event is dispached on original element, if it was changed.
//	

; (function ($, window, document, undefined) {
	var methods = {
		init: function (elems, options) {
			var self = this;

			self.options = $.extend({}, $.fn.CFElements.options, options);
			self.selector = elems.selector;
			self.elems = elems;

			// replace or update form elements
			self.elems.each(function () {
				var elm = $(this),
					c_elm = elm.next();

				if (elm.prop('nodeName').toLowerCase() === "input") { // IF <INPUT>
					var type = elm.attr('type').toLowerCase();
					if (type == 'checkbox' || type == 'radio') {
						if (c_elm.hasClass(self.options.checkbox) || c_elm.hasClass(self.options.radio) || c_elm.hasClass(self.options.file)) {
							elm.trigger('change');
						} else {
							self.replace_input(elm);
						}
					}else if(type == 'file'){
						if (!c_elm.hasClass(self.options.file)) {
							self.replace_file(elm);
						}
					}

				} else if (elm.prop('nodeName').toLowerCase() === "select") { // IF <SELECT>
					if (c_elm.hasClass(self.options.select)) {
						elm.trigger('change');
					} else {
						self.replace_select(elm);
					}
				}
			});

		},

		// REPLACE CHECKBOX AND RADIO
		replace_input: function (original) {
			var self = this,
				type = original.attr('type').toLowerCase(),
				label = (original.siblings().find('label').length) ? original.siblings().find('label') : original.siblings('label'),
				custom;

			// add event listeners
			if (type === 'checkbox') {
				custom = $('<span class="' + self.options.checkbox + '"><i></i></span>');
				custom.on(self.options.toggleEventType, function () { self.toggle_checkbox(original); })
					.on('keydown', function (e) {
						if (e.keyCode == 32) {
							self.toggle_checkbox(original);
							e.preventDefault();
						}
					});
				label.on(self.options.toggleEventType, function (e) {
					if (String(e.target.nodeName).toLowerCase() != "a") {
						self.toggle_checkbox(original);
					}
				});
			} else if (type === 'radio') {
				custom = $('<span class="' + self.options.radio + '"><i></i></span>');
				custom.on(self.options.toggleEventType, function () { self.toggle_radio(original); })
					.on('keydown', function (e) {
						if (e.keyCode == 32) {
							self.toggle_radio(original);
							e.preventDefault();
						}
					});
				label.on(self.options.toggleEventType, function (e) {
					if (String(e.target.nodeName).toLowerCase() != "a") {
						self.toggle_radio(original);
					}
				});
			}
			
			// add existing classes
			custom.addClass(original.prop('class')).removeClass(self.options.excludeClass);
			
			original.on('change', function () { self.update_elements(original, custom); });

			// replace
			original.hide().after(custom);
			if(original.prop('checked')) original.trigger('change');

		},

		toggle_checkbox: function (original) {
			if (!original.prop('disabled')) {
				if (original.prop('checked')) {
					original.prop('checked', false);
				} else {
					original.prop('checked', true);
				}

				original.trigger('change');
			}
		},

		toggle_radio: function (original) {
			if (!original.prop('disabled') && !original.prop('checked')) {
				original.prop('checked', true).trigger('change');
			}
		},


		// REPLACE SELECT
		replace_select: function (original) {
			var arrow = $('<i class="cfe-arrow fa fa-caret-down"></i>'),
				titleOuter = $('<span class="cfe-select-title-outer"></span>'),
				title = $('<span class="cfe-select-title"></span>'),
				titleText = original.data("title"),
				wrap = $('<span class="cfe-select"></span>').addClass(original.prop('class')).removeClass(this.options.excludeClass);
			
			wrap.attr("style", original.attr("style"));
			original.fadeTo(0, 0);
				
			original.wrap(wrap).on('change', function () {
				var selected = $(this).find('option:selected');
				title.html(titleText.replace("%var%", selected.text()));
				
				if(selected.val() == "placeholder") title.addClass('placeholder');
					else title.removeClass('placeholder');
			}).on('keyup', function () {
				$(this).trigger('change');

			}).on('cfe.select_init', function () {
				var defselect = $(this).find('option:selected');

				if (defselect.length) {
					title.html(titleText.replace("%var%", defselect.text()));
				} else {
					title.html(titleText.replace("%var%", $(this).find('option:first').text()));
				}
				
				if(defselect.val() == "placeholder") title.addClass('placeholder');
					else title.removeClass('placeholder');

			});
			titleOuter.append(title).append(arrow).insertAfter(original);

			original.trigger('cfe.select_init');
		},
		
		// REPLACE FILE
		replace_file: function (original) {
			var self = this,
				wrap = $('<span class="' + self.options.file + '"></span>').addClass(original.prop('class')).removeClass(self.options.excludeClass),
				filename = $('<span class="cfe-filename"></span>'),
				icon = $('<span class="cfe-upload-icon"><i class="fa fa-search-plus"></i></span>');
			
			filename.text(original.data('placeholder')).addClass('placeholder');
			
			original.wrap(wrap).on('checkChange', function(){
				if(original.val() && original.val() != original.data('val')){
					original.trigger('change');
				}
			}).on('change',function(){
				var fileName = original.val().split(/\\/).pop();
				filename.removeClass('placeholder').text(fileName);
			}).on('click', function(){ // for IE and Opera, make sure change fires after choosing a file, using an async callback
				original.data('val', original.val());
				setTimeout(function(){
					original.trigger('checkChange');
				},100);
			}).trigger('checkChange');
			
			icon.insertBefore(original);
			filename.insertAfter(original);
		},

		// UPDATE ELEMENTS
		update_elements: function (original, custom) {
			var self = this;
			
			// disabled or not
			if (original.prop('disabled') != custom.hasClass('disabled')) {
				if (original.prop('disabled')) custom.addClass('disabled'); else custom.removeClass('disabled');
			}
			// checked or not
			if (original.prop('checked') != custom.hasClass('checked')) {
				if (original.prop('checked')) custom.addClass('checked'); else custom.removeClass('checked');
			}
			// if radio or checkbox
			var type = original.attr('type').toLowerCase();
			if (type == 'checkbox'){
				if (original.prop('checked') != custom.hasClass('checked')) {
					if (original.prop('checked')) custom.addClass('checked'); else custom.removeClass('checked');
				}
			}else if(type == 'radio'){
				original.closest('form').find('input[name=' + original.prop('name') + ']').each(function(){
					var radio = $(this),
						custom = radio.next('.'+self.options.radio);
					
					if (radio.prop('checked') != custom.hasClass('checked')) {
						if (radio.prop('checked')) custom.addClass('checked'); else custom.removeClass('checked');
					}
				});
			}
			// tabindex
			if ((original.prop('tabindex') != custom.prop('tabindex')) && !original.prop('disabled')) {
				custom.prop('tabindex', original.prop('tabindex'));
			}
		}

	};

	$.fn.CFElements = function (options) {
		if (typeof options === 'object' || !options) {
			methods.init(this, options);
			return this;
		} else {
			$.error('Wrong arguments passed ' + options);
		}
	}

	$.fn.CFElements.options = {
		checkbox: 'cfe-checkbox',
		radio: 'cfe-radio',
		select: 'cfe-select',
		file: 'cfe-file',
		toggleEventType: 'click',
		excludeClass: 'custom' // do not copy this class to the custom element
	};

})(jQuery, window, document);

