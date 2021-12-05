const canvas = document.getElementById('snake');
const restart = document.getElementById('restart');
const ctx = canvas.getContext('2d');
const box = 32;
const groundimg = new Image();
groundimg.src = 'ground.png';
const foodimg = new Image();
foodimg.src = 'food.png';

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const left = new Audio();
const right = new Audio();
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";



// create a snake 
let snake = [];
snake[0] = {
    x: 9*box,
    y: 10*box
}

// create a food
let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

//score 
let score = 0;
let d;
// direction of snake 
document.addEventListener('keydown',control);
function control(event){
    if(event.keyCode == 37){
        left.play();
        d = "LEFT";
    }
    else if(event.keyCode == 38){
        up.play();
        d = "UP";
    }
    else if(event.keyCode == 39){
        right.play();
        d = "RIGHT";
    }
    else if(event.keyCode == 40){
        down.play();
        d = "DOWN";
    }
}

// if snake collide itself game needs to be stop

function collision(head,array){
    for (let i = 0; i < array.length; i++) {
      if(head.x == array[i].x && head.y == array[i].y){
         return true;
      }     
    }
    return false;
}
function draw(){
    ctx.drawImage(groundimg,0,0);
    for(let i=0; i<snake.length; i++){
        ctx.fillStyle = (i==0)? "#00cc00" : "#00ff00";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodimg,food.x,food.y);

    // HEAD POSITION
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //  control the snake as per user direction
     if(d == "LEFT") snakeX -= box;
     if(d == "UP") snakeY -= box;
     if(d == "RIGHT") snakeX += box;
     if(d == "DOWN") snakeY += box;

     // if snake eats food 
     if(snakeX == food.x && snakeY == food.y){
         score++;
         eat.play();
         food = {
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+3) * box
        } 
     } else{
        snake.pop();
    }

    let newhead = {
        x: snakeX,
        y: snakeY
    }
    // game over function
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newhead,snake)){
        clearInterval(game);
        dead.play();
    } 

    snake.unshift(newhead);


    ctx.fillStyle = "white";
    ctx.font = "45px Arial";
    ctx.fillText(score,2.2*box,1.6*box);
}

let game = setInterval(draw,100);

// on click restart button
restart.addEventListener('click',function(){
window.location.reload();
});