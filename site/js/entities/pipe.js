var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
//var collisionComponent = require("../components/collision/rectangle");

var Pipe = function() {

    this.type = 'pipe';
    var physics = new physicsComponent.PhysicsComponent(this);
	    physics.position.x = 1;
	  	physics.position.y = 0;
	  	physics.velocity.x = -0.6;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    //var collision = new collisionComponent.RectCollisionComponent(this, 0.65);
    //collision.onCollision = this.onCollision.bind(this);

  	var Pipe = function(position, size) {};

  	this.components = {
    	graphics: graphics,
    	physics: physics
      //collision: collision
  	};
};

/*Pipe.prototype.onCollision = function(entity) {
    debugger;
    console.log("Pipe collided with entity:", entity);
};*/

exports.Pipe = Pipe;