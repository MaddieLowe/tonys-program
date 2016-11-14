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
            var specifier = "";
            if (row_range[j].name.indexOf("o") === 2) {
                specifier = "offsuit";
            } else if (row_range[j].name.indexOf("s") === 2) {
                specifier = "suited";
            }

            var column = $("<div class='column " + specifier + "'>" + row_range[j].name + "</div>");
            if (row_range[j].disabled) {
                column.addClass('disabled');
            }

            // TODO: teardown
            column.on('click', click_handler(column, row_range[j]));

            row.append(column);
        }
        element.append(row);
    }

    // Add a clear button. If we have any more elements to add that don't need to be
    // added dynamically, this should probably be moved to a separate file
    element.append('<div class="clear-range">X</div>');
    var clear_el = element.find(".clear-range");
    // TODO: teardown
    clear_el.on('click', function() {
        for (var i = 0; i < model.length; i++) {
            for (var j = 0; j < model[i].length; j++) {
                model[i][j].selected = false;
            }
        }
        element.find('.column.selected').removeClass('selected');
        emitter.emit('changed');
    });

    return emitter;
};
