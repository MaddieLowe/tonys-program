var card = require('./card');

function card_pair(card1, card2) {
    // Maybe want to make card 1 the highest in here
    this.card1 = new card(card1);
    this.card2 = new card(card2);
}

module.exports = card_pair;
