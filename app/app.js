var poker_range_selector = require('./widgets/poker-range-selector');

$(document).ready(function() {
    var element = $('poker-range');
    var emitter = poker_range_selector(element);
});
