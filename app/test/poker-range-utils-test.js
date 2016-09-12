var poker_range_utils = require('../lib/poker-range-utils');

describe('poker-range-utils', function() {
    describe('find_all_pairs', function() {
        it ('should find 6 pairs, and each card in a pair must have a different suit', function() {
            var pairs = poker_range_utils.find_all_pairs('A', 'A');
            pairs.length.should.eql(6);
            pairs[0].name.should.eql('AdAc');
            pairs[1].name.should.eql('AhAd');
            pairs[2].name.should.eql('AsAd');
            pairs[3].name.should.eql('AhAc');
            pairs[4].name.should.eql('AsAc');
            pairs[5].name.should.eql('AsAh');
        });
    });

    describe('find_all_suited', function() {
        it ('should find 4 pairs and each card in a pair must have the same suit', function() {
            var pairs = poker_range_utils.find_all_suited('A', 'K');
            pairs.length.should.eql(4);
            pairs[0].name.should.eql('AdKd');
            pairs[1].name.should.eql('AcKc');
            pairs[2].name.should.eql('AhKh');
            pairs[3].name.should.eql('AsKs');
        });
    });

    describe('find_all_offsuit', function() {
        it ('should find 12 pairs and each card in the pair must have a different suit', function() {
            var pairs = poker_range_utils.find_all_offsuit('A','K');
            pairs.length.should.eql(12);
            pairs[0].name.should.eql('AcKd');
            pairs[1].name.should.eql('AhKd');
            pairs[2].name.should.eql('AsKd');
            pairs[3].name.should.eql('AdKc');
            pairs[4].name.should.eql('AhKc');
            pairs[5].name.should.eql('AsKc');
            pairs[6].name.should.eql('AdKh');
            pairs[7].name.should.eql('AcKh');
            pairs[8].name.should.eql('AsKh');
            pairs[9].name.should.eql('AdKs');
            pairs[10].name.should.eql('AcKs');
            pairs[11].name.should.eql('AhKs');
        });
    });
});
