const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let mousePosX
let mousePosY
let foodBalls = []
let animation
let player

canvas.addEventListener('mousemove', trackMouse)
function trackMouse(e) {
    mousePosX = e.clientX - canvas.offsetLeft
    mousePosY = e.clientY - canvas.offsetTop
}

class Ball {
    constructor(x, y, speed, mass, color) {
        this.x = x;
        this.y = y;
        this.vx = speed * (Math.random() - 0.5);
        this.vy = speed * (Math.random() - 0.5);
        this.color = color;
        this.mass = mass
    }

    activate(){
        this.move()
        this.eat()
        this.draw()   
    }

    move() {
        this.x += (mousePosX - this.x) / this.mass
        this.y += (mousePosY - this.y) / this.mass     
    }

    eat(){
        for (let i = 0; i < foodBalls.length; i++) {
            let dx = this.x - foodBalls[i].x;
            let dy = this.y - foodBalls[i].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (10 + (this.mass / Math.PI) + (foodBalls[i].mass / Math.PI))) {
                if (this.mass <= foodBalls[i].mass)
                    flow(this, foodBalls[i], dist)
                else
                    flow(foodBalls[i], this, dist)
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.abs((this.mass / Math.PI)), 0, Math.PI * 2);
        ctx.fillStyle = this.color
        ctx.fill();
        ctx.closePath();
    }
}

function flow(smaller, bigger, dist){
    ctx.strokeStyle = bigger.color
    ctx.beginPath();
    ctx.moveTo(bigger.x, bigger.y);
    ctx.lineTo(smaller.x, smaller.y);
    ctx.stroke();
    smaller.mass--
    bigger.mass += (1 / 10)
    if (smaller.mass < 1){
        replaceBall(smaller)
    }
}

function start() {
    ctx.canvas.width  = 0.95 * window.innerWidth;
    ctx.canvas.height = 0.95 * window.innerHeight;
    
    mousePosX = canvas.width / 2
    mousePosY = canvas.height / 2
    player = new Ball(mousePosX, mousePosY, 1, 25, getRandomColor())
    addFood((canvas.width + canvas.height) / 10)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const ball of foodBalls) {
            ball.draw();
        }     
        player.activate()

        if (player.mass < 1){
            cancelAnimationFrame(animation);
            ctx.font = "50px Arial";
            ctx.fillText("Porażka!", (canvas.width / 2) - 50, canvas.height / 2);
        }

        animation = requestAnimationFrame(animate);
    }
    animate();
}

function addFood(quantity){
    for (let i = 0; i < quantity; i++) {
        let x = Math.random() * (canvas.width - 2 * 5) + 5;
        let y = Math.random() * (canvas.height - 2 * 5) + 5;
        let color = getRandomColor()
        foodBalls.push(new Ball(x, y, 0, (Math.random() * (player.mass)), color));
    }
}

function replaceBall(ball){
    ball.x = Math.random() * (canvas.width - 2 * 5) + 5;
    ball.y = Math.random() * (canvas.height - 2 * 5) + 5;
    ball.mass = (Math.random() * (player.mass * 1.1))
}

function getRandomColor(){
    return 'rgba('+ Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ',1)'
}

start()