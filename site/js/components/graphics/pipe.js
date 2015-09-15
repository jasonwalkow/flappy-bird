var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    console.log("Drawing a pipe");
    var position = this.entity.components.physics.position;
    context.save();
 	  context.translate(position.x, position.y);
  	var img = new Image();
  	img.src = "../site/img/pipe.png";
  	context.drawImage(img, 0, 0, 500, 1000, 0.31, 0.6, 0.2, 0.65);
  	var img2 = new Image();
  	img2.src = "../site/img/pipe.png";
  	context.rotate(Math.PI);
  	context.drawImage(img2, 0, 0, 500, 1000, -0.5, -0.3, 0.2, 0.65);
  	context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;