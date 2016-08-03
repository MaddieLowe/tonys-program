var card = require('./card');

function card_pair(card1, card2) {
    // Maybe want to make card 1 the highest in here
    var card_a = new card(card1);
    var card_b = new card(card2);
    if (card_a.value > card_b.value) {
        this.card1 = card_a;
        this.card2 = card_b;
    } else if (card_a.value < card_b.value) {
        this.card1 = card_b;
        this.card2 = card_a;
    } else if (card_a.suit > card_b.suit) {
        this.card1 = card_a;
        this.card2 = card_b;
    } else {
        this.card1 = card_b;
        this.card2 = card_a;
    }

    this.name = this.card1.name + this.card2.name;
}

module.exports = card_pair;
