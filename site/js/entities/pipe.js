var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function() {
    console.log("Creating Pipe entity");

    this.type = 'pipe';
    var physics = new physicsComponent.PhysicsComponent(this);
	    physics.position.x = 1;
	  	physics.position.y = 0;
	  	physics.velocity.x = -0.6;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);

  	var Pipe = function(position, size) {};

  	this.components = {
    	graphics: graphics,
    	physics: physics
  	};
};

exports.Pipe = Pipe;