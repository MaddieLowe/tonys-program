let EventEmitter = require('events');

module.exports = function(element, model) {
    let emitter = new EventEmitter();

    let button_els = element.find('.button');
    for (let i = 0; i < button_els.length; i++) {
        let el = button_els[i];
        // TODO: teardown
        $(el).on('click', function() {
            emitter.emit('change', el.textContent);
        });
    }

    return emitter;
};
