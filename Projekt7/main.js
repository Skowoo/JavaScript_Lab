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
const gravityForceInput = document.getElementById('gravity')
let gravityForce;
let mouseOnCanvas = false
let mousePosX;
let mousePosY;
let balls = [];
let animation;

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
canvas.addEventListener('mouseenter', () => mouseOnCanvas = true)
canvas.addEventListener('mouseleave', () => mouseOnCanvas = false)
canvas.addEventListener('mousemove', trackMouse)
canvas.addEventListener('click', () => mouseOnCanvas = !mouseOnCanvas)

function trackMouse(e) {
    mousePosX = e.clientX - canvas.offsetLeft
    mousePosY = e.clientY - canvas.offsetTop
}


class Ball {
    constructor(x, y, speed, radius, colorArray) {
        this.x = x;
        this.y = y;
        this.vx = speed * (Math.random() - 0.5);
        this.vy = speed * (Math.random() - 0.5);
        this.radius = radius;
        this.colorArray = colorArray;
    }

    move() {
        if(mouseOnCanvas) {
            let distanceX = mousePosX - this.x
            let velX = Math.abs(distanceX) / gravityForce
            this.x = distanceX > 0 ? this.x + velX : this.x - velX

            let distanceY = mousePosY - this.y
            let velY = Math.abs(distanceY) / gravityForce
            this.y = distanceY > 0 ? this.y + velY : this.y - velY
        }
        else {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                this.vx = -this.vx;
            }
    
            if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                this.vy = -this.vy;
            }
    
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba('+ (this.colorArray[0]) + ',' + (this.colorArray[1]) + ',' + (this.colorArray[2]) + ',1)';
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
    gravityForce = parseInt(gravityForceInput.value)

    ctx.canvas.width  = 0.95 * window.innerWidth;
    ctx.canvas.height = 0.9 * window.innerHeight;

    balls = [];
    
    for (let i = 0; i < numBalls; i++) {
        let x = Math.random() * (canvas.width - 2 * radius) + radius;
        let y = Math.random() * (canvas.height - 2 * radius) + radius;
        let color;
        if (discoMode)
            color = [(Math.random() * 255), (Math.random() * 255), (Math.random() * 255),]
        else
            color = [0,0,0]

        balls.push(new Ball(x, y, speed, radius, color));
    }

    function drawLines() {
        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                let dx = balls[i].x - balls[j].x;
                let dy = balls[i].y - balls[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < distance) {
                    if (discoMode)
                        ctx.strokeStyle = 'rgba('+ 
                            ((balls[i].colorArray[0] + balls[j].colorArray[0]) / 2) + ',' + 
                            ((balls[i].colorArray[1] + balls[j].colorArray[1]) / 2) + ',' + 
                            ((balls[i].colorArray[2] + balls[j].colorArray[2]) / 2) + ',' + lineThickness +')';
                    else
                        ctx.strokeStyle = 'rgba(0,0,0,' + lineThickness + ')';

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
        drawLines();
        for (const ball of balls) {
            ball.move();
            ball.draw();
        }        
        animation = requestAnimationFrame(animate);
    }
    animate();
}