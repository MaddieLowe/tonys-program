let EventEmitter = require('events');
let fs = require('fs');
let card = require('../lib/card');
let card_icon = require('./card-icon');
let suit_map = require('../lib/card-utils').suit_map;
let card_from_value = require('../lib/card-utils').card_from_value;
let get_random_card = require('../lib/card-utils').get_random_card;

module.exports = function(element, model) {
    let emitter = new EventEmitter();
    model = model || [];

    let template = fs.readFileSync(__dirname + '/../../views/widgets/card-selector.ejs', 'utf8');
    element.append($(template));

    let values_el = element.find('.values');
    let suits_el = element.find('.suits');

    let selected_value;
    let selected_suit;


    let value_click_handler = function(value_el, val) {
        return function() {
            suits_el.addClass('selected');
            value_el.addClass('selected');
            selected_value = val;
        };
    };

    function update_displayed_cards() {
        let delete_card_handler = function(card) {
            return function() {
                model.splice(model.indexOf(card), 1);
                update_displayed_cards();
                emitter.emit('changed');
            };
        };

        let card_display = element.find('.selected-cards');
        card_display.empty();
        model.forEach(function(card) {
            let delete_button = $("<span class='delete-card'>x</span>");
            let new_card = $('<div></div>');
            card_icon(new_card, card);
            new_card.append(delete_button);
            card_display.append(new_card);
            // TODO: teardown
            delete_button.on('click', delete_card_handler(card));
        });
    }

    for (let i = 2; i <= 14; i++) {
        let val = card_from_value(i);
        let value_el = $("<div>" + val + "</div>");
        values_el.append(value_el);
        // TODO: teardown
        value_el.on('click', value_click_handler(value_el, val));
    }

    suit_map.forEach(function(suit) {
        let suit_el = $("<div>" + suit + "</div>");
        suits_el.append(suit_el);
        // TODO: teardown
        suit_el.on('click', function() {
            element.find('*').removeClass('selected');
            selected_suit = suit;
            let selected_card = new card(card_from_value(selected_value) + selected_suit);
            model.push(selected_card);
            update_displayed_cards();
            emitter.emit('changed');
        });
    });

    let add_card_el = element.find('.add-card');
    // TODO: teardown
    add_card_el.on('click', function() {
        values_el.addClass('selected');
    });

    let clear_cards_el = element.find('.clear-cards');
    // TODO: teardown
    clear_cards_el.on('click', function() {
        model.splice(0, model.length);
        update_displayed_cards();
        emitter.emit('changed');
    });

    let random_el = element.find('.random');
    // TODO: teardown
    random_el.on('click', function() {
        model.splice(0, model.length);
        for (let i = 0; i < 3; i++) {
            model[i] = get_random_card(model);
        }
        update_displayed_cards();
        emitter.emit('changed');
    });

    update_displayed_cards();

    return emitter;
};
