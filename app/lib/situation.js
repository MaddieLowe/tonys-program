var get_random_card = require('./card-utils').get_random_card;
var pairs_array_to_card_array = require('./card-utils').pairs_array_to_card_array;

function situation(config, position) {
    let board_size = config.board_size || 3;
    this.type = config.type;
    this.position = position;
    this.positions = config.positions;
    this.pot = config.pot;
    this.amount = Number(0).toFixed(2);

    if (config.hand_range) {
        this.hand_ranges_by_position = {};
        for (var pos in config.hand_range) {
            this.hand_ranges_by_position[pos] = pairs_array_to_card_array(JSON.parse(config.hand_range[pos]));
        }
    }

    this.board = [];
    for (let i = 0; i < board_size; i++) {
        this.board[i] = get_random_card(this.board);
    }

    this.update_hand();
}

situation.prototype.update_hand = function() {
    if (this.hand_ranges_by_position) {
        this.hand_range = this.hand_ranges_by_position[this.position];
    }

    this.hand = [];
    for (let i = 0; i < 2; i++) {
        this.hand[i] = get_random_card(this.board.concat(this.hand), this.hand_range);
    }
};

situation.prototype.set_bet_amount = function(amount) {
    this.amount = Number(amount).toFixed(2);
};

situation.prototype.set_action = function(action) {
    this.action = action;
};

situation.prototype.set_position = function(position) {
    this.position = position;
    this.update_hand();
};

module.exports = situation;
