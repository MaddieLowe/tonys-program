var rank_hands = require('../lib/rank-hands');
var card = require('../lib/card');
var card_pair = require('../lib/card-pair');
var card_collection = require('../lib/card-collection');
var should = require('should');

describe('rank-hands', function() {
    describe('broadway', function() {
        it ('should identify AKQJT as a broadway', function() {
            var a = new card('AS');
            var k = new card('Kc');
            var j = new card('jd');
            var t = new card('ts');
            var t2 = new card('td');
            var pair = new card('qd', 'qs');

            var is_broadway = rank_hands.broadway(pair, [a, k, j, t, t2]);

            is_broadway.should.equal(true);
        });

        it ('should identify AQJT9 as not a broadway', function() {
            var a = new card('AS');
            var nine = new card('9c');
            var j = new card('jd');
            var t = new card('ts');
            var t2 = new card('td');
            var pair = new card('qd', 'qs');

            var is_broadway = rank_hands.broadway(pair, [a, nine, j, t, t2]);

            is_broadway.should.equal(false);
        });
    });

    describe('wheel', function() {
        it ('should identify A2345 as a wheel', function() {
            var a = new card('ah');
            var two = new card('2d');
            var four = new card('4c');
            var four2 = new card('4d');
            var five = new card('5d');
            var pair = new card('3d', '5c');

            var is_wheel = rank_hands.wheel(pair, [a, five, two, four, four2]);

            is_wheel.should.equal(true);
        });

        it ('should not identify AQJT9 as a wheel', function() {
            var a = new card('AS');
            var nine = new card('9c');
            var j = new card('jd');
            var t = new card('ts');
            var t2 = new card('td');
            var pair = new card('qd', 'qs');

            var is_wheel = rank_hands.wheel(pair, [a, nine, j, t, t2]);

            is_wheel.should.equal(false);
        });
    });

    describe('open_ended_straight_counter', function() {
        it ('should count the number of cards in the straight', function() {
            var cards = [
                new card('ah'),
                new card('qd'),
                new card('8c'),
                new card('7d'),
                new card('6c'),
                new card('2d')
            ];
            var pair = new card_pair('5d', '2h');

            var length = rank_hands.open_ended_straight_counter(pair, cards);

            length.should.eql(4);
        });
    });

    describe('straight', function() {
        it ('should correctly identify 65432 as a straight', function() {
            var board = [
                new card('6h'),
                new card('4d'),
                new card('2s'),
                new card('2c'),
                new card('4c')
            ];
            var pair = new card_pair('5d', '3c');

            var is_straight = rank_hands.straight(pair, board);

            is_straight.should.equal(true);
        });

        it ('should not identify 6543 as a straight', function() {
            var board = [
                new card('6h'),
                new card('4d'),
                new card('4c')
            ];
            var pair = new card_pair('5d', '3c');

            var is_straight = rank_hands.straight(pair, board);

            is_straight.should.equal(false);
        });
    });

    describe('matching_suits', function() {
        it ('should determine the max number of cards with matching suits', function() {
            var board = [
                new card('ah'),
                new card('th'),
                new card('2h'),
                new card('4d'),
                new card('5d')
            ];
            var pair = new card_pair('2c', '3c');

            var matching_suits = rank_hands.matching_suits(pair, board);

            matching_suits.should.eql(3);
        });
    });

    describe('flush', function() {
        it ('should return true if there are at least 5 cards with matching suits', function() {
            var board = [
                new card('ah'),
                new card('th'),
                new card('2h'),
                new card('4H'),
                new card('5H')
            ];
            var pair = new card_pair('2c', '3c');

            var flush = rank_hands.flush(pair, board);

            flush.should.equal(true);
        });

        it ('should return false if there are not 5 cards with matching suits', function() {
            var board = [
                new card('ah'),
                new card('th'),
                new card('2h'),
                new card('4H')
            ];
            var pair = new card_pair('2c', '3c');

            var flush = rank_hands.flush(pair, board);

            flush.should.equal(false);
        });
    });

    describe('straight_flush', function() {
        it ('should rank 6h, 5h, 4h, 5h, 2h as a straight flush', function() {
            var board = [
                new card('6h'),
                new card('5h'),
                new card('4h'),
                new card('3h'),
                new card('2h')
            ];
            var pair = new card_pair('5d', '3c');

            var is_straight_flush = rank_hands.straight_flush(pair, board);

            is_straight_flush.should.equal(true);
        });

        it ('should not rank 6h, 5d, 4h, 5h, 2h as a straight flush', function() {
            var board = [
                new card('6h'),
                new card('5c'),
                new card('4h'),
                new card('3h'),
                new card('2h')
            ];
            var pair = new card_pair('5d', '3c');

            var is_straight_flush = rank_hands.straight_flush(pair, board);

            is_straight_flush.should.equal(false);
        });
    });

    describe('quads', function() {
        it ('should identify 3d, 3c, 3h, 3s as a quad', function() {
            var board = [
                new card('3d'),
                new card('3s'),
                new card('5d'),
                new card('6s')
            ];
            var pair = new card_pair('3c','3h');

            var is_quads = rank_hands.quads(pair, board);

            is_quads.should.equal(true);
        });

        it ('should not identify 3d, 3h, 3s as a quad', function() {
            var board = [
                new card('3d'),
                new card('5d'),
                new card('6s')
            ];
            var pair = new card_pair('3c','3h');

            var is_quads = rank_hands.quads(pair, board);

            is_quads.should.equal(false);
        });
    });

    describe('three_of_a_kind', function() {
        it ('should identify 3d, 3c, 3h, as three of a kind', function() {
            var board = [
                new card('3d'),
                new card('5d'),
                new card('6s')
            ];
            var pair = new card_pair('3c','3h');

            var is_three_of_a_kind = rank_hands.three_of_a_kind(pair, board);

            is_three_of_a_kind.should.equal(true);
        });

        it ('should not identify 3c, 3h as three of a kind', function() {
            var board = [
                new card('5d'),
                new card('6s')
            ];
            var pair = new card_pair('3c','3h');

            var is_three_of_a_kind = rank_hands.three_of_a_kind(pair, board);

            is_three_of_a_kind.should.equal(false);
        });
    });

    describe('rank_of_highest_pair', function() {
        it ('should return 2 for hand 5c, 5d, 5h, 2c, 2d', function() {
            var board = [
                new card('5c'),
                new card('5d'),
                new card('5h')
            ];
            var pair = new card_pair('2c', '2d');

            var rank = rank_hands.rank_of_highest_pair(pair, board);

            rank.should.eql(2);
        });

        it ('should return 3 for hand 5c, 5d, 5h, 3h, 3d,  2c, 2d', function() {
            var board = [
                new card('5c'),
                new card('5d'),
                new card('3h'),
                new card('3d'),
                new card('5h')
            ];
            var pair = new card_pair('2c', '2d');

            var rank = rank_hands.rank_of_highest_pair(pair, board);

            rank.should.eql(3);
        });

        it ('should return 0 for hand 5c, 5d, 5h, 2d', function() {
            var board = [
                new card('5c'),
                new card('5d')
            ];
            var pair = new card_pair('5H', '2d');

            var rank = rank_hands.rank_of_highest_pair(pair, board);

            rank.should.eql(0);
        });
    });

    describe('full_house', function() {
        it ('should identify 33322 as a full house', function() {
            var board = [
                new card('3d'),
                new card('3c'),
                new card('3s')
            ];
            var pair = new card_pair('2d', '2c');

            var is_full_house = rank_hands.full_house(pair, board);

            is_full_house.should.equal(true);
        });

        it ('should not identify 3322 as a full house', function() {
            var board = [
                new card('3d'),
                new card('3s')
            ];
            var pair = new card_pair('2d', '2c');

            var is_full_house = rank_hands.full_house(pair, board);

            is_full_house.should.equal(false);
        });
    });

    describe('two_pair', function() {
        it ('should rank 2244 as two pair', function() {
            var board = [
                new card('2c'),
                new card('2d'),
                new card('5c')
            ];
            var pair = new card_pair('4d', '4c');

            var is_two_pair = rank_hands.two_pair(pair, board);

            is_two_pair.should.equal(true);
        });

        it ('should not rank 4444 as two pair', function() {
            var board = [
                new card('4h'),
                new card('4s'),
                new card('5c')
            ];
            var pair = new card_pair('4d', '4c');

            var is_two_pair = rank_hands.two_pair(pair, board);

            is_two_pair.should.equal(false);
        });
    });

    describe('overpair', function() {
        it ('should rank AA in your hand and TQJ in the board as an overpair', function() {
            var board = [
                new card('TH'),
                new card('Qd'),
                new card('Js')
            ];
            var pair = new card_pair('Ah', 'As');

            var is_overpair = rank_hands.overpair(pair, board);

            is_overpair.should.equal(true);
        });

        it ('should not rank TQ in your hand and AAJ in the board as an overpair', function() {
            var board = [
                new card('AH'),
                new card('Ad'),
                new card('Js')
            ];
            var pair = new card_pair('Th', 'Qs');

            var is_overpair = rank_hands.overpair(pair, board);

            is_overpair.should.equal(false);
        });
    });

    describe('top_pair', function() {
        it ('should rank AQ in the hand and QT9 in the board as a top pair', function() {
            var board = [
                new card('Qs'),
                new card('Td'),
                new card('9d')
            ];
            var pair = new card_pair('Qd', 'Ad');

            var is_top_pair = rank_hands.top_pair(pair, board);

            is_top_pair.should.equal(true);
        });

        it ('should not rank AT in the hand and QT9 in the board as a top pair', function() {
            var board = [
                new card('Qs'),
                new card('Td'),
                new card('9d')
            ];
            var pair = new card_pair('Ts', 'Ad');

            var is_top_pair = rank_hands.top_pair(pair, board);

            is_top_pair.should.equal(false);
        });
    });

    describe('pocket_pair_below_top_pair', function() {
        it ('should rank 77 in the hand and Q65 in the board as a pocket pair below top pair', function() {
            var board = [
                new card('QS'),
                new card('6H'),
                new card('5D')
            ];
            var pair = new card_pair('7h', '7s');

            var is_pocket_pair = rank_hands.pocket_pair_below_top_pair(pair, board);

            is_pocket_pair.should.equal(true);
        });

        it ('should not rank 77 in the hand and Q85 in the board as a pocket pair below top pair', function() {
            var board = [
                new card('QS'),
                new card('8H'),
                new card('5D')
            ];
            var pair = new card_pair('7h', '7s');

            var is_pocket_pair = rank_hands.pocket_pair_below_top_pair(pair, board);

            is_pocket_pair.should.equal(false);
        });
    });

    describe('middle_pair', function() {
        it ('should rank 82 in the hand and Q85 in the board as a middle pair', function() {
            var board = [
                new card('QS'),
                new card('8H'),
                new card('5D')
            ];
            var pair = new card_pair('2h', '8s');

            var middle_pair = rank_hands.middle_pair(pair, board);

            middle_pair.should.equal(true);
        });

        it ('should not rank 77 in the hand and Q85 in the board as a middle pair', function() {
            var board = [
                new card('QS'),
                new card('8H'),
                new card('5D')
            ];
            var pair = new card_pair('7h', '7s');

            var middle_pair = rank_hands.middle_pair(pair, board);

            middle_pair.should.equal(false);
        });

        it ('should not rank AK in the hand and 33T in the board as a middle pair', function() {
            var board = [
                new card('3h'),
                new card('3c'),
                new card('ts')
            ];
            var pair = new card_pair('ad', 'kc');

            var middle_pair = rank_hands.middle_pair(pair, board);

            middle_pair.should.equal(false);
        });
    });

    describe('weak_pair', function() {
        it ('should rank 59 in the hand and Q85 in the board as a weak pair', function() {
            var board = [
                new card('QS'),
                new card('8H'),
                new card('5D')
            ];
            var pair = new card_pair('9h', '5s');

            var weak_pair = rank_hands.weak_pair(pair, board);

            weak_pair.should.equal(true);
        });

        it ('should rank 33 in the hand and Q85 in the board as a weak pair', function() {
            var board = [
                new card('QS'),
                new card('8H'),
                new card('5D')
            ];
            var pair = new card_pair('3h', '3s');

            var weak_pair = rank_hands.weak_pair(pair, board);

            weak_pair.should.equal(true);
        });

        it ('should rank 77 in the hand and Q85 in the board as a weak pair', function() {
            var board = [
                new card('QS'),
                new card('8H'),
                new card('5D')
            ];
            var pair = new card_pair('7h', '7s');

            var weak_pair = rank_hands.weak_pair(pair, board);

            weak_pair.should.equal(true);
        })

        it ('should not rank 87 in the hand and Q85 in the board as a weak pair', function() {
            var board = [
                new card('QS'),
                new card('8H'),
                new card('5D')
            ];
            var pair = new card_pair('8h', '7s');

            var weak_pair = rank_hands.weak_pair(pair, board);

            weak_pair.should.equal(false);
        });
    });

    describe('ace_high', function() {
        it ('should rank A2 in the hand and 753 in the board as an ace high', function() {
            var board = [
                new card('7s'),
                new card('5d'),
                new card('3s')
            ];
            var pair = new card_pair('Ah', '2d');

            var is_ace_high = rank_hands.ace_high(pair, board);

            is_ace_high.should.eql(true);
        });

        it ('should not rank 42 in the hand and 753 in the board as an ace high', function() {
            var board = [
                new card('7s'),
                new card('5d'),
                new card('3s')
            ];
            var pair = new card_pair('4h', '2d');

            var is_ace_high = rank_hands.ace_high(pair, board);

            is_ace_high.should.eql(false);
        });
    });

    describe('flush_suit', function() {
        it ('should return C as the flush suit in AC, 2C, 3C, 4D, 5S', function() {
            var board = [
                new card('ac'),
                new card('2c'),
                new card('3c')
            ];
            var pair = new card_pair('4d', '5s');

            var flush_suit = rank_hands.flush_suit(pair, board);

            flush_suit.should.eql("C");
        });
    });

    describe('flush_draw', function() {
        it ('should rank AC, 5D in your hand and 2C, 3C, 9C in the board as a flush draw', function() {
            var board = [
                new card('2c'),
                new card('3c'),
                new card('9c')
            ];
            var pair = new card_pair('ac', '5d');

            var is_flush_draw = rank_hands.flush_draw(pair, board);

            is_flush_draw.should.eql(true);
        });

        it ('should rank AC, 5C in your hand and 2C, 3C, 9D in the board as a flush draw', function() {
            var board = [
                new card('2c'),
                new card('3c'),
                new card('9d')
            ];
            var pair = new card_pair('ac', '5c');

            var is_flush_draw = rank_hands.flush_draw(pair, board);

            is_flush_draw.should.eql(true);
        });

        it ('should not rank AC, 5C in your hand and 2C, 3C, 9C in the board as a flush draw', function() {
            var board = [
                new card('2c'),
                new card('3c'),
                new card('9c')
            ];
            var pair = new card_pair('ac', '5c');

            var is_flush_draw = rank_hands.flush_draw(pair, board);

            is_flush_draw.should.eql(false);
        });
    });

    describe('nut_flush_card', function() {
        it ('should return 14 if you have 9s, 5s, 2s in the board', function() {
            var board = [
                new card('9s'),
                new card('5s'),
                new card('2s')
            ];

            var nut_flush_card = rank_hands.nut_flush_card(board, 'S');

            nut_flush_card.should.eql(14);
        });

        it ('should return 12 if you have As, Qs, 5s, 2s in the board', function() {
            var board = [
                new card('As'),
                new card('Ks'),
                new card('5s'),
                new card('2s')
            ];

            var nut_flush_card = rank_hands.nut_flush_card(board, 'S');

            nut_flush_card.should.eql(12);
        });
    });

    describe('nut_flush_draw', function() {
        it ('should rank As in the hand and 9s, 5s, 2s in the board as a nut flush draw', function() {
            var board = [
                new card('9s'),
                new card('5s'),
                new card('2s'),
                new card('3d')
            ];
            var pair = new card_pair('As', '7h');

            var is_nut_flush_draw = rank_hands.nut_flush_draw(pair, board);

            is_nut_flush_draw.should.equal(true);
        });

        it ('should rank Ks in the hand and As, 5s, 2s in the board as a nut flush draw', function() {
            var board = [
                new card('As'),
                new card('5s'),
                new card('2s'),
                new card('3d')
            ];
            var pair = new card_pair('Ks', '7h');

            var is_nut_flush_draw = rank_hands.nut_flush_draw(pair, board);

            is_nut_flush_draw.should.equal(true);
        });

        it ('should not rank Qs in the hand and As, 5s, 2s in the board as a nut flush draw', function() {
            var board = [
                new card('As'),
                new card('5s'),
                new card('2s'),
                new card('3d')
            ];
            var pair = new card_pair('Qs', '7h');

            var is_nut_flush_draw = rank_hands.nut_flush_draw(pair, board);

            is_nut_flush_draw.should.equal(false);
        });
    });

    describe('backdoor_flush_draw', function() {
        it ('should rank AC, 5D in your hand and 2C, 3C, 9h in the board as a backdoor flush draw', function() {
            var board = [
                new card('2c'),
                new card('3c'),
                new card('9h')
            ];
            var pair = new card_pair('ac', '5d');

            var is_backdoor_flush_draw = rank_hands.backdoor_flush_draw(pair, board);

            is_backdoor_flush_draw.should.eql(true);
        });

        it ('should rank AC, 5C in your hand and 2C, 3h, 9D in the board as a backdoor flush draw', function() {
            var board = [
                new card('2c'),
                new card('3h'),
                new card('9d')
            ];
            var pair = new card_pair('ac', '5c');

            var is_backdoor_flush_draw = rank_hands.backdoor_flush_draw(pair, board);

            is_backdoor_flush_draw.should.eql(true);
        });

        it ('should not rank AC, 5C in your hand and 2C, 3C, 9h in the board as backdoor flush draw', function() {
            var board = [
                new card('2c'),
                new card('3c'),
                new card('9h')
            ];
            var pair = new card_pair('ac', '5c');

            var is_backdoor_flush_draw = rank_hands.backdoor_flush_draw(pair, board);

            is_backdoor_flush_draw.should.eql(false);
        });
    });

    describe('backdoor_nut_flush_draw', function() {
        it ('should rank As in the hand and 9s, 5s, 2d in the board as a backdoor nut flush draw', function() {
            var board = [
                new card('9s'),
                new card('5s'),
                new card('2d'),
                new card('3d')
            ];
            var pair = new card_pair('As', '7h');

            var is_backdoor_nut_flush_draw = rank_hands.backdoor_nut_flush_draw(pair, board);

            is_backdoor_nut_flush_draw.should.equal(true);
        });

        it ('should rank Ks in the hand and As, 5s, 2d in the board as a backdoor nut flush draw', function() {
            var board = [
                new card('As'),
                new card('5s'),
                new card('2d'),
                new card('3d')
            ];
            var pair = new card_pair('Ks', '7h');

            var is_backdoor_nut_flush_draw = rank_hands.backdoor_nut_flush_draw(pair, board);

            is_backdoor_nut_flush_draw.should.equal(true);
        });

        it ('should not rank Qs in the hand and As, 5s, 2d in the board as backdoor nut flush draw', function() {
            var board = [
                new card('As'),
                new card('5s'),
                new card('2d'),
                new card('3d')
            ];
            var pair = new card_pair('Qs', '7h');

            var is_backdoor_nut_flush_draw = rank_hands.backdoor_nut_flush_draw(pair, board);

            is_backdoor_nut_flush_draw.should.equal(false);
        });
    });

    describe('overcards', function() {
        it ('should rank AQ in your hand and J95 in the board as overcards', function() {
            var board = [
                new card('js'),
                new card('9d'),
                new card('5h')
            ];
            var pair = new card_pair('As', 'Qd');

            var is_overcards = rank_hands.overcards(pair, board);

            is_overcards.should.equal(true);
        });

        it ('should not rank AJ in your hand and Q95 in the board as overcards', function() {
            var board = [
                new card('Qs'),
                new card('9d'),
                new card('5h')
            ];
            var pair = new card_pair('As', 'Jd');

            var is_overcards = rank_hands.overcards(pair, board);

            is_overcards.should.equal(false);
        });

        it ('should not count AA in your hand and K65 in the board as overcards', function() {
            var board = [
                new card('ks'),
                new card('6d'),
                new card('5h')
            ];
            var pair = new card_pair('As', 'Ad');

            var is_overcards = rank_hands.overcards(pair, board);

            is_overcards.should.equal(false);
        });
    });
});
