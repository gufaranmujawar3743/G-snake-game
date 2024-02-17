const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreboard = document.getElementById('score');
const pointSound = document.getElementById('pointSound');
const gameOverSound = document.getElementById('gameOverSound');

const box = 20;
let snake = [{x: 200, y: 200}];
let direction = 'right';
let food = {x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box};
let score = 0;
let speed = 200;

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'red';
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}

function drawFood() {
    ctx.fillStyle = 'green';
    ctx.fillRect(food.x, food.y, box, box);
}

function moveSnake() {
    let head = {x: snake[0].x, y: snake[0].y};

    if (direction === 'up') head.y -= box;
    if (direction === 'down') head.y += box;
    if (direction === 'left') head.x -= box;
    if (direction === 'right') head.x += box;

    if (head.x === food.x && head.y === food.y) {
        food = {x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box};
        score++;
        scoreboard.textContent = score;
        pointSound.play();
        if (score % 5 === 0) {
            clearInterval(game);
            speed -= 10;
            game = setInterval(updateGame, speed);
        }
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            gameOver();
        }
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();
    drawFood();
    moveSnake();
    checkCollision();
}

function changeDirection(event) {
    const key = event.keyCode;

    if (key === 37 && direction !== 'right') direction = 'left';
    if (key === 38 && direction !== 'down') direction = 'up';
    if (key === 39 && direction !== 'left') direction = 'right';
    if (key === 40 && direction !== 'up') direction = 'down';
}

function gameOver() {
    clearInterval(game);
    gameOverSound.play();
    gameOverPopup.style.display = 'block';
}

function restartGame() {
    snake = [{x: 200, y: 200}];
    direction = 'right';
    food = {x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box};
    score = 0;
    scoreboard.textContent = score;
    gameOverPopup.style.display = 'none';
    speed = 200;
    game = setInterval(updateGame, speed);
}

document.addEventListener('keydown', changeDirection);

let game = setInterval(updateGame, speed);
