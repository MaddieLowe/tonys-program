// Expecting the format Ah, 2c, etc
function card(name) {
    this.name = name.toUpperCase();

    switch(name[0].toLowerCase()) {
    case 'a':
        this.value = 14;
        break;
    case 't':
        this.value = 10;
        break;
    case 'j':
        this.value = 11;
        break;
    case 'q':
        this.value = 12;
        break;
    case 'k':
        this.value = 13;
        break;
    default:
        this.value = parseInt(name[0], 10);
    }

    this.suit = name[1].toUpperCase();
    this.type = "card";
}

card.prototype.value_to_string = function() {
    var ret;
    switch(this.value) {
    case 14:
        ret = "A";
        break;
    case 10:
        ret = "T";
        break;
    case 11:
        ret = "J";
        break;
    case 12:
        ret = "Q";
        break;
    case 13:
        ret = "K";
        break;
    default:
        ret = "" + this.value;
    }

    return ret;
};

module.exports = card;
