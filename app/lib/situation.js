let get_random_card = require('./card-utils').get_random_card;
let get_random_card_pair = require('./card-utils').get_random_card_pair;
let get_random_position = require('./card-utils').get_random_position;

function situation(config, board) {
    let board_size = config.board_size || 3;
    this.type = config.type;
    this.positions = Object.keys(config.export_templates);
    this.position = get_random_position(this.positions);
    this.pot = config.pot;
    this.amount = Number(0).toFixed(2);
    this.export_templates = config.export_templates;
    this.board = board || [];

    if (config.hand_range) {
        this.hand_ranges_by_position = {};
        for (let pos in config.hand_range) {
            this.hand_ranges_by_position[pos] = JSON.parse(config.hand_range[pos]);
        }
    }

    if (this.board.length === 0) {
        for (let i = 0; i < board_size; i++) {
            this.board[i] = get_random_card(this.board);
        }
    }

    this.update_hand();
    this.update_available_actions();
}

situation.prototype.update_hand = function() {
    if (this.hand_ranges_by_position) {
        this.hand_range = this.hand_ranges_by_position[this.position];
    }

    this.hand = [];
    let pair = get_random_card_pair(this.board.concat(this.hand), this.hand_range);
    this.hand[0] = pair.card1;
    this.hand[1] = pair.card2;
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
    this.update_available_actions();
};

situation.prototype.update_available_actions = function() {
    this.available_actions = Object.keys(this.export_templates[this.position]);
};

situation.prototype.create_export_data = function(hand_id) {
    let template = this.export_templates[this.position][this.action];
    if (!template) {
        console.error('no template');
        console.error(this);
        return "Error: no template for this position " + this.position +
            " and action " + this.action;
    }

    let format_card = function(card) {
        return card.name[0] + card.name[1].toLowerCase();
    };

    let replace_all = function(str1, str2) {
        template = template.split(str1).join(str2);
    };

    let id = hand_id || Date.now();
    id = String(id).replace(".","");
    id = id.substring(0, 14);
    replace_all('<HAND_ID>', id);

    let hole_cards = format_card(this.hand[0]) + ' ' + format_card(this.hand[1]);
    replace_all('<HOLE_CARDS>', hole_cards);

    let flop = format_card(this.board[0]) + ' ' +
            format_card(this.board[1]) + ' ' +
            format_card(this.board[2]);
    replace_all('<FLOP>', flop);

    let turn = get_random_card(this.board.concat(this.hand));
    turn = format_card(turn);
    replace_all('<TURN>', turn);

    let board = flop + " " + turn;
    replace_all('<BOARD>', board);

    if (this.action === 'bets') {
        replace_all('<BET>', this.amount);
    }

    return template;
};

module.exports = situation;
