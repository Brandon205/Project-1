//DOM and misc references
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var topRight = document.getElementById('top-right');
var topLeft = document.getElementById('top-left');
var resetButton = document.getElementById('reset');
var middlePart = document.getElementById('middle');
var upArrow = document.getElementById('up');
var rightArrow = document.getElementById('right');
var downArrow = document.getElementById('down');
var leftArrow = document.getElementById('left');

let randoNumber = function() {
    let num = Math.floor(Math.random() * 10) * 40;
    return num;
}

var goal = 5;
var goal2 = 5;
let goal3 = 8;
let score = 0;
var currentLevel = 1;
let lvl4Arr = [];

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
    x: randoNumber(),
    y: randoNumber(),
    newApple: function() {
        apple.x = randoNumber();
        apple.y = randoNumber();
    }
}

// console.log(level1.rect1);
var level2 = {
    //obstacles
    rect1: function(x, y, w, h) {
        ctx.fillRect(x, y, w, h);
    }
}
let tempVal = 30;
var level3 = {
    xVel: 5,
    rect2: function(yVal, wVal, hVal) {
        tempVal += this.xVel;
        if (tempVal > 360) {
            this.xVel *= -1;
        } else if (tempVal < 20) {
            this.xVel *= -1;
        }
        ctx.fillRect(tempVal, yVal, wVal, hVal);
    },
}

var randoLevel = {
    rect: function(amount) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < amount; i++) {
            lvl4Arr.push({x: randoNumber(), y: randoNumber()});
            // fillRect(randoNumber, randoNumber, 20, 20);
        } 
        if (lvl4Arr.length > amount) {
            lvl4Arr.pop();
        }
    }
}