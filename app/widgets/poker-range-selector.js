let EventEmitter = require('events');
let range_selector = require('./range-selector');
let base_range = require('../lib/base-range');
let offsuit_range = require('../lib/offsuit-range');
let paired_range = require('../lib/paired-range');
let suited_range = require('../lib/suited-range');
let fs = require('fs');
let poker_range_utils = require('../lib/poker-range-utils');
let suit_selector_ranges = {
    offsuit: offsuit_range,
    suited: suited_range,
    paired: paired_range
};

module.exports = function(element, model) {
    let emitter = new EventEmitter();
    let suit_models = {};
    let base_models = {};
    model = model || [];

    let template = fs.readFileSync(__dirname + '/../../views/widgets/poker-range-selector.ejs', 'utf8');
    element.append($(template));

    // Initialize the base range selector
    let base_element = element.find('range.base.main');
    let base_model = JSON.parse(JSON.stringify(base_range));
    let base_range_selector_emitter = range_selector(base_element, base_model);

    let update_model = function() {
        let pairs = poker_range_utils.convert_model(base_model,
                                                    base_models.offsuit,
                                                    suit_models.offsuit,
                                                    base_models.suited,
                                                    suit_models.suited,
                                                    base_models.paired,
                                                    suit_models.paired);
        // Alter the model without losing the reference to the original array object
        model.length = 0;
        for (let i = 0; i < pairs.length; i++) {
            model.push(pairs[i]);
        }
        emitter.emit('changed');
    };

    // Initialize the suit range selectors
    ['offsuit','suited','paired'].forEach(function(suit_selector_type) {
        let suit_selector_base_element = element.find('.' + suit_selector_type + ' range.base');
        let suit_selector_base_model = JSON.parse(JSON.stringify(base_range));
        let suit_selector_base_emitter = range_selector(suit_selector_base_element, suit_selector_base_model);

        let suit_selector_element = element.find('.' + suit_selector_type + ' range.suit-selection');
        let suit_selector_model = JSON.parse(JSON.stringify(suit_selector_ranges[suit_selector_type]));
        let suit_selector_emitter = range_selector(suit_selector_element, suit_selector_model);
        suit_selector_emitter.on('changed', update_model);

        let suit_selector_title = element.find('.button:contains("' + suit_selector_type + '")');
        let suit_selector_section = element.find('.section.' + suit_selector_type);
        // TODO: teardown
        suit_selector_title.on('click', function() {
            if (suit_selector_section.hasClass('showing')) {
                suit_selector_section.removeClass('showing');
                suit_selector_title.removeClass('showing');
            } else {
                element.find('.showing').removeClass('showing');
                suit_selector_section.addClass('showing');
                suit_selector_title.addClass('showing');
            }
        });

        base_models[suit_selector_type] = suit_selector_base_model;
        suit_models[suit_selector_type] = suit_selector_model;
    });

    base_range_selector_emitter.on('changed', update_model);

    let export_el = element.find('.button:contains("Export")');
    let download_el = document.createElement('a');
    document.body.appendChild(download_el);
    download_el.style = "display: none";
    // TODO: teardown
    export_el.on('click', function() {
        let data = new Blob([JSON.stringify(model)], {type: 'text/plain'});
        let text_file = window.URL.createObjectURL(data);
        download_el.href = text_file;
        download_el.download = "export.txt";
        download_el.click();
        window.URL.revokeObjectURL(text_file);
    });

    return emitter;
};
