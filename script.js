const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
const canvasSize = 400 / box;

let snake = [{ x: 10 * box, y: 10 * box }];
let food = { x: Math.floor(Math.random() * canvasSize) * box, y: Math.floor(Math.random() * canvasSize) * box };
let d;
let score = 0;

document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode === 37 && d !== 'RIGHT') d = 'LEFT';
    else if (event.keyCode === 38 && d !== 'DOWN') d = 'UP';
    else if (event.keyCode === 39 && d !== 'LEFT') d = 'RIGHT';
    else if (event.keyCode === 40 && d !== 'UP') d = 'DOWN';
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === 'LEFT') snakeX -= box;
    if (d === 'UP') snakeY -= box;
    if (d === 'RIGHT') snakeX += box;
    if (d === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * canvasSize) * box, y: Math.floor(Math.random() * canvasSize) * box };
    } else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, box, box);
}

function collision(head, array) {
    return array.some(part => part.x === head.x && part.y === head.y);
}

const game = setInterval(draw, 100);
