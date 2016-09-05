var card_pair = require('./card-pair');

// This function makes the assumption that the base_model and the offsuit_base_model are the same size with the same
// cards at the same indexes
var default_suit_pairs = ['dd','cd','hd','sd',
                          'dc','cc','hc','sc',
                          'dh','ch','hh','sh',
                          'ds','cs','hs','ss'];

var find_all_pairs = module.exports.find_all_pairs = function(val1, val2, suit_pairs) {
    suit_pairs = suit_pairs || default_suit_pairs;
    var pairs = [];
    for (var i = 0; i < suit_pairs.length; i++) {
        if (suit_pairs[i][0] > suit_pairs[i][1]) {
            pairs.push(new card_pair("" + val1 + suit_pairs[i][0], "" + val2 + suit_pairs[i][1]));
        }
    }
    return pairs;
};

var find_all_suited = module.exports.find_all_suited = function(val1, val2, suit_pairs) {
    suit_pairs = suit_pairs || default_suit_pairs;
    var pairs = [];
    for (var i = 0; i < suit_pairs.length; i++) {
        if (suit_pairs[i][0] === suit_pairs[i][1]) {
            pairs.push(new card_pair("" + val1 + suit_pairs[i][0], "" + val2 + suit_pairs[i][1]));
        }
    }
    return pairs;
};

var find_all_offsuit = module.exports.find_all_offsuit = function(val1, val2, suit_pairs) {
    suit_pairs = suit_pairs || default_suit_pairs;
    var pairs = [];
    for (var i = 0; i < suit_pairs.length; i++) {
        if (suit_pairs[i][0] !== suit_pairs[i][1]) {
            pairs.push(new card_pair("" + val1 + suit_pairs[i][0], "" + val2 + suit_pairs[i][1]));
        }
    }
    return pairs;
};

var convert_suit_model = function(suit_model) {
    var suit_pairs = [];
    for (var i = 0; i < suit_model.length; i++) {
        for (var j = 0; j < suit_model[i].length; j++) {
            if (suit_model[i][j].selected) {
                suit_pairs.push(suit_model[i][j].name.toLowerCase());
            }
        }
    }
    return suit_pairs;
};

module.exports.convert_model = function(base_model,
					offsuit_base_model,
					offsuit_suit_model,
					suited_base_model,
					suited_suit_model,
					paired_base_model,
					paired_suit_model) {
    var card_pairs = [];

    var offsuit_pairs = convert_suit_model(offsuit_suit_model);
    var suited_pairs = convert_suit_model(suited_suit_model);
    var paired_pairs = convert_suit_model(paired_suit_model);

    for (var i = 0; i < base_model.length; i++) {
        for (var j = 0; j < base_model[i].length; j++) {
            if (!base_model[i][j].selected) continue;

            var name = base_model[i][j].name;
            var card1 = name[0];
            var card2 = name[1];
            if (name.length === 2) { // This is a pair then
		if (paired_base_model[i][j].selected) {
		    card_pairs = card_pairs.concat(find_all_pairs(card1, card2, paired_pairs));
		} else {
                    card_pairs = card_pairs.concat(find_all_pairs(card1, card2));
		}
            } else if (name[2] === 's') { // This is suited
		if (suited_base_model[i][j].selected) {
		    card_pairs = card_pairs.concat(find_all_suited(card1, card2, suited_pairs));
		} else {
                    card_pairs = card_pairs.concat(find_all_suited(card1, card2));
		}
            } else if (name[2] === 'o') { // This is offsuit
                if (offsuit_base_model[i][j].selected) {
                    card_pairs = card_pairs.concat(find_all_offsuit(card1, card2, offsuit_pairs));
                } else {
                    card_pairs = card_pairs.concat(find_all_offsuit(card1, card2));
                }
            }
        }
    }
    return card_pairs;
};
