//DOM and misc references
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var topRight = document.getElementById('top-right');
var topLeft = document.getElementById('top-left');
var resetButton = document.getElementById('reset');
var middlePart = document.getElementById('middle');

var toggle = true;
var upArrow = document.getElementById('up');
var rightArrow = document.getElementById('right');
var downArrow = document.getElementById('down');
var leftArrow = document.getElementById('left');
var radians = Math.PI/180;

var head = document.getElementById('head');
var body = document.getElementById('body');
var tail = document.getElementById('tail');
var grass = document.getElementById('grass');
var apples = document.getElementById('apples');
var wall = document.getElementById('wall');

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

var appleObj = {
    apple1: {
        x: 0,
        y: 2,
    },
    apple2: {
        x: 28,
        y: 0,
    }
}

var apple = {
    x: randoNumber(),
    y: randoNumber(),
    newApple: function() {
        apple.x = randoNumber();
        apple.y = randoNumber();
    },
    
    count: 1,
    sprite: function() {
        if (this.count == 1) {
            ctx.drawImage(apples, appleObj.apple1.x, appleObj.apple1.y, 24, 24, this.x, this.y, 23, 23);
            this.count++;
        } else if (this.count == 2) {
            ctx.drawImage(apples, appleObj.apple2.x, appleObj.apple2.y, 24, 24, this.x, this.y + 1, 23, 23);
            this.count--;
        }
        
    }
    
}

let tempVal = 30
var level3 = {
    xVel: 8,
    rect2: function(yVal, wVal, hVal) {
        tempVal += this.xVel;
        if (tempVal > 360) {
            this.xVel *= -1;
        } else if (tempVal < 20) {
            this.xVel *= -1;
        }
        ctx.drawImage(wall, 0, 0, 20, 140, tempVal, yVal, wVal, hVal);
    }
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