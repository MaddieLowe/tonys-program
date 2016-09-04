var EventEmitter = require('events');
var range_selector = require('./range-selector');
var base_range = require('../lib/base-range');
var offsuit_range = require('../lib/offsuit-range');
var fs = require('fs');
var poker_range_utils = require('../lib/poker-range-utils');

module.exports = function(element, model) {
    var emitter = new EventEmitter();

    var template = fs.readFileSync(__dirname + '/../../views/widgets/poker-range-selector.ejs', 'utf8');
    element.append($(template));

    // Initialize the base range selector
    var base_element = element.find('range.base.main');
    var base_model = JSON.parse(JSON.stringify(base_range));
    var rs_emitter = range_selector(base_element, base_model);

    // Initialize the offsuit range selector
    var offsuit_base_element = element.find('.offsuit range.base');
    var offsuit_base_model = JSON.parse(JSON.stringify(base_range));
    var obr_emitter = range_selector(offsuit_base_element, offsuit_base_model);

    var offsuit_element = element.find('.offsuit range.suit-selection');
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

    var offsuit_title = element.find('.item-selector:contains("Offsuit")');
    var offsuit_section = element.find('.section.offsuit');
    // TODO: teardown
    offsuit_title.on('click', function() {
        if (offsuit_section.hasClass('showing')) {
            offsuit_section.removeClass('showing');
	    offsuit_title.removeClass('selected');
        } else {
            offsuit_section.addClass('showing');
	    offsuit_title.addClass('selected');
        }
    });

    rs_emitter.on('changed', function() {
        var message = "Selected cards:";
        var pairs = poker_range_utils.convert_model(base_model, offsuit_base_model, offsuit_model);
        for (var i = 0; i < pairs.length; i++) {
            message += " " + pairs[i].name;
        }
        console.error(message);
    });

    return emitter;
};
