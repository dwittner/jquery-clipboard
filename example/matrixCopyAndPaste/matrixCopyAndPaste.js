var matrixCopyAndPaste = (function () {

	function copyHandler(event) {

		var dataArray = [];
		$('input').each(function(index) {
			var row = parseInt($(this).attr('id').split('_')[1]) - 1;
			var col = parseInt($(this).attr('id').split('_')[2]) - 1;
			var rowArray = dataArray[row] || [];
			rowArray[col] = $(this).val();
			dataArray[row] = rowArray;
		});

		var data = "";
		$.each(dataArray, function(rowIndex, value) {
			var rowArray = value;
			$.each(rowArray, function(colIndex, value) {
				data += value ? parseInt(value) * 10 : "";
				if (colIndex < rowArray.length - 1) {
					data += "\t";
				}
			});
			if (rowIndex < dataArray.length - 1) {
				data += "\n";
			}
		});
		$.clipboard.setData(data);
	}

	function pasteHandler(event, field, data) {

		var startField = event.target;

		var startFieldRow = parseInt($(startField).attr('id').split('_')[1]);
		var startFieldCol = parseInt($(startField).attr('id').split('_')[2]);

		var fieldRow = parseInt($(field).attr('id').split('_')[1]);
		var fieldCol = parseInt($(field).attr('id').split('_')[2]);

		if (fieldRow >= startFieldRow && fieldCol >= startFieldCol) {

			field.value = data.split('\n')[fieldRow - startFieldRow].split('\t')[fieldCol
					- startFieldCol] || "";
		}

		event.preventDefault();
	}

	/**
	 * Registers the given `pasteHandler` as paste handler for the specified fields indirectly.
	 * Indirectly means, that in fact another handler is registered, which calls the given `pasteHandler`
	 * for every single field, if a paste event occurs for one of the fields.
	 */
	function distributePaste(fields, pasteHandler) {

		pasteHandler = pasteHandler || function (event, field, data) {
			field.value = data;
		};

		fields.on('paste', function (event) {

			var data = $.clipboard.getData(event);

			fields.each(function () {
				pasteHandler(event, this, data);
			});
		});

		return this;
	}

	return {
		copyHandler: copyHandler,
		pasteHandler: pasteHandler,
		distributePaste: distributePaste
	};

}());