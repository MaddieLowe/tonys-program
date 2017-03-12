var EventEmitter = require('events');

// Expecting model to be: ['CU', 'BB', ...]
module.exports = function(element, model) {
    var emitter = new EventEmitter();
    var selected = model[0];
    var selected_el = $('<div class="selected"></div>');
    element.append(selected_el);
    var menu_el = $('<div class="menu"></div>');
    element.append(menu_el);

    var update_display = function() {
        selected_el.text(selected);

        menu_el.find('.menu-item').remove();
        model.forEach(function(val) {
            if (val === selected) return;

            var menu_item_el = $('<div class="menu-item">' + val + '</div>');
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
