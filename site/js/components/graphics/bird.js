var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
    context.beginPath();
    context.arc(100, 100, 20, 0, 2 * Math.PI);
    context.fillStyle="red";
    context.fill();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
