const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const numBallsInput = document.getElementById('numBalls');
const distanceInput = document.getElementById('distance');
const speedInput = document.getElementById('speed');
const ballSizeInput = document.getElementById('ballSize');
const linesSizeInput = document.getElementById('lineSize');
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

class Ball {
    constructor(x, y, speed, radius, colorArray, id) {
        this.x = x;
        this.y = y;
        this.vx = speed * (Math.random() - 0.5) / 10;
        this.vy = speed * (Math.random() - 0.5) / 10;
        this.radius = radius;
        this.colorArray = colorArray;
        this.id = id
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

    ctx.canvas.width  = 0.95 * window.innerWidth;
    ctx.canvas.height = 0.9 * window.innerHeight;

    balls = [];
    
    for (let i = 1; i <= numBalls; i++) {
        let x = Math.random() * (canvas.width - 2 * radius) + radius;
        let y = Math.random() * (canvas.height - 2 * radius) + radius;
        let color = [(Math.random() * 255), (Math.random() * 255), (Math.random() * 255),]
        balls.push(new Ball(x, y, speed, radius, color, i));
    }

    function drawLines() {
        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                let dx = balls[i].x - balls[j].x;
                let dy = balls[i].y - balls[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < (distance + balls[i].radius + balls[j].radius) ) {
                    ctx.strokeStyle = 'rgba('+ 
                        ((balls[i].colorArray[0] + balls[j].colorArray[0]) / 2) + ',' + 
                        ((balls[i].colorArray[1] + balls[j].colorArray[1]) / 2) + ',' + 
                        ((balls[i].colorArray[2] + balls[j].colorArray[2]) / 2) + ',' + lineThickness +')';
                    ctx.beginPath();
                    ctx.moveTo(balls[i].x, balls[i].y);
                    ctx.lineTo(balls[j].x, balls[j].y);
                    ctx.stroke();
                    if (balls[j].mass <= balls[i].mass)
                        flow(balls[j], balls[i])
                    else
                        flow(balls[i], balls[j])
                }
            }
        }
    }

    function flow(smaller, bigger){
        const impact = 0.05
        const minSpeed = 0.2
        const flowSpeed = 0.2
        ctx.strokeStyle = bigger.color
        ctx.beginPath();
        ctx.moveTo(bigger.x, bigger.y);
        ctx.lineTo(smaller.x, smaller.y);
        ctx.stroke();
        smaller.radius -= flowSpeed
        bigger.radius += (flowSpeed / 2)
        smaller.vx < minSpeed ? smaller.vx -= impact : smaller.vx += impact
        smaller.vy < minSpeed ? smaller.vy -= impact : smaller.vy += impact
        bigger.vx < minSpeed ? bigger.vx += impact : bigger.vx -= impact
        bigger.vy < minSpeed ? bigger.vy += impact : bigger.vy -= impact
        if (smaller.radius < 1){
            let index = balls.findIndex(obj => obj.id === smaller.id);
            balls.splice(index, 1)
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