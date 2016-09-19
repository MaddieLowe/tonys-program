function card_collection(cards_collection) {
    var cards = JSON.parse(JSON.stringify(cards_collection));
    this.cards = [];

    for (var i = 0; i < cards.length; i++) {
        if (cards[i].type === "pair") {
            this.cards.push(cards[i].card1);
            this.cards.push(cards[i].card2);
        } else if(cards[i].type === "card") {
            this.cards.push(cards[i]);
        }
    }

    this.sort();
};

card_collection.prototype.sort = function() {
    this.cards.sort(function(a, b) {
        if (a.value < b.value) {
            return 1;
        } else if (a.value > b.value) {
            return -1;
        }
        return 0;
    });
};

card_collection.prototype.sort_by_suit = function() {
    var suit_enum = {
        C: 0,
        D: 1,
        S: 2,
        H: 3
    };
    var temp = [];
    for (var i = 0; i < this.cards.length; i++) {
        var index = suit_enum[this.cards[i].suit];
        if (!temp[index]) temp[index] = [];
        temp[index].push(this.cards[i]);
    }
    temp.sort(function(a, b) {
        if (a.length < b.length) {
            return 1;
        } else if (a.length > b.length) {
            return -1;
        }
        return 0;
    });

    var sorted_cards = [];
    for (var j = 0; j < temp.length; j++) {
        if (temp[j]) {
            sorted_cards = sorted_cards.concat(temp[j]);
        }
    }
    this.cards = sorted_cards;
};

card_collection.prototype.remove_pairs = function() {
    var uniq_cards = [];
    uniq_cards.push(this.cards[0]);
    for (var i = 1; i < this.cards.length; i++) {
        var cur_card = this.cards[i];
        var prev_card = this.cards[i - 1];
        if (cur_card.value !== prev_card.value) {
            uniq_cards.push(cur_card);
        }
    }

    this.cards = uniq_cards;
};

card_collection.prototype.remove_aces = function() {
    var non_aces = [];
    for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].value !== 14) {
            non_aces.push(this.cards[i]);
        }
    }

    this.cards = non_aces;
};

card_collection.prototype.is_empty = function() {
    return this.cards.length === 0;
};

module.exports = card_collection;
