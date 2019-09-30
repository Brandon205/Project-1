//Functions
function move() {
    for (let i = 0; i < snake.tail.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake.tail[i].x, snake.tail[i].y, 20, 20);
        //Check tail x and y's against the head piece
        if (snake.long > 3) {
        if (snake.tail[i].x == snake.x && snake.tail[i].y == snake.y) {
            snake.alive = false;
            topRight.textContent = 'Game Over! Press Space to restart';
        }
    }
    }
}

function grow() {
    snake.tail.push({x: snake.x, y: snake.y});
    snake.long++;
}

var chomp = function() {
    if (currentLevel == 2 && apple.x == 80 || apple.x == 300) {
        apple.newApple();
    }
    if (snake.x === apple.x && snake.y === apple.y) {
    return true;
    } else {
        return false;
    }
}

function movement(evt) {//87 65 83 68 || 38 39 40 37
    switch (evt.keyCode) {
        case (38): //up
            if (snake.mvtY != 20) {
            going(0, -1);
            }
            break;
        case (39): //right
            if (snake.mvtX != -20) {
            going(1, 0);
            }
            break;
        case (40): //down
            if (snake.mvtY != -20) {
            going(0, 1);
            }
            break; 
        case (37): //left
            if (snake.mvtX != 20) {
            going(-1, 0);
            }
            break;
        case (32): //spacebar for resetting
            reset();
            break;
    }
}

var going = function(x, y) {
    snake.mvtX = x * 20;
    snake.mvtY = y * 20;
}

function gameOver() {
    if (snake.x > canvas.width - 20 || snake.x < 0 || snake.y > canvas.height + 20 || snake.y < 0) {//Levels 1-3 wall detection
        snake.alive = false;
        topRight.textContent = 'Game Over! Press Space to restart';
    }
    if (currentLevel == 2) { //Level 2 obstacles detection
     if (snake.x + 20 > 80 && snake.x < 100 && snake.y + 20 > 60 && snake.y < 340) { // Level 2 Left Rectangle
        snake.alive = false;
        topRight.textContent = 'Game Over! Press Space to restart';
    }
    if (snake.x + 20 > 300 && snake.x < 320 && snake.y + 20 > 60 && snake.y < 340) { // Level 2 Right Rectangle
        snake.alive = false;
        topRight.textContent = 'Game Over! Press Space to restart';
    }
}
}
//Very rudimentary reset function 
function reset() {
    snake.alive = true;
    going(0, 0);
    snake.x = Math.floor(Math.random() * 10) * 40;
    snake.y = Math.floor(Math.random() * 10) * 40;
    snake.long = 1;
    snake.tail = [];
    score = 0;
    topLeft.textContent = `Score: ${score}`;
    topRight.textContent = "Play Game!"
}

function gameLoop() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Drawing canvas 
    //Drawing the obstacles for the specific level
    if (currentLevel == 2) {
        ctx.fillStyle = 'grey';
        level2.rect1(80, 60, 20, 280);
        level2.rect1(300, 60, 20, 280);
    }
    //Moving the Snake
    if(snake.alive) {
    snake.x += snake.mvtX;
    snake.y += snake.mvtY;
    move();
    snake.tail.push({x: snake.x, y: snake.y});
    if (snake.tail.length > snake.long) {
        snake.tail.shift();
    }
    if (score >= goal) {
        topRight.textContent = `You Win!`;
        clearInterval(gameLoop());
    }
}
    //Everything relating to the apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, 20, 20);
    if (chomp()) {
        grow();
        apple.newApple();
        score++;
        topLeft.textContent = `Score: ${score}`
    }
    gameOver();
}

//Event Handlers 
document.addEventListener('keydown', function(e) {
    movement(e);
})

setInterval(gameLoop, 1000/8);