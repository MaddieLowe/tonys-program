var poker_range_utils = require('../lib/poker-range-utils');

describe('poker-range-utils', function() {
    describe('find_all_pairs', function() {
        it ('should find all the right pairs', function() {
            var pairs = poker_range_utils.find_all_pairs('A', 'A');
            pairs[0].name.should.eql('AsAh');
            pairs[1].name.should.eql('AhAc');
            pairs[2].name.should.eql('AdAc');
            pairs[3].name.should.eql('AsAc');
            pairs[4].name.should.eql('AhAd');
            pairs[5].name.should.eql('AsAd');
        });
    });
});
