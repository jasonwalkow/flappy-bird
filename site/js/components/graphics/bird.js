var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    var img = new Image();
    img.src = "../site/img/flappy_lg.png";
    context.scale(1, -1);
    context.drawImage(img, 0, 0, 200, 200, -0.1, 0, 0.15, 0.15);
    //context.beginPath();
    //context.arc(0, 0, 0.02, 0, 2 * Math.PI);
    //context.fill();
    //context.closePath();
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
