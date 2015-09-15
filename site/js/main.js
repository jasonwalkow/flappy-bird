console.log("entering");
var flappyBird = require('./flappy_bird');
var domReady = require('domready');
domReady (function() {
	var app = new flappyBird.FlappyBird();
    app.run();
});
