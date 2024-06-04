const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const numBallsInput = document.getElementById('numBalls');
const distanceInput = document.getElementById('distance');
const speedInput = document.getElementById('speed');
const ballSizeInput = document.getElementById('ballSize');
const linesSizeInput = document.getElementById('lineSize');
const discoCheck = document.getElementById('disco')

let colors = ['blue', 'red', 'orange', 'green', 'black', 'aqua', 'yellow', 'pink', 'cyan', 'brown']
let balls = [];
let animation;

class Ball {
    constructor(x, y, speed, radius, color) {
        this.x = x;
        this.y = y;
        this.vx = speed * (Math.random() - 0.5);
        this.vy = speed * (Math.random() - 0.5);
        this.radius = radius;
        this.color = color;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.vy = -this.vy;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

function start() {
    const numBalls = parseInt(numBallsInput.value);
    const distance = parseInt(distanceInput.value);
    const speed = parseInt(speedInput.value)
    const radius = parseInt(ballSizeInput.value);
    const lineThickness = parseFloat(linesSizeInput.value);
    const discoMode = discoCheck.checked;

    balls = [];
    for (let i = 0; i < numBalls; i++) {
        let x = Math.random() * (canvas.width - 2 * radius) + radius;
        let y = Math.random() * (canvas.height - 2 * radius) + radius;
        let color;
        if (discoMode)
            color = colors[Math.floor(Math.random() * colors.length)]
        else
            color = 'black'

        balls.push(new Ball(x, y, speed, radius, color));
    }

    function drawLines() {
        if (discoMode)
            ctx.strokeStyle = 'rgba('+ (Math.random() * 255) + ',' + (Math.random() * 255) + ',' + (Math.random() * 255) + ',' + lineThickness + ')';
        else
            ctx.strokeStyle = 'rgba(0,0,0,' + lineThickness + ')';

        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                let dx = balls[i].x - balls[j].x;
                let dy = balls[i].y - balls[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < distance) {
                    ctx.beginPath();
                    ctx.moveTo(balls[i].x, balls[i].y);
                    ctx.lineTo(balls[j].x, balls[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const ball of balls) {
            ball.move();
            ball.draw();
        }
        drawLines();
        animation = requestAnimationFrame(animate);
    }

    animate();
}

function reset() {
    cancelAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
}

startButton.addEventListener('click', () => {
    reset();
    start();
});

resetButton.addEventListener('click', reset);