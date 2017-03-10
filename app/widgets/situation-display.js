var EventEmitter = require('events');
var fs = require('fs');

module.exports = function(element, model) {
    var emitter = new EventEmitter();

    var template = fs.readFileSync(__dirname + '/../../views/widgets/situation-display.ejs', 'utf8');
    element.append($(template));
    console.error(JSON.stringify(model, null, 2));
    return emitter;
};
