var card = require('../lib/card');
var should = require('should');

describe('card', function() {
    it('should create a card with the correct value and suit regardless of case of name passed in', function() {
        var c1 = new card("AH");
        c1.value.should.eql(1);
        c1.suit.should.eql("h");

        var c2 = new card('ah');
        c2.value.should.eql(1);
        c2.suit.should.eql("h");

        var c3 = new card('3S');
        c3.value.should.eql(3);
        c3.suit.should.eql('s');

        var c4 = new card('Tc');
        c4.value.should.eql(10);
        c4.suit.should.eql('c');
    });
});
