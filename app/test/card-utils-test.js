let card_utils = require('../lib/card-utils');
let card = require('../lib/card');
let card_pair = require('../lib/card-pair');
const should = require('should');

describe('card-utils', function() {
    describe('card_from_value', function() {
        it ('should return the right strings', function() {
            card_utils.card_from_value(2).should.eql(2);
            card_utils.card_from_value(9).should.eql(9);
            card_utils.card_from_value(10).should.eql("T");
            card_utils.card_from_value(11).should.eql("J");
            card_utils.card_from_value(12).should.eql("Q");
            card_utils.card_from_value(13).should.eql("K");
            card_utils.card_from_value(14).should.eql("A");
        });
    });

    describe('get_random_card', function() {
        let old_random = Math.random;
        beforeEach(function() {
            let count = 0;
            Math.random = function() {
                count++;
                if (count === 1 ||
                    count === 2) {
                    return 0.3;
                }
                if (count === 3 ||
                    count === 4){
                    return 0.6;
                }
                if (count === 5 ||
                    count === 6) {
                    return 0.2;
                }
                return 0.1;
            };
        });

        after(function() {
            Math.random = old_random;
        });

        it ('should get a random card from the deck', function() {
            let card = card_utils.get_random_card();
            card.name.should.eql("6C");
        });

        it ('should not return an invalid card', function() {
            let invalid_card = new card("6C");
            let c = card_utils.get_random_card([invalid_card]);
            c.name.should.not.eql("6C");
            c.name.should.eql("9H");
        });

        it ('should only return valid cards', function() {
            let invalid_card = new card("6C");
            let valid_card = new card("TS");
            let c = card_utils.get_random_card([invalid_card], [valid_card]);
            c.name.should.not.eql("6C");
            c.name.should.eql("TS");
        });
    });

    describe('get_random_card_pair', function() {
        let old_random = Math.random;
        beforeEach(function() {
            let count = 0;
            Math.random = function() {
                count++;
                if (count === 1 ||
                    count === 2) {
                    return 0.3;
                }
                if (count === 3 ||
                    count === 4){
                    return 0.6;
                }
                if (count === 5 ||
                    count === 6) {
                    return 0.2;
                }
                return 0.1;
            };
        });

        after(function() {
            Math.random = old_random;
        });

        it ('should return a pair in the range of valid pairs', function() {
            let range = [
                new card_pair("AC","AS"),
                new card_pair("TD","9H")
            ];
            let pair = card_utils.get_random_card_pair([], range);
            pair.card1.name.should.eql("AS");
            pair.card2.name.should.eql("AC");
        });

        it ('should not return a card that is in the invalid cards list', function() {
            let range = [
                new card_pair("AC","AS"),
                new card_pair("TD","9H")
            ];
            let invalid_cards = [new card("AC")];
            let pair = card_utils.get_random_card_pair(invalid_cards, range);
            pair.card1.name.should.not.eql("AS");
            pair.card2.name.should.not.eql("AC");
            pair.card1.name.should.eql("TD");
            pair.card2.name.should.eql("9H");
        });
    });
});
