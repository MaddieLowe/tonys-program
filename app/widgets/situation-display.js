var EventEmitter = require('events');
var fs = require('fs');
var card_icon = require('./card-icon');

module.exports = function(element, model) {
    var emitter = new EventEmitter();

    var template = fs.readFileSync(__dirname + '/../../views/widgets/situation-display.ejs', 'utf8');
    element.append($(template));

    var type_el = element.find('.type');
    type_el.text(model.type);

    var position_el = element.find('.position');
    position_el.text(model.position);

    var pot_el = element.find('.pot');
    pot_el.text(model.pot);

    var add_cards = function(el, cards) {
        cards.forEach(function(card) {
            var new_card = $('<div></div>');
            card_icon(new_card, card);
            el.append(new_card);
        });
    };
    var board_el = element.find('.board');
    add_cards(board_el, model.board);

    var hand_el = element.find('.hand');
    add_cards(hand_el, model.hand);

    return emitter;
};
