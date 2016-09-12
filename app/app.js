var poker_range_selector = require('./widgets/poker-range-selector');
var card_selector = require('./widgets/card-selector');

$(document).ready(function() {
    var poker_range_element = $('poker-range');
    var selected_range = [];
    var poker_range_emitter = poker_range_selector(poker_range_element, selected_range);
    poker_range_emitter.on('changed', function() {
        var message = "Selected cards:";
        for (var i = 0; i < selected_range.length; i++) {
            message += " " + selected_range[i].name;
        }
        console.error(message);
    });

    var card_selector_el = $('card-selector');
    var selected_cards = [];
    var card_selector_emitter = card_selector(card_selector_el, selected_cards);
});
