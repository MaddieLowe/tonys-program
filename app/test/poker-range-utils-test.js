var poker_range_utils = require('../lib/poker-range-utils');

describe('poker-range-utils', function() {
    describe('find_all_pairs', function() {
        it ('should find 6 pairs, and each card in a pair must have a different suit', function() {
            var pairs = poker_range_utils.find_all_pairs('A', 'A');
            pairs[0].name.should.eql('AsAh');
            pairs[1].name.should.eql('AhAc');
            pairs[2].name.should.eql('AdAc');
            pairs[3].name.should.eql('AsAc');
            pairs[4].name.should.eql('AhAd');
            pairs[5].name.should.eql('AsAd');
        });
    });

    describe('find_all_suited', function() {
        it ('should find 4 pairs and each card in a pair must have the same suit', function() {
            var pairs = poker_range_utils.find_all_suited('A', 'K');
            pairs[0].name.should.eql('AhKh');
            pairs[1].name.should.eql('AcKc');
            pairs[2].name.should.eql('AdKd');
            pairs[3].name.should.eql('AsKs');
        });
    });
});
