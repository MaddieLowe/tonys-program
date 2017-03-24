let card_collection = require('./card-collection');

let broadway = module.exports.broadway = function(pair, board) { // broadway is a straight A,K,Q,J,T
    let hand = new card_collection(board.concat(pair));
    hand.remove_pairs();

    if (hand.cards.length < 5) return false;

    if (hand.cards[0].value === 14 && hand.cards[4].value === 10) {
        return true;
    }
    return false;
};

let wheel = module.exports.wheel = function(pair, board) {
    let hand = new card_collection(board.concat(pair));
    hand.remove_pairs();

    if (hand.cards.length < 5) return false;

    let last_card = hand.cards.length - 1;
    if (hand.cards[last_card].value === 2 &&
        hand.cards[last_card - 3].value === 5 &&
        hand.cards[0].value === 14) {
        return true;
    }
    return false;
};

let open_ended_straight_counter = module.exports.open_ended_straight_counter = function(pair, board) {
    let hand = new card_collection(board.concat(pair));
    hand.remove_pairs();
    hand.remove_aces();
    if (hand.is_empty()) {
        return 0;
    }

    let length = 1;
    let length_max_straight = 1;
    for (let i = 1; i < hand.cards.length; i++) {
        if (hand.cards[i].value === (hand.cards[i - 1].value - 1)) {
            length++;
            length_max_straight = Math.max(length_max_straight, length);
        } else {
            length = 1;
        }
    }

    return length_max_straight;
};

let straight = module.exports.straight = function(pair, board) {
    if (broadway(pair, board) || wheel(pair, board)) {
        return true;
    }

    let length = open_ended_straight_counter(pair, board);
    if (length >= 5) {
        return true;
    }

    return false;
};

let matching_suits = module.exports.matching_suits = function(pair, board) {
    let hand = new card_collection(board.concat(pair));
    hand.sort_by_suit();

    let matching_suits = 1;
    let max_matching_suits = 1;
    for (let i = 1; i < hand.cards.length; i++) {
        if (hand.cards[i].suit === hand.cards[i - 1].suit) {
            matching_suits++;
            max_matching_suits = Math.max(max_matching_suits, matching_suits);
        } else {
            matching_suits = 1;
        }
    }

    return max_matching_suits;
};

let flush = module.exports.flush = function(pair, board) {
    return matching_suits(pair, board) >= 5;
};

let straight_flush = module.exports.straight_flush = function(pair, board) {
    if (straight(pair, board) && flush(pair, board)) {
        return true;
    }
    return false;
};

let identical_cards = function(pair, board) {
    let hand = new card_collection(board.concat(pair));
    let max_identical_cards = 1;
    let identical_cards = 1;
    for (let i = 1; i < hand.cards.length; i++) {
        if (hand.cards[i].value === hand.cards[i - 1].value) {
            identical_cards++;
            max_identical_cards = Math.max(max_identical_cards, identical_cards);
        } else {
            identical_cards = 1;
        }
    }
    return max_identical_cards;
};

let quads = module.exports.quads = function(pair, board) {
    return identical_cards(pair, board)  === 4;
};

let three_of_a_kind = module.exports.three_of_a_kind = function(pair, board) {
    return identical_cards(pair, board) === 3;
};

