var EventEmitter = require('events');
var fs = require('fs');

var card_from_value = function(val) {
    var str;
    switch(val) {
    case 10:
	str = "T";
	break;
    case 11:
	str = "J";
	break;
    case 12:
	str = "Q";
	break;
    case 13:
	str = "K";
	break;
    case 14:
	str = "A";
	break;
    default:
	str = val;
    };

    return str;
};

module.exports = function(element, model) {
    var emitter = new EventEmitter();

    var template = fs.readFileSync(__dirname + '/../../views/widgets/card-selector.ejs', 'utf8');
    element.append($(template));

    var values_el = element.find('.values');
    var suits_el = element.find('.suits');

    var selected_value;
    var selected_suit;

    var value_click_handler = function(value_el, val) {
	return function(event) {
	    suits_el.addClass('selected');
	    value_el.addClass('selected');
	    selected_value = val;
	};
    };

    for (var i = 2; i <= 14; i++) {
	var val = card_from_value(i);
	var value_el = $("<div>" + val + "</div>");
	values_el.append(value_el);
	value_el.on('click', value_click_handler(value_el, val));
    }

    ['D','C','H','S'].forEach(function(suit) {
	var suit_el = $("<div>" + suit + "</div>");
	suits_el.append(suit_el);
	// TODO: teardown
	suit_el.on('click', function(event) {
	    element.find('*').removeClass('selected');
	    selected_suit = suit;
	    console.error("selected card: " + selected_value + selected_suit);
	});
    });

    var add_card_el = element.find('.add-card');
    // TODO: teardown
    add_card_el.on('click', function(event) {
	values_el.addClass('selected');
    });

    return emitter;
};
