var card_collection = require('./card-collection');

var broadway = module.exports.broadway = function(pair, board) { // broadway is a straight A,K,Q,J,T
    var hand = new card_collection(board.concat(pair));
    hand.remove_pairs();
    if (hand.cards[0].value === 14 && hand.cards[4].value === 10) {
        return true;
    }
    return false;
};

var wheel = module.exports.wheel = function(pair, board) {
    var hand = new card_collection(board.concat(pair));
    hand.remove_pairs();

    var last_card = hand.cards.length - 1;
    if (hand.cards[last_card].value === 2 &&
        hand.cards[last_card - 3].value === 5 &&
        hand.cards[0].value === 14) {
        return true;
    }
    return false;
};

var open_ended_straight_counter = module.exports.open_ended_straight_counter = function(pair, board) {
    var hand = new card_collection(board.concat(pair));
    hand.remove_pairs();
    hand.remove_aces();
    if (hand.is_empty()) {
        return 0;
    }

    var length = 1;
    var length_max_straight = 1;
    for (var i = 1; i < hand.cards.length; i++) {
        if (hand.cards[i].value === (hand.cards[i - 1].value - 1)) {
            length++;
            length_max_straight = Math.max(length_max_straight, length);
        } else {
            length = 1;
        }
    }

    return length_max_straight;
};

var straight = module.exports.straight = function(pair, board) {
    if (broadway(pair, board) || wheel(pair, board)) {
        return true;
    }

    var length = open_ended_straight_counter(pair, board);
    if (length >= 5) {
        return true;
    }

    return false;
};

// var straight_flush = function(pair, board) {
//     if (straight
// };

// module.exports = function(range, board) {
//     range.forEach(function(pair) {
//         if (straight_flush(pair, board)) {

//         }
//     });
// };