let rank_of_highest_pair = module.exports.rank_of_highest_pair = function(pair, board) {
    let hand = new card_collection(board.concat(pair));

    let identical_cards = 1;
    let i;
    for (i = 1; i < hand.cards.length; i++) {
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

let full_house = module.exports.full_house = function(pair, board) {
    if (three_of_a_kind(pair, board) && rank_of_highest_pair(pair, board) > 0) {
        return true;
    }
    return false;
};

let two_pair = module.exports.two_pair = function(pair, board) {
    let hand = new card_collection(board.concat(pair));

    let identical_cards = 1;
    let pairs = 0;
    for (let i = 1; i < hand.cards.length; i++) {
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

let overpair = module.exports.overpair = function(pair, board) {
    let sorted_board = new card_collection(board);
    let highest_pair = rank_of_highest_pair(pair, board);
    return highest_pair > sorted_board.cards[0].value;
};

let top_pair = module.exports.top_pair = function(pair, board) {
    let sorted_board = new card_collection(board);

    if (sorted_board.cards[0].value === sorted_board.cards[1].value) {
        return false;
    }

    let highest_pair = rank_of_highest_pair(pair, board);
    return highest_pair === sorted_board.cards[0].value;
};

let pocket_pair_below_top_pair = module.exports.pocket_pair_below_top_pair = function(pair, board) {
    let sorted_board = new card_collection(board);
    let highest_pair = rank_of_highest_pair(pair, board);
    return highest_pair < sorted_board.cards[0].value && highest_pair > sorted_board.cards[1].value;
};

let middle_pair = module.exports.middle_pair = function(pair, board) {
    let sorted_board = new card_collection(board);
    let highest_pair = rank_of_highest_pair(pair, board);

    if (sorted_board.cards[1].value === sorted_board.cards[2].value) {
        return false;
    } else if (highest_pair === sorted_board.cards[1].value) {
        return true;
    }
    return false;
};

let weak_pair = module.exports.weak_pair = function(pair, board) {
    let sorted_board = new card_collection(board);
    let highest_pair = rank_of_highest_pair(pair, board);
    if (highest_pair === 0 || highest_pair >= sorted_board.cards[1].value) {
        return false;
    } else {
        return true;
    }
};

let ace_high = module.exports.ace_high = function(pair, board) {
    let sorted_pair = new card_collection([pair]);
    return sorted_pair.cards[0].value === 14 && rank_of_highest_pair(pair, board) === 0;
};

let flush_suit = module.exports.flush_suit = function(pair, board) {
    let hand = new card_collection(board.concat(pair));
    hand.sort_by_suit();
    return hand.cards[0].suit;
};

let flush_draw_util = function(pair, board, number_of_matches) {
    let ms = matching_suits(pair, board);
    let fs = flush_suit(pair, board);

    let flush_suit_in_hole_cards = false;
    if (pair.card1.suit === fs ||
        pair.card2.suit === fs) {
        flush_suit_in_hole_cards = true;
    }

    if (!flush_suit_in_hole_cards || ms != number_of_matches) {
        return false;
    }
    return true;
};

let flush_draw = module.exports.flush_draw = function(pair, board) {
    return flush_draw_util(pair, board, 4);
};

let nut_flush_card = module.exports.nut_flush_card = function(board, flushsuit) {
    let sorted_board = new card_collection(board);
    let first_missing_rank = 14;
    for (let i = 0; i < sorted_board.cards.length; i++) {
        if (sorted_board.cards[i].suit === flushsuit && sorted_board.cards[i].value === first_missing_rank) {
            first_missing_rank--;
        }
    }

    return first_missing_rank;
};

let nut_flush_draw_util = function(pair, board) {
    let fs = flush_suit(pair, board);
    let first_missing_rank = nut_flush_card(board, fs);

    let is_nut_flush_draw = false;
    let card_matches_nut = function(card) {
        if (card.value === first_missing_rank && card.suit === fs) {
            is_nut_flush_draw = true;
        }
    };

    card_matches_nut(pair.card1);
    card_matches_nut(pair.card2);

    return is_nut_flush_draw;
};

let nut_flush_draw = module.exports.nut_flush_draw = function(pair, board) {
    let fd = flush_draw(pair, board);
    if (!fd) return false;

    return nut_flush_draw_util(pair, board);
};

let backdoor_flush_draw = module.exports.backdoor_flush_draw = function(pair, board) {
    return flush_draw_util(pair, board, 3);
};

let backdoor_nut_flush_draw = module.exports.backdoor_nut_flush_draw = function(pair, board) {
    let fd = backdoor_flush_draw(pair, board);
    if (!fd) return false;

    return nut_flush_draw_util(pair, board);
};

let overcards = module.exports.overcards = function(pair, board) {
    let sorted_board = new card_collection(board);

    return pair.card1.value !== pair.card2.value &&
        pair.card2.value > sorted_board.cards[0].value;
};

module.exports.rank_table = function(range, board) {
    let combos = {};

    let add_combo = function(combo_name) {
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
        } else if (overpair(pair, board)) {
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

        if (flush_draw(pair, board)) {
            add_combo('flush_draw');
            if (nut_flush_draw(pair, board)) {
                add_combo('nut_flush_draw');
            }
        } else if(backdoor_flush_draw(pair, board)) {
            add_combo('backdoor_flush_draw');
            if (backdoor_nut_flush_draw(pair, board)) {
                add_combo('backdoor_nut_flush_draw');
            }
        }

        if (overcards(pair, board)) {
            add_combo('overcards');
        }
    });

    return combos;
};
