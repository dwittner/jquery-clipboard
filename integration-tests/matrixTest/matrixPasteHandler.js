var matrixPasteHandler = function(event, field, data) {

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
};
