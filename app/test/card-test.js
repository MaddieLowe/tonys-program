let card = require('../lib/card');
const should = require('should');

describe('card', function() {
    it('should create a card with the correct value and suit regardless of case of name passed in', function() {
        let c1 = new card("AH");
        c1.value.should.eql(14);
        c1.suit.should.eql("H");

        let c2 = new card('ah');
        c2.value.should.eql(14);
        c2.suit.should.eql("H");

        let c3 = new card('3S');
        c3.value.should.eql(3);
        c3.suit.should.eql('S');

        let c4 = new card('Tc');
        c4.value.should.eql(10);
        c4.suit.should.eql('C');
    });

    it('value_to_string should return the right string', function() {
        let c = new card("AH");
        c.value_to_string().should.eql(c.name[0]);

        c = new card("3D");
        c.value_to_string().should.eql(c.name[0]);

        c = new card("TH");
        c.value_to_string().should.eql(c.name[0]);

        c = new card("JS");
        c.value_to_string().should.eql(c.name[0]);

        c = new card("QC");
        c.value_to_string().should.eql(c.name[0]);

        c = new card("KH");
        c.value_to_string().should.eql(c.name[0]);

        c = new card("9H");
        c.value_to_string().should.eql(c.name[0]);
    });
});
