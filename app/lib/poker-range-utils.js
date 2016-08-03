var card_pair = require('./card-pair');

// This function makes the assumption that the base_model and the offsuit_base_model are the same size with the same
// cards at the same indexes
var suits = ['h','c','d','s'];

var find_all_pairs = module.exports.find_all_pairs = function(val1, val2) {
    var pairs = [];
    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < suits.length; j++) {
            if (suits[j] > suits[i]) {
                pairs.push(new card_pair("" + val1 + suits[i], "" + val2 + suits[j]));
            }
        }
    }
    return pairs;
};

module.exports.convert_model = function(base_model, offsuit_base_model, offsuit_suit_model) {
    var card_pairs = [];

    for (var i = 0; i < base_model.length; i++) {
        for (var j = 0; j < base_model[i].length; j++) {
            var name = base_model[i][j].name;
            if (name.length === 2) { // This is a pair then

            } else if (name[2] === 's') { // This is suited

            } else if (name[2] === 'o') { // This is offsuit

            }
        }
    }
};
