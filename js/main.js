//DOM References 
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
console.log("hie")
//Game Pieces 
var snake = {
    tail: [],
    x: 20,
    y: 200,
    long: 0,
    mvtX: 0,
    mvtY: 0,
}


//Functions

var going = function(x, y) {
    snake.mvtX = x * 10;
    snake.mvtY = y * 10;
}

function movement(evt) {//87 65 83 68
    console.log(evt.keyCode);
    switch (evt.keyCode) {
        case (87): //up
            going(0, -1);
            break;
        case (68): //right
            going(1, 0);
            break;
        case (83): //bottom
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
    ctx.fillRect(snake.x, snake.y, 20, 20);
    snake.x += snake.mvtX;
    snake.y += snake.mvtY;
}

//Event Handlers 
document.addEventListener('keydown', function(e) {
    movement(e);
})
setInterval(gameLoop, 1000/5) 