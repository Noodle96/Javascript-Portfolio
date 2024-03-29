const playBoard = document.querySelector('.play-board');
const spanScore = document.querySelector('.score');
const spanHighScore = document.querySelector('.score-high');
const controls = document.querySelectorAll('.controls i');
let foodX, foodY, snakeX=10, snakeY=5;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let gamerOver = false;
let setItervalId;
let score = 0;
//Getting high score from the localSotorage
let highScore = localStorage.getItem('high-score') || 0;
spanHighScore.innerHTML = `High Score: ${highScore}`;

const changeRandomFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) +1;
    foodY = Math.floor(Math.random() * 30) +1;
}

const changeDirection = (e) => {
    // console.log(e);
    // change velocity value based on key press
    if(e.key === 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

const handleGameOver = () =>{
    //Clearing the timer and reloading  the pagen on Game Over
    clearInterval(setItervalId);
    alert("Game Over!!, press Ok to replay");
    location.reload();
}

controls.forEach( key => {
    key.addEventListener("click", () => changeDirection({key:key.dataset.key}));
});

const initGame = () => {
    if(gamerOver)return handleGameOver();
    // console.log('initX:', snakeX, ",",snakeY);
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    //Checking if the snake hit the food
    if(snakeX === foodX && snakeY == foodY){
        changeRandomFoodPosition();
        //pushing food position to snake body array
        snakeBody.push([foodX,foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high-score', highScore);
        spanScore.innerHTML = `Score: ${score}`;
        spanHighScore.innerHTML = `High Score: ${highScore}`;
    }
    //shifting forward the values of the elements in the snake body by one
    // console.log('entrando for');
    for(let i = snakeBody.length -1; i > 0 ; i--){
        snakeBody[i] = snakeBody[i-1];
        // console.log(i,"=>",snakeBody[i]);
    }

    //setting first element of snake body to current snake position 
    snakeBody[0] = [snakeX,snakeY];
    // console.log('snakebody 0');
    // console.log(0,"=>",snakeBody[0]);

    //Updating the snake'head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gamerOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        //adding a div for each part of the snake'body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;    
        // Checking if the snake head hit the body, if so set GameOver true
        if(i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gamerOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
changeRandomFoodPosition();
setItervalId = setInterval(initGame, 125);
document.addEventListener('keydown',changeDirection);
