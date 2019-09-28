//DOM References 
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//Game Pieces 
var snake = {
    tail: [],
    x: 20,
    y: 200,
    long: 1,
    mvtX: 0,
    mvtY: 0,
}

var apple = {
    x: Math.floor(Math.random() *380),
    y: Math.floor(Math.random() *380),
    newApple: function() {
        x = Math.floor(Math.random() *380);
        y = Math.floor(Math.random() *380);
    }
}
//Functions

function appleLoc() {
    let x = Math.floor(Math.random() * 380);
    let y = Math.floor(Math.random() * 380);
    console.log(x);
    ctx.fillStyle = "red";
    food = ctx.fillRect(x, y, 20, 20);
}
appleLoc();
console.log(food);
var going = function(x, y) {
    snake.mvtX = x * 10;
    snake.mvtY = y * 10;
}
// function wallDetection() {
//     if (snake.x >= canvas.width) {
//         //TODO: ADD gameOver() here to end the game 
//         snake.mvtX = 0;
//         console.log('the if ')
//     } else {
//         console.log('else')
//     }
// }

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

function gameLoop() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);//drawing canvas 
    
    ctx.fillStyle = "white";
    ctx.fillRect(snake.x, snake.y, 20, 20);//Drawing snake
    snake.x += snake.mvtX;
    snake.y += snake.mvtY;
    
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, 20, 20);
}

//Event Handlers 
document.addEventListener('keydown', function(e) {
    movement(e);
})
setInterval(gameLoop, 1000/10);