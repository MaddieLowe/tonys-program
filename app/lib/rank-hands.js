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

var matching_suits = module.exports.matching_suits = function(pair, board) {
    var hand = new card_collection(board.concat(pair));
    hand.sort_by_suit();

    var matching_suits = 1;
    var max_matching_suits = 1;
    for (var i = 1; i < hand.cards.length; i++) {
        if (hand.cards[i].suit === hand.cards[i - 1].suit) {
            matching_suits++;
            max_matching_suits = Math.max(max_matching_suits, matching_suits);
        } else {
            matching_suits = 1;
        }
    }

    return max_matching_suits;
};

var flush = module.exports.flush = function(pair, board) {
    return matching_suits(pair, board) >= 5;
};

var straight_flush = module.exports.straight_flush = function(pair, board) {
    if (straight(pair, board) && flush(pair, board)) {
        return true;
    }
    return false;
};

var identical_cards = function(pair, board) {
    var hand = new card_collection(board.concat(pair));
    var max_identical_cards = 1;
    var identical_cards = 1;
    for (var i = 1; i < hand.cards.length; i++) {
        if (hand.cards[i].value === hand.cards[i - 1].value) {
            identical_cards++;
            max_identical_cards = Math.max(max_identical_cards, identical_cards);
        } else {
            identical_cards = 1;
        }
    }
    return max_identical_cards;
};

var quads = module.exports.quads = function(pair, board) {
    return identical_cards(pair, board)  === 4;
};

var three_of_a_kind = module.exports.three_of_a_kind = function(pair, board) {
    return identical_cards(pair, board) === 3;
};

var rank_of_highest_pair = module.exports.rank_of_highest_pair = function(pair, board) {
    var hand = new card_collection(board.concat(pair));

    var identical_cards = 1;
    for (var i = 1; i < hand.cards.length; i++) {
        if (hand.cards[i].value === hand.cards[i - 1].value) {
            identical_cards++;
        } else {
            if (identical_cards === 2) {
                return hand.cards[i - 1].value;
            }
            identical_cards = 1;
        }
    }
    if (identical_cards === 2) {
        return hand.cards[i - 1].value;
    }
    return 0;
};

var full_house = module.exports.full_house = function(pair, board) {
    if (three_of_a_kind(pair, board) && rank_of_highest_pair(pair, board) > 0) {
        return true;
    }
    return false;
};

var two_pair = module.exports.two_pair = function(pair, board) {
    var hand = new card_collection(board.concat(pair));

    var identical_cards = 1;
    var pairs = 0;
    for (var i = 1; i < hand.cards.length; i++) {
        if (hand.cards[i].value === hand.cards[i - 1].value) {
            identical_cards++;
        } else {
            if (identical_cards === 2) {
                pairs++;
            }
            identical_cards = 1;
        }
    }
    if (identical_cards === 2) {
        pairs++;
    }

    return pairs >= 2;
};

var overpair = module.exports.overpair = function(pair, board) {
    var sorted_board = new card_collection(board);
    var highest_pair = rank_of_highest_pair(pair, board);
    return highest_pair > sorted_board.cards[0].value;
};

var top_pair = module.exports.top_pair = function(pair, board) {
    var sorted_board = new card_collection(board);

    if (sorted_board.cards[0].value === sorted_board.cards[1].value) {
        return false;
    }

    var highest_pair = rank_of_highest_pair(pair, board);
    return highest_pair === sorted_board.cards[0].value;
};

var pocket_pair_below_top_pair = module.exports.pocket_pair_below_top_pair = function(pair, board) {
    var sorted_board = new card_collection(board);
    var highest_pair = rank_of_highest_pair(pair, board);
    return highest_pair < sorted_board.cards[0].value && highest_pair > sorted_board.cards[1].value;
};

var middle_pair = module.exports.middle_pair = function(pair, board) {
    var sorted_board = new card_collection(board);
    var highest_pair = rank_of_highest_pair(pair, board);
    return highest_pair === sorted_board.cards[1].value;
};

var weak_pair = module.exports.weak_pair = function(pair, board) {
    var sorted_board = new card_collection(board);
    var highest_pair = rank_of_highest_pair(pair, board);
    if (highest_pair === 0 || highest_pair >= sorted_board.cards[1].value) {
        return false;
    } else {
        return true;
    }
};

var ace_high = module.exports.ace_high = function(pair, board) {
    var sorted_pair = new card_collection([pair]);
    return sorted_pair.cards[0].value === 14 && rank_of_highest_pair(pair, board) === 0;
};

module.exports.rank_table = function(range, board) {
    var combos = {};

    var add_combo = function(combo_name) {
        if (!combos[combo_name]) {
            combos[combo_name] = 1;
        } else {
            combos[combo_name]++;
        }
    };

    range.forEach(function(pair) {
        if (straight_flush(pair, board)) {
            add_combo('straight_flush');
        } else if (quads(pair, board)) {
            add_combo('quads');
        } else if (full_house(pair, board)) {
            add_combo('full_house');
        } else if (flush(pair, board)) {
            add_combo('flush');
        } else if (straight(pair, board)) {
            add_combo('straight');
        } else if (three_of_a_kind(pair, board)) {
            add_combo('three_of_a_kind');
        } else if (two_pair(pair, board)) {
            add_combo('two_pair');
        } else if (overpair) {
            add_combo('overpair');
        } else if (top_pair(pair, board)) {
            add_combo('top_pair');
        } else if (pocket_pair_below_top_pair(pair, board)) {
            add_combo('pocket_pair_below_top_pair');
        } else if (middle_pair(pair, board)) {
            add_combo('middle_pair');
        } else if (weak_pair(pair, board)) {
            add_combo('weak_pair');
        } else if (ace_high(pair, board)){
            add_combo('ace_high');
        } else {
            add_combo('no_hand');
        }

        //if (flush_draw
    });
};
