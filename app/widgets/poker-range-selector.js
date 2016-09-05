var EventEmitter = require('events');
var range_selector = require('./range-selector');
var base_range = require('../lib/base-range');
var offsuit_range = require('../lib/offsuit-range');
var paired_range = require('../lib/paired-range');
var suited_range = require('../lib/suited-range');
var fs = require('fs');
var poker_range_utils = require('../lib/poker-range-utils');
var suit_selector_ranges = {
    offsuit: offsuit_range,
    suited: suited_range,
    pairs: paired_range
};

module.exports = function(element, model) {
    var emitter = new EventEmitter();

    var template = fs.readFileSync(__dirname + '/../../views/widgets/poker-range-selector.ejs', 'utf8');
    element.append($(template));

    // Initialize the base range selector
    var base_element = element.find('range.base.main');
    var base_model = JSON.parse(JSON.stringify(base_range));
    var base_range_selector_emitter = range_selector(base_element, base_model);

    // Initialize the suit range selectors
    ['offsuit','suited','pairs'].forEach(function(suit_selector_type) {
	var suit_selector_base_element = element.find('.' + suit_selector_type + ' range.base');
	var suit_selector_base_model = JSON.parse(JSON.stringify(base_range));
	var suit_seletor_base_emitter = range_selector(suit_selector_base_element, suit_selector_base_model);

	var suit_selector_element = element.find('.' + suit_selector_type + ' range.suit-selection');
	var suit_selector_model = JSON.parse(JSON.stringify(suit_selector_ranges[suit_selector_type]));
	var suit_selector_emitter = range_selector(suit_selector_element, suit_selector_model);
	suit_selector_emitter.on('changed', function() {
            var message = "Selected suits: ";
            for (var i = 0; i < suit_selector_model.length; i++) {
		for (var j = 0; j < suit_selector_model[i].length; j++) {
                    if (suit_selector_model[i][j].selected) {
			message += " " + suit_selector_model[i][j].name;
                    }
		}
            }
            console.error(message);
	});

	var suit_selector_title = element.find('.item-selector:contains("' + suit_selector_type + '")');
	var suit_selector_section = element.find('.section.' + suit_selector_type);
	// TODO: teardown
	suit_selector_title.on('click', function() {
            if (suit_selector_section.hasClass('showing')) {
		suit_selector_section.removeClass('showing');
		suit_selector_title.removeClass('showing');
            } else {
		element.find('.showing').removeClass('showing');
		suit_selector_section.addClass('showing');
		suit_selector_title.addClass('showing');
            }
	});
    });

    base_range_selector_emitter.on('changed', function() {
        var message = "Selected cards:";
        var pairs = poker_range_utils.convert_model(base_model, offsuit_base_model, offsuit_model);
        for (var i = 0; i < pairs.length; i++) {
            message += " " + pairs[i].name;
        }
        console.error(message);
    });

    return emitter;
};
