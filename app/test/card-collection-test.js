var card_collection = require('../lib/card-collection');
var card = require('../lib/card');
var card_pair = require('../lib/card-pair');
var should = require('should');

describe('card-collection', function() {
    it ('should sort the cards when it\'s created', function() {
        var c1 = new card('AH');
        var c2 = new card('2d');
        var c3 = new card('ts');
        var cp1 = new card_pair('Js', 'ks');

        var cc = new card_collection([c1, c2, c3, cp1]);

        cc.cards[0].name.should.eql("AH");
        cc.cards[1].name.should.eql("KS");
        cc.cards[2].name.should.eql("JS");
        cc.cards[3].name.should.eql("TS");
        cc.cards[4].name.should.eql("2D");
    });

    describe('remove_pairs', function() {
        it ('should remove duplicate cards', function() {
            var c1 = new card('4h');
            var c2 = new card('4s');
            var c3 = new card('qd');
            var c4 = new card('qs');
            var c5 = new card('qc');

            var cc = new card_collection([c1, c2, c3, c4, c5]);
            cc.remove_pairs();

            cc.cards.length.should.eql(2);
            cc.cards[0].value.should.eql(12);
            cc.cards[1].value.should.eql(4);
        });
    });

    describe('remove_aces', function() {
        it ('should remove aces', function() {
            var c1 = new card('ad');
            var c2 = new card('ac');
            var c3 = new card('2d');
            var c4 = new card('5s');

            var cc = new card_collection([c1, c2, c3, c4]);
            cc.remove_aces();

            cc.cards[0].name.should.eql("5S");
            cc.cards[1].name.should.eql("2D");
        });
    });

    describe('sort_by_suit', function() {
        it ('should order the cards by suit', function() {
            var c1 = new card('AH');
            var c2 = new card('2d');
            var c3 = new card('ts');
            var c4 = new card('4c');
            var cp1 = new card_pair('Js', 'ks');

            var cc = new card_collection([c1, c2, c3, cp1, c4]);
            cc.sort_by_suit();

            cc.cards[0].name.should.eql("KS");
            cc.cards[1].name.should.eql("JS");
            cc.cards[2].name.should.eql("TS");
            cc.cards[3].name.should.eql("4C");
            cc.cards[4].name.should.eql("2D");
            cc.cards[5].name.should.eql("AH");
        });
    });
});
