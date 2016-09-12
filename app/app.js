var poker_range_selector = require('./widgets/poker-range-selector');
var card_selector = require('./widgets/card-selector');

$(document).ready(function() {
    var poker_range_element = $('poker-range');
    var selected_range = [];
    var poker_range_emitter = poker_range_selector(poker_range_element, selected_range);

    var card_selector_el = $('card-selector');
    var selected_cards = [];
    var card_selector_emitter = card_selector(card_selector_el, selected_cards);

    var combine_selected_cards = function() {
        var final_range = [];
        for (var i = 0; i < selected_range.length; i++) {
            if (!selected_cards.find(function(element) {
                return selected_range[i].contains(element);
            })) {
                final_range.push(selected_range[i]);
            }
        }
        var message = "Selected cards:";
        for (var i = 0; i < final_range.length; i++) {
            message += " " + final_range[i].name;
        }
        console.error(message);

        return final_range;
    };

    poker_range_emitter.on('changed', function() {
        combine_selected_cards();
    });

    card_selector_emitter.on('changed', function() {
        combine_selected_cards();
    });
});
