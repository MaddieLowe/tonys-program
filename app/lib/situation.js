var get_random_card = require('./card-utils').get_random_card;
var pairs_array_to_card_array = require('./card-utils').pairs_array_to_card_array;

function situation(config) {
    let board_size = config.board_size || 3;
    this.type = config.type;
    this.position = config.position;
    this.positions = config.positions;
    this.pot = config.pot;

    if (config.hand_range) {
        this.hand_range = pairs_array_to_card_array(JSON.parse(config.hand_range));
    }

    this.board = [];
    for (let i = 0; i < board_size; i++) {
        this.board[i] = get_random_card(this.board);
    }

    this.hand = [];
    for (let i = 0; i < 2; i++) {
        this.hand[i] = get_random_card(this.board.concat(this.hand), this.hand_range);
    }
}

module.exports = situation;
