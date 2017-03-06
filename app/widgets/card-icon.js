module.exports = function(element, model) {
    element.addClass('card-icon');
    element.text(model.value_to_string());
    element.addClass(model.suit);
};
