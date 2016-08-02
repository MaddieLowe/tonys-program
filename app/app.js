var range_selector = require('./widgets/range-selector');
var base_range = require('./lib/base-range');
var offsuit_range = require('./lib/offsuit-range');

$(document).ready(function() {
    var base_element = $('range.base');
    var model = JSON.parse(JSON.stringify(base_range));
    var rs_emitter = range_selector(base_element, model);
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

    var offsuit_element = $('range.offsuit');
    var offsuit_model = JSON.parse(JSON.stringify(offsuit_range));
    var or_emitter = range_selector(offsuit_element, offsuit_model);
    or_emitter.on('changed', function() {
        var message = "Selected suits: ";
        for (var i = 0; i < offsuit_model.length; i++) {
            for (var j = 0; j < offsuit_model[i].length; j++) {
                if (offsuit_model[i][j].selected) {
                    message += " " + offsuit_model[i][j].name;
                }
            }
        }
        console.error(message);
    });
});
