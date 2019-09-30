//DOM and misc references
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var topRight = document.getElementById('top-right');
var topLeft = document.getElementById('top-left');
var resetButton = document.getElementById('reset');
var middlePart = document.getElementById('middle');

var goal = 5;
let score = 0;
let currentLevel = 2;

//Game Objects
var snake = {
    tail: [],
    long: 1,
    x: 20,
    y: 180,
    mvtX: 0,
    mvtY: 0,
    alive: true,
}

var apple = {
    x: Math.floor(Math.random() * 10) * 40,
    y: Math.floor(Math.random() * 10) * 40,
    newApple: function() {
        apple.x = Math.floor(Math.random() * 10) * 40;
        apple.y = Math.floor(Math.random() * 10) * 40;
    }
}

var level1 = {
    //level 1 might have no obstacles
}
// console.log(level1.rect1);
var level2 = {
    //obstacles
    rect1: function(x, y, w, h) {
        ctx.fillRect(x, y, w, h);
    }
}