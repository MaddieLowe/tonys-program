var EventEmitter = require('events');

module.exports = function(element, model) {
    var emitter = new EventEmitter();

    var click_handler = function(column, item) {
        return function(event) {
            if (column.hasClass('selected')) {
                column.removeClass('selected');
                item.selected = false;
            } else {
                column.addClass('selected');
                item.selected = true;
            }
            emitter.emit('changed');
        };
    };

    // Build the range grid
    for (var i = 0; i < model.length; i++) {
        var row_range = model[i];
        var row = $("<div class='row'></div>");
        for (var j = 0; j < row_range.length; j++) {
            var column = $("<div class='column'>" + row_range[j].name + "</div>");

            // TODO: teardown
            column.on('click', click_handler(column, row_range[j]));

            row.append(column);
        }
        element.append(row);
    }

    return emitter;
};
