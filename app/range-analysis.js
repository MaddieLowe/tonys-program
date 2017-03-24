let poker_range_selector = require('./widgets/poker-range-selector');
let card_selector = require('./widgets/card-selector');
let rank_hands = require('./lib/rank-hands');
let rank_filter = require('./lib/filters/rank-filter');

$(document).ready(function() {
    let poker_range_element = $('poker-range');
    let selected_range = [];
    let poker_range_emitter = poker_range_selector(poker_range_element, selected_range);

    let card_selector_el = $('card-selector');
    let selected_cards = [];
    let card_selector_emitter = card_selector(card_selector_el, selected_cards);

    let combine_selected_cards = function() {
        let final_range = [];
        for (let i = 0; i < selected_range.length; i++) {
            if (!selected_cards.find(function(element) {
                return selected_range[i].contains(element);
            })) {
                final_range.push(selected_range[i]);
            }
        }
        // var message = "Selected cards:";
        // for (var i = 0; i < final_range.length; i++) {
        //     message += " " + final_range[i].name;
        // }
        // console.error(message);

        let output = "";
        output +="<div>Combinations in range: " + final_range.length + "</div><div>&nbsp;</div>";
        let combos;
        if (selected_cards.length >= 3) {
            combos = rank_hands.rank_table(final_range, selected_cards);
            rank_filter(combos, function(type, value) {
            // for (var type in combos) {
                output += "<div>" + type + ": " + value + "</div>";
                // console.error(type + ": " + value);
            });
        }
        let output_div = $('.output');
        output_div.empty();
        output_div.append(output);

        return combos;
    };

    poker_range_emitter.on('changed', function() {
        combine_selected_cards();
    });

    card_selector_emitter.on('changed', function() {
        combine_selected_cards();
    });
});
