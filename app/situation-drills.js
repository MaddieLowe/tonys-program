let situations = require('./lib/situations/situations');
let situation = require('./lib/situation');
let situation_display = require('./widgets/situation-display');
let drop_down_menu = require('./widgets/drop-down-menu');
let get_random_position = require('./lib/card-utils').get_random_position;
let popup = require('./widgets/popup');

$(document).ready(function() {
    let situation_el = $('drop-down-menu.situation');
    let situations_emitter = new drop_down_menu(situation_el, Object.keys(situations));
    let current_situation_type = situations[Object.keys(situations)[0]];
    situations_emitter.on('change', function(selected) {
        current_situation_type = situations[selected];
        get_new_situation();
        setup_positions_dropdown();
    });

    let completed_hands = [];
    let update_count = function() {
        $('.hands-completed').text(completed_hands.length);
    };
    update_count();

    let current_situation;
    let position_random = true;
    let position;

    var get_new_situation = function() {
        current_situation = new situation(current_situation_type);
        if (!position_random) {
            current_situation.set_position(position);
        }
        update_situation_display(current_situation);
        update_count();
    };

    var update_situation_display = function(situation) {
        let situation_display_el = $('situation-display');
        situation_display_el.children().remove();
        let situation_display_emitter = new situation_display(situation_display_el, situation);
        situation_display_emitter.on('change', function() {
            if (situation.action) {
                completed_hands.push(current_situation);
                get_new_situation();
            }
        });
    };

    var setup_positions_dropdown = function() {
        let positions = ['Random'].concat(current_situation.positions);
        let positions_el = $('drop-down-menu.position');
        positions_el.children().remove();
        let positions_emitter = new drop_down_menu(positions_el, positions);
        position_random = true;

        positions_emitter.on('change', function(selected) {
            if (selected === 'Random') {
                position_random = true;
                position = get_random_position(current_situation.positions);
            } else {
                position_random = false;
                position = selected;
            }
            current_situation.set_position(position);
            update_situation_display(current_situation);
        });
    };

    get_new_situation();
    setup_positions_dropdown();

    let download_el = $('.download');
    let a_el = document.createElement('a');
    document.body.appendChild(a_el);
    a_el.style = "display: none";
    download_el.on('click', function() {
        let text_file = "";
        let hand_id = Date.now();
        completed_hands.forEach(function(hand) {
            text_file = text_file + hand.create_export_data(hand_id) + "\n\n\n\n";
            hand_id++;
        });

        let blob = new Blob([text_file], {type: 'text/plain'});
        let url = window.URL.createObjectURL(blob);
        a_el.href = url;
        a_el.download = 'session.txt';
        a_el.click();
        window.URL.revokeObjectURL(url);
    });

    let popup_el = $('popup');
    popup_el.hide();
    let popup_emitter = new popup(popup_el);
    popup_emitter.on('change', function(choice) {
        if (choice === "OK") {
            completed_hands = [];
            get_new_situation();
            setup_positions_dropdown();
        }
        popup_el.hide();
    });

    let new_session_el = $('.new-session');
    new_session_el.on('click', function() {
        popup_el.show();
    });
});
