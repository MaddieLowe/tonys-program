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
});
