(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
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
},{}],4:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };
};

PhysicsComponent.prototype.update = function(delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
    console.log(this.type + " x: " + this.position.x + ", y: " + this.position.y);
};

exports.PhysicsComponent = PhysicsComponent;
},{}],5:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
//var collisionComponent = require("../components/collision/circle");

var Bird = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -2;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    //var collision = new collisionComponent.CircleCollisionComponent(this, 0.08);
    //collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics
        //collision: collision
    };
};

/*Bird.prototype.onCollision = function(entity) {
    debugger;
    console.log("Bird collided with entity:", entity);
};*/

exports.Bird = Bird;
},{"../components/graphics/bird":2,"../components/physics/physics":4}],6:[function(require,module,exports){
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
},{"../components/graphics/pipe":3,"../components/physics/physics":4}],7:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipesSystem = require('./systems/pipes');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function() {
    this.entities = [new bird.Bird(), new pipe.Pipe()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.pipes = new pipesSystem.PipesSystem(this.entities);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pipes.run();
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":5,"./entities/pipe":6,"./systems/graphics":10,"./systems/input":11,"./systems/physics":12,"./systems/pipes":13}],8:[function(require,module,exports){
console.log("entering");
var flappyBird = require('./flappy_bird');
var domReady = require('domready');
domReady (function() {
	var app = new flappyBird.FlappyBird();
    app.run();
});

},{"./flappy_bird":7,"domready":1}],9:[function(require,module,exports){
/*var CollisionSystem = function(entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }

        for (var j=i+1; j<this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!'collision' in entityB.components) {
                continue;
            }

            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;
            }

            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);
            }

            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
            }
        }
    }
};

exports.CollisionSystem = CollisionSystem;*/
},{}],10:[function(require,module,exports){
var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
    // Run the render loop
    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
    // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);

    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'graphics' in entity.components) {
            continue;
        }

        entity.components.graphics.draw(this.context);
    }

    this.context.restore();

    window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;
},{}],11:[function(require,module,exports){
var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.canvas.addEventListener('touchstart', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.6;
};

exports.InputSystem = InputSystem;
},{}],12:[function(require,module,exports){
var collisionSystem = require("./collision");

var PhysicsSystem = function(entities) {
    this.entities = entities;
    //this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'physics' in entity.components) {
            continue;
        }

        entity.components.physics.update(1/60);
    }
    //this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;
},{"./collision":9}],13:[function(require,module,exports){
var pipe = require('../entities/pipe');

var PipesSystem = function(entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
};

PipesSystem.prototype.run = function() {
  this.canvas = window.setInterval(this.tick.bind(this), 2000);
};

PipesSystem.prototype.tick = function() {
    this.entities.push(new pipe.Pipe);
};

exports.PipesSystem = PipesSystem;
},{"../entities/pipe":6}]},{},[8]);
