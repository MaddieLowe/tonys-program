var EventEmitter = require('events');
var fs = require('fs');
var card = require('../lib/card');
var card_icon = require('./card-icon');

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

var suit_map = ['D','C','H','S'];

module.exports = function(element, model) {
    var emitter = new EventEmitter();
    model = model || [];

    var template = fs.readFileSync(__dirname + '/../../views/widgets/card-selector.ejs', 'utf8');
    element.append($(template));

    var values_el = element.find('.values');
    var suits_el = element.find('.suits');

    var selected_value;
    var selected_suit;

    var get_random_card = function(invalid_cards) {
        var value;
        var suit;

        var card_matches = function(c) {
            return c.value === value & c.suit === suit;
        };

        var count = 0;
        do {
            if (count !== 0) {
                console.log("Re-getting card because we already have " + value + suit);
            }
            count++;

            var v = Math.round(Math.random() * (14 - 2) + 2);
            var s = Math.round(Math.random() * 3);
            value = card_from_value(v);
            suit = suit_map[s];
        } while (invalid_cards.find(card_matches))

        return new card(value + suit);
    };

    var value_click_handler = function(value_el, val) {
	return function(event) {
	    suits_el.addClass('selected');
	    value_el.addClass('selected');
	    selected_value = val;
	};
    };

    function update_displayed_cards() {
        var delete_card_handler = function(card) {
            return function(event) {
                model.splice(model.indexOf(card), 1);
                update_displayed_cards();
                emitter.emit('changed');
            };
        };

        var card_display = element.find('.selected-cards');
        card_display.empty();
        model.forEach(function(card) {
            var delete_button = $("<span class='delete-card'>x</span>");
            var new_card = $('<div></div>');
            card_icon(new_card, card);
            new_card.append(delete_button);
            card_display.append(new_card);
            // TODO: teardown
            delete_button.on('click', delete_card_handler(card));
        });
    };

    for (var i = 2; i <= 14; i++) {
	var val = card_from_value(i);
	var value_el = $("<div>" + val + "</div>");
	values_el.append(value_el);
        // TODO: teardown
	value_el.on('click', value_click_handler(value_el, val));
    }

    suit_map.forEach(function(suit) {
	var suit_el = $("<div>" + suit + "</div>");
	suits_el.append(suit_el);
	// TODO: teardown
	suit_el.on('click', function(event) {
	    element.find('*').removeClass('selected');
	    selected_suit = suit;
            var selected_card = new card(card_from_value(selected_value) + selected_suit);
            model.push(selected_card);
            update_displayed_cards();
            emitter.emit('changed');
	});
    });

    var add_card_el = element.find('.add-card');
    // TODO: teardown
    add_card_el.on('click', function(event) {
	values_el.addClass('selected');
    });

    var clear_cards_el = element.find('.clear-cards');
    // TODO: teardown
    clear_cards_el.on('click', function(event) {
        model.splice(0, model.length);
        update_displayed_cards();
        emitter.emit('changed');
    });

    var random_el = element.find('.random');
    // TODO: teardown
    random_el.on('click', function(event) {
        model.splice(0, model.length);
        for (var i = 0; i < 3; i++) {
            model[i] = get_random_card(model);
        }
        update_displayed_cards();
        emitter.emit('changed');
    });

    return emitter;
};
