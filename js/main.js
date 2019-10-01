// Default texts
topLeft.textContent = `Score: 0`;
topRight.textContent = `Start Game!`;

//Functions
function move() {
    for (let i = 0; i < snake.tail.length; i++) {
        ctx.fillStyle = "#35ce07"
        ctx.fillRect(snake.tail[i].x, snake.tail[i].y, 20, 20);
        //Check tail x and y's against the head piece
        if (snake.long > 3) {
        if (snake.tail[i].x == snake.x && snake.tail[i].y == snake.y) {
            snake.alive = false;
            topRight.textContent = 'Game Over! Press Space!';
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
    if (currentLevel >= 4) {
        for (let i = 0; i < lvl4Arr.length; i++) {
            if (apple.x == lvl4Arr[i].x && apple.y == lvl4Arr[i].y) {
                apple.newApple();
            }
        }
    }
    if (snake.x === apple.x && snake.y === apple.y) {
        grow();
        apple.newApple();
        score++;
        topLeft.textContent = `Score: ${score}`
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
    if (snake.x > canvas.width - 20 || snake.x < 0 || snake.y + 20 > canvas.height || snake.y < 0) {//Levels 1-3 wall detection
        snake.alive = false;
        topRight.textContent = 'Game Over! Press Space!';
    }
    //Level 2 obstacles detection
     if (currentLevel == 2 && snake.x + 20 > 80 && snake.x < 100 && snake.y + 20 > 60 && snake.y < 340) { // Level 2 Left Rectangle
        snake.alive = false;
        topRight.textContent = 'Game Over! Press Space!';
    }
    if (currentLevel == 2 && snake.x + 20 > 300 && snake.x < 320 && snake.y + 20 > 60 && snake.y < 340) { // Level 2 Right Rectangle
        snake.alive = false;
        topRight.textContent = 'Game Over! Press Space!';
    }
    //Level 3 obstacle detection
    if (currentLevel == 3 && snake.x + 20 > tempVal && snake.x < tempVal + 20 && snake.y + 20 > 170 && snake.y < 230) {
        snake.alive = false;
        topRight.textContent = 'Game Over! Press Space!';
    }
    
    //Collision detection for randoLevel
    if (currentLevel >= 4) {
        for (let i = 0; i < lvl4Arr.length; i++) {
            if (snake.x + 20 > lvl4Arr[i].x && snake.x < lvl4Arr[i].x + 20 && snake.y + 20 > lvl4Arr[i].y && snake.y < lvl4Arr[i].y + 20) {
                snake.alive = false;
                topRight.textContent = 'Game Over! Press Space!';
            }
        }
    }
}

//Very rudimentary reset function 
function reset() {
    snake.alive = true;
    going(0, 0);
    snake.x = randoNumber();
    snake.y = randoNumber();
    snake.long = 1;
    snake.tail = [];
    score = 0;
    topLeft.textContent = `Score: ${score}`;
    topRight.textContent = "Play Game!"
}

function level4Plus() {
    if (currentLevel >= 4) {
    randoLevel.rect(currentLevel);
    }
}

function gameLoop() {
    ctx.fillStyle = '#047c04';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Drawing canvas 
    //Drawing the obstacles for the specific level
    if (currentLevel == 2) {
        ctx.fillStyle = '#141414';
        level2.rect1(80, 60, 20, 280);
        level2.rect1(300, 60, 20, 280);
    } else if (currentLevel == 3) {
        ctx.fillStyle = "#141414";
        level3.rect2(160, 20, 60);
    } else if (currentLevel >= 4) {
        for (let i = 0; i < lvl4Arr.length; i++) {
            ctx.fillStyle = "#141414";
            let xval = lvl4Arr[i].x;
            let yval = lvl4Arr[i].y;
            ctx.fillRect(xval, yval, 20, 20);
        }
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
    //Winning Condition
    if (currentLevel == 1 && score >= goal || currentLevel == 2 && score >= goal2 || currentLevel == 3 && score >= goal3 || currentLevel >= 4 && score >= goal3 + currentLevel) {
        topRight.textContent = `You Win! Press Space!`;
        currentLevel++;
        snake.alive = false;
        level4Plus();
    }
}
    //Everything relating to the apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, 20, 20);
    chomp();
    //Goal display
    if (currentLevel === 1) {
            middlePart.textContent = `Goal: ${goal}`;
        } else if (currentLevel == 2){
            middlePart.textContent = `Goal: ${goal2}`;
        } else if (currentLevel == 3) {
            middlePart.textContent = `Goal: ${goal3}`;
        } else if (currentLevel >= 4) {
            middlePart.textContent = `Goal: ${goal3 + currentLevel}`;
        }
    gameOver();
}

//Event Handlers 
document.addEventListener('keydown', function(e) {
    e.preventDefault();
    movement(e);
});
upArrow.addEventListener('click', function(e) {
    e.preventDefault();
    let up = {keyCode: 38};
    movement(up);
});
rightArrow.addEventListener('click', function(e) {
    e.preventDefault();
    let right = {keyCode: 39};
    movement(right);
});
downArrow.addEventListener('click', function(e) {
    e.preventDefault();
    let down = {keyCode: 40};
    movement(down);
});
leftArrow.addEventListener('click', function(e) {
    e.preventDefault();
    let left = {keyCode: 37};
    movement(left);
});

setInterval(gameLoop, 1000/8);