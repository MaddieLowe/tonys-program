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
});
