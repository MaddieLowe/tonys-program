let EventEmitter = require('events');

module.exports = function(element, model) {
    let emitter = new EventEmitter();
    let dragging = false;

    let select_handler = function(column, item) {
        return function() {
            column.addClass('selected');
            item.selected = true;
        };
    };

    let click_handler = function(column, item) {
        return function() {
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
    for (let i = 0; i < model.length; i++) {
        let row_range = model[i];
        let row = $("<div class='row'></div>");
        for (let j = 0; j < row_range.length; j++) {
            let specifier = "";
            if (row_range[j].name.indexOf("o") === 2) {
                specifier = "offsuit";
            } else if (row_range[j].name.indexOf("s") === 2) {
                specifier = "suited";
            }

            let column = $("<div class='column " + specifier + "'>" + row_range[j].name + "</div>");
            if (row_range[j].disabled) {
                column.addClass('disabled');
            }

            // TODO: teardown
            let select = select_handler(column, row_range[j]);
            column.on('mouseover', function(evt) {
                if (dragging) {
                    select(evt);
                }
            });
            column.on('mousedown', click_handler(column, row_range[j]));

            row.append(column);
        }
        element.append(row);
    }

    // TODO: teardown
    element.on('mousedown', function() {
        dragging = true;
    });
    element.on('mouseup mouseleave', function() {
        dragging = false;
        emitter.emit('changed');
    });

    // Add a clear button. If we have any more elements to add that don't need to be
    // added dynamically, this should probably be moved to a separate file
    element.append('<div class="clear-range">X</div>');
    let clear_el = element.find(".clear-range");
    // TODO: teardown
    clear_el.on('click', function() {
        for (let i = 0; i < model.length; i++) {
            for (let j = 0; j < model[i].length; j++) {
                model[i][j].selected = false;
            }
        }
        element.find('.column.selected').removeClass('selected');
        emitter.emit('changed');
    });

    return emitter;
};
