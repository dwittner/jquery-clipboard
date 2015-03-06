var matrixCopyHandler = function(event) {

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
};