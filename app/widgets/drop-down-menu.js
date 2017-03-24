let EventEmitter = require('events');

// Expecting model to be: ['CU', 'BB', ...]
module.exports = function(element, model) {
    let emitter = new EventEmitter();
    let selected = model[0];
    let selected_el = $('<div class="selected"></div>');
    element.append(selected_el);
    let menu_el = $('<div class="menu"></div>');
    element.append(menu_el);

    let update_display = function() {
        selected_el.text(selected);

        menu_el.find('.menu-item').remove();
        model.forEach(function(val) {
            if (val === selected) return;

            let menu_item_el = $('<div class="menu-item">' + val + '</div>');
            menu_el.append(menu_item_el);
            // TODO: teardown
            menu_item_el.on('click', function() {
                selected = val;
                update_display();
                emitter.emit('change', selected);
            });
        });
    };

    update_display();

    return emitter;
};
