//Functions
function reset() { //Very rudimentary reset function 
    going(0, 0);
    snake = {...snakeStart};
    snake.tail.length = 0;
    snake.x = randoNumber();
    snake.y = randoNumber();
    score = 0;
    topLeft.textContent = `Score: ${score}`;
    topRight.textContent = "Start Game!"
}

function checkDirection(x, y) { // Takes in a direction and calls move() with a degree direction
    if (x == 0 &&  y == -20) { // up
        move(0);
    } else if (x == 0 && y == 20) { // down
        move(180);
    } else if (x == -20 && y == 0) { // left
        move(270);
    } else if (x == 20 && y == 0) { // right
        move(90);
    } else if (x == 0 && y == 0) { // start
        move(0);
    }
}

function move(dir) { // Takes in a direction from checkDirection() and changes the head direction, displays it and the body, & checks for body collision
    let tail = snake.tail;
    for (let i = 0; i < tail.length; i++) {
        let headDir = head0;
        if (dir == 0) {
            headDir = head0;
        } else if (dir == 90) {
            headDir = head90;
        } else if (dir == 180) {
            headDir = head180;
        } else if (dir == 270) {
            headDir = head270;
        }
        if (tail[i] == tail[tail.length - 1]) {
            ctx.drawImage(headDir, tail[tail.length -1].x, tail[tail.length - 1].y, 25, 25);
        } else {
            ctx.drawImage(body, tail[i].x, tail[i].y, 25, 25);
        }
        if (snake.long > 3) { //Check tail x and y's against the head piece
            if (tail[i].x == snake.x && snake.tail[i].y == snake.y) {
                snake.alive = false;
                screenWidth < 600 ? topRight.textContent = 'Game Over! Tap Here!' : topRight.textContent = 'Game Over! Press Space!';
            }
        }
    }
}

function grow() { // Will add a "tail" piece to the start of the snake.tail array and increase the length counter 
    snake.tail.push({x: snake.x, y: snake.y});
    snake.long++;
}

var chomp = function() { // Will check if apple is on top of wall, if snake is on top of a apple it will: call grow(), make a newApple(), score++, & update score 
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

var going = function(x, y) { // Converts a direction to a mvt var in snake so that I can later add it to the snake.x and snake.y
    snake.mvtX = x * 20;
    snake.mvtY = y * 20;
}

function movement(evt) {// Will take in a keycode and call going() with the corresponding direction the snake needs to move
    switch (evt.keyCode) {
        case (38): // up
            if (snake.mvtY != 20) {
            going(0, -1);
            }
            break;
        case (39): // right
            if (snake.mvtX != -20) {
            going(1, 0);
            }
            checkDirection(90);
            break;
        case (40): // down
            if (snake.mvtY != -20) {
            going(0, 1);
            }
            checkDirection(180);
            break; 
        case (37): // left
            if (snake.mvtX != 20) {
            going(-1, 0);
            }
            checkDirection(270);
            break;
        case (32): // spacebar for resetting
            reset();
            break;
        case (76): //L - for increasing the currentLevel
            currentLevel++;
            level4Plus();
            break;
        case (75): //K - for decreasing the currentLevel
            currentLevel--;
            level4Plus();
    }
}

function gameOver() { // This big boy has the different levels and their walls for collision detection 
    if (snake.x > canvas.width - 20 || snake.x < 0 || snake.y + 20 > canvas.height || snake.y < 0) {//Levels 1-3 wall detection
        snake.alive = false;
        screenWidth < 600 ? topRight.textContent = 'Game Over! Tap Here!' : topRight.textContent = 'Game Over! Press Space!';
    }

    //Level 2 obstacles detection
    if (currentLevel == 2 && snake.x + 20 > 80 && snake.x < 100 && snake.y + 20 > 60 && snake.y < 340 || currentLevel == 2 && snake.x + 20 > 300 && snake.x < 320 && snake.y + 20 > 60 && snake.y < 340) { // Level 2 wall detection
        snake.alive = false;
        screenWidth < 600 ? topRight.textContent = 'Game Over! Tap Here!' : topRight.textContent = 'Game Over! Press Space!';
    }

    //Level 3 obstacle detection
    if (currentLevel == 3 && snake.x + 20 > xVal && snake.x < xVal + 20 && snake.y + 20 > 140 && snake.y < 280) {
        snake.alive = false;
        screenWidth < 600 ? topRight.textContent = 'Game Over! Tap Here!' : topRight.textContent = 'Game Over! Press Space!';
    }
    
    //Collision detection for randoLevel
    if (currentLevel >= 4) {
        for (let i = 0; i < lvl4Arr.length; i++) {
            if (snake.x + 20 > lvl4Arr[i].x && snake.x < lvl4Arr[i].x + 20 && snake.y + 20 > lvl4Arr[i].y && snake.y < lvl4Arr[i].y + 20) {
                snake.alive = false;
                screenWidth < 600 ? topRight.textContent = 'Game Over! Tap Here!' : topRight.textContent = 'Game Over! Press Space!';
            }
        }
    }
}

function level4Plus() { // Will call the random rectangle generator with the amount set to the currentLevel
    if (currentLevel >= 4) {
    randoLevel.rect(currentLevel);
    }
}

function gameLoop() { // Where it all comes together and loops through, nearly everything is called from here
    ctx.drawImage(grass, 0, 0, canvas.width, canvas.height);
    if (currentLevel == 2) { //Drawing the obstacles for the specific level
        ctx.drawImage(wall, 80, 60, 23, 280);
        ctx.drawImage(wall, 300, 60, 23, 280);
    } else if (currentLevel == 3) {
        level3.rect(140, 25, 140);
    } else if (currentLevel >= 4) {
        for (let i = 0; i < lvl4Arr.length; i++) {
            let xval = lvl4Arr[i].x;
            let yval = lvl4Arr[i].y;
            ctx.drawImage(wall, 0, 0, 34, 34, xval, yval, 23, 23);
        }
    }

    if(snake.alive) { // Everything relating to the snake
        snake.x += snake.mvtX;
        snake.y += snake.mvtY;
        checkDirection(snake.mvtX, snake.mvtY);
        snake.tail.push({x: snake.x, y: snake.y});
        if (snake.tail.length > snake.long) {
            snake.tail.shift();
        }
        if (currentLevel == 1 && score >= goal || currentLevel == 2 && score >= goal2 || currentLevel == 3 && score >= goal3 || currentLevel >= 4 && score >= goal3 + currentLevel) { // Winning conditions
            screenWidth < 600 ? topRight.textContent = 'You Win! Tap Here!' : topRight.textContent = 'You Win! Press Space!';
            currentLevel++;
            snake.alive = false;
            level4Plus();
        }
    }

    chomp(); //Everything relating to the apple
    apple.sprite();

    if (currentLevel === 1) { //Goal display
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

document.querySelector("#game-state").addEventListener('click', function() {
    reset();
});

// Controls for the mobile buttons 
upArrow.addEventListener('touchstart', function(e) {
    let up = {keyCode: 38};
    movement(up);
});
rightArrow.addEventListener('touchstart', function(e) {
    let right = {keyCode: 39};
    movement(right);
});
downArrow.addEventListener('touchstart', function(e) {
    let down = {keyCode: 40};
    movement(down);
});
leftArrow.addEventListener('touchstart', function(e) {
    let left = {keyCode: 37};
    movement(left);
});

screenWidth > 600 ? fps = 125 : fps = 100;
setInterval(gameLoop, fps);