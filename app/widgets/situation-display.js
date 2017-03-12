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

    var bet_input_el = element.find('.bet input');
    var pots = {
        quarter: {
            el: element.find('.button.quarter'),
            scale: 0.25
        },
        half: {
            el: element.find('.button.half'),
            scale: 0.5
        },
        whole: {
            el: element.find('.button.whole'),
            scale: 1
        }
    };
    var update_bet_display = function() {
        bet_input_el.val(model.amount);
    };
    update_bet_display();
    for (let p in pots) {
        let pot = pots[p];
        // TODO: teardown
        pot.el.on('click', function($event) {
            model.set_bet_amount(model.pot * pot.scale);
            update_bet_display();
            emitter.emit('change');
        });
    }

    // TODO: teardown
    bet_input_el.on('change', function() {
        model.set_bet_amount(bet_input_el.val());
        update_bet_display();
        emitter.emit('change');
    });

    ['bets','checks','folds'].forEach(function(action) {
        let action_el = element.find('.button.' + action);
        action_el.on('click', function() {
            model.set_action(action);
            element.find('.button').removeClass('selected');
            action_el.addClass('selected');
            emitter.emit('change');
        });
    });

    return emitter;
};
