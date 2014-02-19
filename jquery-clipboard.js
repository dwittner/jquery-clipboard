/**
 * jquery-clipboard
 * 
 * (c) 2014 Daniel Wittner <d.wittner@gmx.de>
 */
(function($) {

	function fallbackCopy(data) {

		var idDiv = 'jquery-clipboard-div';
		var idTextArea = 'jquery-clipboard-textarea';

		function adjust(div, textArea) {
			textArea.style.height = "1px";
			textArea.style.height = textArea.scrollHeight + "px";
			div.css('width', $('#' + idTextArea).css('width'));
			div.css('height', $('#' + idTextArea).css('height'));
		}

		$('body').append('<div id="' + idDiv + '"></div>');
		$('#' + idDiv).append('<textarea id="' + idTextArea + '"></textarea>');
		$('#' + idTextArea).val(data).on('blur', function(event) {
			$('#' + idDiv).remove();
		}).focus().select();
		adjust($('#' + idDiv), $('#' + idTextArea)[0]);
	}

	var clipboard = {

		initApplet : function(urlOfJarFile) {

			if (window.clipboardData) {
				return;
			}

			var attributes = {
				id : 'clipboardApplet',
				code : 'org.clipboardapplet.ClipboardApplet.class',
				archive : urlOfJarFile || 'ClipboardApplet.jar',
				width : 0,
				height : 0
			};
			deployJava.runApplet(attributes, {}, '1.6');

			if (typeof clipboardApplet === "undefined" || !clipboardApplet.copyText) {
				console.log('ClipboardApplet initialization failed!');
				console.log('Check Java console for more information!');
			}
		},

		setData : function(data) {

			if (window.clipboardData) {
				window.clipboardData.setData('Text', data);
			} else if (typeof clipboardApplet !== "undefined" && clipboardApplet.copyText) {

				try {
					clipboardApplet.copyText(data);
				} catch (e) {
					console
							.log('Calling method copyText of ClipboardApplet failed!');
					console.log('Check Java console for more information!');
					console.log(e);

					fallbackCopy(data);
				}
			} else {
				fallbackCopy(data);
			}
		},

		getData : function(event) {
			return window.clipboardData ? window.clipboardData.getData('Text')
					: event.originalEvent.clipboardData.getData('Text');
		}
	};
	
	$.clipboard = clipboard;

	$.fn.pasteAll = function(pasteHandler) {

		var self = this;
		this.on("paste", function(event) {

			var data = $.clipboard.getData(event);

			self.each(function() {
				pasteHandler(event, this, data);
			});
		});

		return this;
	};
})(jQuery);
