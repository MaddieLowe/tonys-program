var get_random_card = require('./card-utils').get_random_card;

function situation(config) {
    let board_size = config.board_size || 3;
    this.type = config.type;
    this.position = config.position;
    this.pot = config.pot;

    this.board = [];
    for (let i = 0; i < board_size; i++) {
        this.board[i] = get_random_card(this.board);
    }

    this.hand = [];
    for (let i = 0; i < 2; i++) {
        this.hand[i] = get_random_card(this.board.concat(this.hand));
    }
}

module.exports = situation;
