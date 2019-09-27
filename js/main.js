//DOM References 
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
console.log("hie")
//Game Pieces 
var snake = {
    length: [],
    x: 20,
    y: 200,
}



//Functions
function movement(evt) {//38 39 40 37
    console.log(evt.keyCode);
    switch (evt.keyCode) {
        case (37):
            setDir(left);
    }
}

function gameLoop() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);//drawing canvas 
    
    ctx.fillStyle = "white";
    ctx.fillRect(snake.x, snake.y, 20, 20);
}

//Event Handlers 
document.addEventListener('keydown', function(e) {
    movement(e);
})
setInterval(gameLoop, 1000/5) 