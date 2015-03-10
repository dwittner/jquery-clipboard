/**
 * jquery-clipboard
 *
 * (c) 2014 Daniel Wittner <d.wittner@gmx.de>
 */
(function ($) {
	'use strict';

	function useCopyFallback(data) {

		var idDiv = 'jquery-clipboard-div',
			idTextArea = 'jquery-clipboard-textarea';

		function adjust(div, textArea) {
			textArea.style.height = '1px';
			textArea.style.height = textArea.scrollHeight + 'px';
			div.css('width', $('#' + idTextArea).css('width'));
			div.css('height', $('#' + idTextArea).css('height'));
		}

		$('body').append('<div id="' + idDiv + '"></div>');
		$('#' + idDiv).append('<textarea id="' + idTextArea + '"></textarea>');
		$('#' + idTextArea).val(data).on('blur', function (event) {
			$('#' + idDiv).remove();
		}).focus().select();
		adjust($('#' + idDiv), $('#' + idTextArea)[0]);
	}

	$.clipboard = {

		initApplet : function (file) {

			if (window.clipboardData) {
				return;
			}

			var attributes = {
				id : 'clipboardApplet',
				code : 'org.clipboardapplet.ClipboardApplet.class',
				archive : file || 'ClipboardApplet.jar',
				width : 0,
				height : 0
			};
			deployJava.runApplet(attributes, {}, '1.6');

			if (typeof clipboardApplet === 'undefined' || !clipboardApplet.writeToClipboard) {
				console.log('ClipboardApplet initialization failed!');
				console.log('Check Java console for more information!');
			}
		},

		setData : function (data) {

			if (window.clipboardData) {
				window.clipboardData.setData('Text', data);
			} else if (typeof clipboardApplet !== 'undefined' && clipboardApplet.writeToClipboard) {

				try {
					clipboardApplet.writeToClipboard(data);
				} catch (e) {
					console.log('Calling method writeToClipboard of ClipboardApplet failed!');
					console.log('Check Java console for more information!');
					console.log(e);

					useCopyFallback(data);
				}
			} else {
				useCopyFallback(data);
			}
		},

		getData : function (event) {

			if (window.clipboardData) {
				return window.clipboardData.getData('Text');
			}

			if (event) {
				return event.originalEvent.clipboardData.getData('Text');
			}

			if (typeof clipboardApplet !== 'undefined' && clipboardApplet.readFromClipboard) {
				return clipboardApplet.readFromClipboard();
			}

			throw new Error("There is no way to get the content of the clipboard!");
		}
	};

}(jQuery));
