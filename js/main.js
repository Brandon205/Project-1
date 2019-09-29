//DOM References 
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var gameStatus = document.getElementById('top-right');
var score = document.getElementById('top-left');
var resetButton = document.getElementById('bottom');

//Game Pieces 
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

//Functions

function move() {
    for (let i = 0; i < snake.tail.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake.tail[i].x, snake.tail[i].y, 20, 20);
        if (snake.long > 3) {
        if (snake.tail[i].x == snake.x && snake.tail[i].y == snake.y) {
            snake.alive = false;
        }
    }
    }
}

function grow() {
    snake.tail.push({x: snake.x, y: snake.y});
    snake.long++;
}

var chomp = function() {
    if (snake.x === apple.x && snake.y === apple.y) {
    return true;
    } else {
        return false;
    }
}

function movement(evt) {//87 65 83 68
    switch (evt.keyCode) {
        case (87): //up
            going(0, -1);
            break;
        case (68): //right
            going(1, 0);
            break;
        case (83): //down
            going(0, 1);
            break; 
        case (65): //left
            going(-1, 0);
            break;
    }
}

var going = function(x, y) {
    snake.mvtX = x * 20;
    snake.mvtY = y * 20;
}

function gameOver() {
    if (snake.x > canvas.width - 20 || snake.x < 0 || snake.y > canvas.height + 20 || snake.y < 0) {
        // console.log('game over');
        snake.alive = false;
    }
}

function reset() {
    snake.alive = true;
    going(0, 0);
    snake.x = 20;
    snake.y = 80;
    snake.long = 1;
    snake.tail = [];
}

function gameLoop() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);//drawing canvas 
    
    if(snake.alive) {
    snake.x += snake.mvtX;
    snake.y += snake.mvtY;
    move();
    snake.tail.push({x: snake.x, y: snake.y});
    if (snake.tail.length > snake.long) {
        snake.tail.shift();
    }
}
    gameOver();

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, 20, 20);

    if (chomp()) {
        grow();
        apple.newApple();
        score++;
    }
}

//Event Handlers 
document.addEventListener('keydown', function(e) {
    movement(e);
})

resetButton.addEventListener('click', reset);

setInterval(gameLoop, 1000/8);
