var card = require('./card');

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

module.exports.get_random_card = function(invalid_cards) {
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
