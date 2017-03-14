var card_utils = require('../lib/card-utils');
var card = require('../lib/card');
var should = require('should');

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
        var old_random = Math.random;
        beforeEach(function() {
            var count = 0;
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
            var card = card_utils.get_random_card();
            card.name.should.eql("6C");
        });

        it ('should not return an invalid card', function() {
            var invalid_card = new card("6C");
            var c = card_utils.get_random_card([invalid_card]);
            c.name.should.not.eql("6C");
            c.name.should.eql("9H");
        });

        it ('should only return valid cards', function() {
            var invalid_card = new card("6C");
            var valid_card = new card("TS");
            var c = card_utils.get_random_card([invalid_card], [valid_card]);
            c.name.should.not.eql("6C");
            c.name.should.eql("TS");
        });
    });
});
