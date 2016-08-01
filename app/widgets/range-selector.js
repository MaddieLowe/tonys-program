var base_range = require('../lib/base-range');

module.exports = function(element) {
    var click_handler = function(column) {
        return function(event) {
            if (column.hasClass('selected')) {
                column.removeClass('selected');
            } else {
                column.addClass('selected');
            }
        };
    };

    // Build the range grid
    for (var i = 0; i < base_range.length; i++) {
        var row_range = base_range[i];
        var row = $("<div class='row'></div>");
        for (var j = 0; j < row_range.length; j++) {
            var column = $("<div class='column'>" + row_range[j].name + "</div>");

            // TODO: teardown
            column.on('click', click_handler(column));

            row.append(column);
        }
        element.append(row);
    }
};
