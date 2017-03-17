var card = require('./card');
var card_pair = require('./card-pair');

var suit_map = module.exports.suit_map = ['D','C','H','S'];

var card_from_value = module.exports.card_from_value = function(val) {
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

var get_card_matches_func = function(value, suit) {
    return function(c) {
        return c.value === value & c.suit === suit;
    };
};

module.exports.get_random_card = function(invalid_cards, valid_cards) {
    invalid_cards = invalid_cards || [];
    var value;
    var suit;

    var get_card_from_deck = function() {
        var v = Math.round(Math.random() * (14 - 2) + 2);
        var s = Math.round(Math.random() * 3);
        value = v;
        suit = suit_map[s];
    };

    var get_card_from_range = function() {
        var i = Math.round(Math.random() * ((valid_cards.length - 1) - 0) + 0);
        value = valid_cards[i].value;
        suit = valid_cards[i].suit;
    };

    var count = 0;
    do {
        if (count !== 0) {
            console.log("Re-getting card because we already have " + value + suit);
        }
        if (count === 10) {
            break;
        }
        count++;

        if (valid_cards) {
            get_card_from_range();
        } else {
            get_card_from_deck();
        }
    } while (invalid_cards.find(get_card_matches_func(value, suit)))

    return new card(card_from_value(value) + suit);
};

module.exports.get_random_card_pair = function(invalid_cards, valid_pairs) {
    let count = 0;
    let pair;
    do {
        if (count !== 0) {
            console.log("Re-getting pair");
        }
        if (count === 10) {
            break;
        }
        count++;

        let i = Math.round(Math.random() * ((valid_pairs.length - 1) - 0) + 0);
        pair = valid_pairs[i];
    } while (invalid_cards.find(get_card_matches_func(pair.card1.value, pair.card1.suit)) ||
             invalid_cards.find(get_card_matches_func(pair.card2.value, pair.card2.suit)))

    return new card_pair(pair.card1.name, pair.card2.name);
};

module.exports.pairs_array_to_card_array = function(pairs_array) {
    var cards = [];
    for (var i = 0; i < pairs_array.length; i++) {
        cards.push(new card(pairs_array[i].card1.name));
        cards.push(new card(pairs_array[i].card2.name));
    }
    return cards;
};

module.exports.get_random_position = function(positions) {
    var i = Math.round(Math.random() * ((positions.length - 1) - 0) + 0);
    return positions[i];
};
