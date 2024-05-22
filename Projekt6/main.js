let ballPosition = { x: 0, y: 0 };
let holePosition = { x: 0, y: 0 };
let animationFrameId;
let startTime;
let gameActive = false;
let currentOrientation = { alpha: 0, beta: 0, gamma: 0 };
let holesCounter = 0;
let hole = []
const ball = document.getElementById('ball');
const gameContainer = document.getElementById('game-container');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', startGame);
window.addEventListener('deviceorientation', handleOrientation);

function startGame() {
    gameActive = true;
    startTime = performance.now();

    holesCounter++

    hole = []
    for (let e = 1; e <= holesCounter; e++)
    {
        var newHole = document.createElement('div')
        newHole.innerHTML = e
        newHole.id = "hole"
        gameContainer.appendChild(newHole);
        hole.push(newHole)
    }

    hole.forEach((hole) => {
        setPosition(hole, getRandomPosition(hole));
    })    

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
    currentOrientation.beta = event.beta;
    currentOrientation.gamma = event.gamma;
}

function update() {
    const speed = 0.3;

    ballPosition.x += currentOrientation.gamma * speed;
    ballPosition.y += currentOrientation.beta * speed;

    const containerRect = gameContainer.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    ballPosition.x = Math.max(0, Math.min(containerRect.width - ballRect.width, ballPosition.x));
    ballPosition.y = Math.max(0, Math.min(containerRect.height - ballRect.height, ballPosition.y));

    setPosition(ball, ballPosition);

    const currentTime = (performance.now() - startTime) / 1000;
    timerElement.textContent = `Time: ${currentTime.toFixed(2)}s`;

    if (ballInHole(ball, hole[0])) {
        gameActive = false;
        startButton.disabled = false;
        alert(`Zwycięstwo! Czas: ${currentTime.toFixed(2)}s`);
        return;
    }

    animationFrameId = requestAnimationFrame(update);
}

function ballInHole(ball, hole) {
    const ballRect = ball.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();

    return !(
        ballRect.right < holeRect.left ||
        ballRect.left > holeRect.right ||
        ballRect.bottom < holeRect.top ||
        ballRect.top > holeRect.bottom
    );
}