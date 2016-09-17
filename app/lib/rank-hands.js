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

// var straight = function(pair, board) {
//     if (broadway(pair, board) || wheel
// };

// var straight_flush = function(pair, board) {
//     if (straight
// };

// module.exports = function(range, board) {
//     range.forEach(function(pair) {
//         if (straight_flush(pair, board)) {

//         }
//     });
// };
