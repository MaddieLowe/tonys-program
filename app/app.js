var poker_range_selector = require('./widgets/poker-range-selector');
var card_selector = require('./widgets/card-selector');

$(document).ready(function() {
    var element = $('poker-range');
    var emitter = poker_range_selector(element);

    var card_selector_el = $('card-selector');
    var card_selector_emitter = card_selector(card_selector_el);
});
