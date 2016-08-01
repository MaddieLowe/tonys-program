var base_range = require('./lib/base-range');

$(document).ready(function() {
    var element = $('.range');

    for (var i = 0; i < base_range.length; i++) {
        var row_range = base_range[i];
        var row = $("<div class='row'></div>");
        for (var j = 0; j < row_range.length; j++) {
            var column = $("<div class='column'>" + row_range[j].name + "</div>");
            row.append(column);
        }
        element.append(row);
    }
});
