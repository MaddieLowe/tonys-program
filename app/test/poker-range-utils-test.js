let poker_range_utils = require('../lib/poker-range-utils');
const should = require('should');

describe('poker-range-utils', function() {
    describe('find_all_pairs', function() {
        it ('should find 6 pairs, and each card in a pair must have a different suit', function() {
            let pairs = poker_range_utils.find_all_pairs('A', 'A');
            pairs.length.should.eql(6);
            pairs[0].name.should.eql('ADAC');
            pairs[1].name.should.eql('AHAD');
            pairs[2].name.should.eql('ASAD');
            pairs[3].name.should.eql('AHAC');
            pairs[4].name.should.eql('ASAC');
            pairs[5].name.should.eql('ASAH');
        });
    });

    describe('find_all_suited', function() {
        it ('should find 4 pairs and each card in a pair must have the same suit', function() {
            let pairs = poker_range_utils.find_all_suited('A', 'K');
            pairs.length.should.eql(4);
            pairs[0].name.should.eql('ADKD');
            pairs[1].name.should.eql('ACKC');
            pairs[2].name.should.eql('AHKH');
            pairs[3].name.should.eql('ASKS');
        });
    });

    describe('find_all_offsuit', function() {
        it ('should find 12 pairs and each card in the pair must have a different suit', function() {
            let pairs = poker_range_utils.find_all_offsuit('A','K');
            pairs.length.should.eql(12);
            pairs[0].name.should.eql('ACKD');
            pairs[1].name.should.eql('AHKD');
            pairs[2].name.should.eql('ASKD');
            pairs[3].name.should.eql('ADKC');
            pairs[4].name.should.eql('AHKC');
            pairs[5].name.should.eql('ASKC');
            pairs[6].name.should.eql('ADKH');
            pairs[7].name.should.eql('ACKH');
            pairs[8].name.should.eql('ASKH');
            pairs[9].name.should.eql('ADKS');
            pairs[10].name.should.eql('ACKS');
            pairs[11].name.should.eql('AHKS');
        });
    });
});
