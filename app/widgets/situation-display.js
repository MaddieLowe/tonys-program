let EventEmitter = require('events');
let fs = require('fs');
let card_icon = require('./card-icon');
let card_selector = require('./card-selector');

module.exports = function(element, model) {
    let emitter = new EventEmitter();

    let template = fs.readFileSync(__dirname + '/../../views/widgets/situation-display.ejs', 'utf8');
    element.append($(template));

    let type_el = element.find('.type');
    type_el.text(model.type);

    let position_el = element.find('.position');
    position_el.text(model.position);

    let pot_el = element.find('.pot');
    pot_el.text(model.pot);

    let add_cards = function(el, cards) {
        cards.forEach(function(card) {
            let new_card = $('<div></div>');
            card_icon(new_card, card);
            el.append(new_card);
        });
    };

    let board_el = element.find('card-selector');
    // This returns an emitter, but we don't need it right now
    card_selector(board_el, model.board);

    let hand_el = element.find('.hand');
    add_cards(hand_el, model.hand);

    let bet_input_el = element.find('.bet input');
    let pots = {
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
    let update_bet_display = function() {
        bet_input_el.val(model.amount);
    };
    update_bet_display();
    for (let p in pots) {
        let pot = pots[p];
        // TODO: teardown
        pot.el.on('click', function() {
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

    let action_els = element.find('.action .button');
    action_els.hide();
    model.available_actions.forEach(function(action) {
        let action_el = element.find('.button.' + action);
        action_el.show();
        action_el.on('click', function() {
            model.set_action(action);
            element.find('.button').removeClass('selected');
            action_el.addClass('selected');
            emitter.emit('change');
        });
    });

    return emitter;
};
