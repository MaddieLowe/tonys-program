var range_selector = require('./widgets/range-selector');
var base_range = require('./lib/base-range');

$(document).ready(function() {
    var element = $('.range');
    var model = JSON.parse(JSON.stringify(base_range));
    var rs_emitter = range_selector(element, model);
    rs_emitter.on('changed', function() {
        var message = "Selected cards: ";
        for (var i = 0; i < model.length; i++) {
            for (var j = 0; j < model[i].length; j++) {
                if (model[i][j].selected) {
                    message += " " + model[i][j].name;
                }
            }
        }
        console.error(message);
    });
});
