let ball, hole, gameContainer, timerElement, startButton;
let ballPosition = { x: 0, y: 0 };
let holePosition = { x: 0, y: 0 };
let animationFrameId;
let startTime;
let gameActive = false;
let currentOrientation = { alpha: 0, beta: 0, gamma: 0 };

document.addEventListener('DOMContentLoaded', () => {
    ball = document.getElementById('ball');
    hole = document.getElementById('hole');
    gameContainer = document.getElementById('game-container');
    timerElement = document.getElementById('timer');
    startButton = document.getElementById('start-button');
    
    startButton.addEventListener('click', startGame);

    window.addEventListener('deviceorientation', handleOrientation);
});

function startGame() {
    gameActive = true;
    startTime = performance.now();
    ballPosition = getRandomPosition(ball);
    holePosition = getRandomPosition(hole);

    setPosition(ball, ballPosition);
    setPosition(hole, holePosition);

    timerElement.textContent = 'Time: 0.00s';
    startButton.disabled = true;
    
    update();
}

function getRandomPosition(element) {
    const containerRect = gameContainer.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const x = Math.random() * (containerRect.width - elementRect.width);
    const y = Math.random() * (containerRect.height - elementRect.height);
    return { x, y };
}

function setPosition(element, position) {
    element.style.transform = `translate(${position.x}px, ${position.y}px)`;
}

function handleOrientation(event) {
    if (!gameActive) return;

    currentOrientation.beta = event.beta;
    currentOrientation.gamma = event.gamma;

    console.log(event);
}

function update() {
    if (!gameActive) return;

    const speed = 0.1;

    // Zmiana pozycji kulki w oparciu o wartości beta i gamma
    ballPosition.x += currentOrientation.gamma * speed;
    ballPosition.y += currentOrientation.beta * speed;

    const containerRect = gameContainer.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    // Upewnij się, że kulka nie wychodzi poza obszar gry
    ballPosition.x = Math.max(0, Math.min(containerRect.width - ballRect.width, ballPosition.x));
    ballPosition.y = Math.max(0, Math.min(containerRect.height - ballRect.height, ballPosition.y));

    setPosition(ball, ballPosition);

    const currentTime = (performance.now() - startTime) / 1000;
    timerElement.textContent = `Time: ${currentTime.toFixed(2)}s`;

    if (checkCollision(ball, hole)) {
        gameActive = false;
        startButton.disabled = false;
        alert(`Zwycięstwo! Czas: ${currentTime.toFixed(2)}s`);
        return;
    }

    animationFrameId = requestAnimationFrame(update);
}

function checkCollision(ball, hole) {
    const ballRect = ball.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();

    return !(
        ballRect.right < holeRect.left ||
        ballRect.left > holeRect.right ||
        ballRect.bottom < holeRect.top ||
        ballRect.top > holeRect.bottom
    );
}