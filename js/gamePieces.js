//DOM references
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var topRight = document.getElementById('game-state');
var topLeft = document.getElementById('score');
var resetButton = document.getElementById('reset');
var middlePart = document.getElementById('middle');

// References for the mobile buttons
var upArrow = document.getElementById('up');
var rightArrow = document.getElementById('right');
var downArrow = document.getElementById('down');
var leftArrow = document.getElementById('left');

// All of the handmade sprites used
var head0 = new Image();
head0.src = 'img/snakePieces/snakeHead.png';
var head90 = new Image();
head90.src = 'img/snakePieces/snakeHead90.png';
var head180 = new Image();
head180.src = 'img/snakePieces/snakeHead180.png';
var head270 = new Image();
head270.src = 'img/snakePieces/snakeHead270.png';
var body = new Image();
body.src = 'img/snakePieces/snakeBack.png';
var grass = new Image();
grass.src = 'img/grass.png';
var apples = new Image();
apples.src = 'img/appleSprite.png';
var wall = new Image();
wall.src = 'img/wall.png';

let randoNumber = function() {
    return Math.floor(Math.random() * 10) * 40;
}
document.getElementById('score').textContent = `Score: 0`;
document.getElementById('game-state').textContent = `Start Game!`

let screenWidth = screen.width;
let goal = 5;
let goal2 = 5;
let score = 0;
let currentLevel = 1;
let lvl4Arr = [];
let fps; // Not really fps but for lack of a better term, it is 1000/8 or 10 depending on the screen size 9 is smoother on mobile but also faster

//Game Objects
var snakeStart = {
    tail: [],
    long: 1,
    x: 20,
    y: 180,
    mvtX: 0,
    mvtY: 0,
    alive: true,
}
let snake = {...snakeStart}; // For resetting 

var appleObj = { // For the animation
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

let goal3 = 8;
let xVal = 30;
var level3 = {
    xVel: 8,
    rect: function(yVal, wVal, hVal) {
        xVal += this.xVel;
        if (xVal > 360) {
            this.xVel *= -1;
        } else if (xVal < 20) {
            this.xVel *= -1;
        }
        ctx.drawImage(wall, 0, 0, 20, 140, xVal, yVal, wVal, hVal);
    }
}

var randoLevel = {
    rect: function(amount) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < amount; i++) {
            lvl4Arr.push({x: randoNumber(), y: randoNumber()});
        } 
        if (lvl4Arr.length > amount) {
            lvl4Arr.pop();
        }
    }
}