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