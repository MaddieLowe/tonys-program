/**
 * Expects an object like this:
 *
 * { three_of_a_kind: 5,
 *   quads: 1 }
 *
 * and a callback, and calls the callback on each item, similar to a forEach
 */
var hand_order = [
    'straight_flush',
    'quads',
    'full_house',
    'flush',
    'straight',
    'three_of_a_kind',
    'two_pair',
    'overpair',
    'top_pair',
    'pocket_pair_below_top_pair',
    'middle_pair',
    'weak_pair',
    'ace_high',
    'no_hand',
    'flush_draw',
    'nut_flush_draw',
    'backdoor_flush_draw',
    'backdoor_nut_flush_draw',
    'overcards'
];

module.exports = function(combos, do_on_each_item) {
    for (var i = 0; i < hand_order.length; i++) {
        if (combos[hand_order[i]]) {
            do_on_each_item(hand_order[i], combos[hand_order[i]]);
        }
    }
};

