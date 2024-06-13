const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let gravityForce
let mouseOnCanvas = false
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
    constructor(x, y, speed, mass, colorArray) {
        this.x = x;
        this.y = y;
        this.vx = speed * (Math.random() - 0.5);
        this.vy = speed * (Math.random() - 0.5);
        this.colorArray = colorArray;
        this.mass = mass
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
            if (dist < (50 +(this.mass / Math.PI))) {
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
        ctx.fillStyle = 'rgba('+ (this.colorArray[0]) + ',' + (this.colorArray[1]) + ',' + (this.colorArray[2]) + ',1)';
        ctx.fill();
        ctx.closePath();
    }
}

function flow(smaller, bigger, dist){
    ctx.strokeStyle = 'rgba('+ 
    bigger.colorArray[0] + ',' + 
    bigger.colorArray[1] + ',' + 
    bigger.colorArray[2] + ',' + 
    smaller.mass / 30 +')';
    ctx.beginPath();
    ctx.moveTo(bigger.x, bigger.y);
    ctx.lineTo(smaller.x, smaller.y);
    ctx.stroke();
    smaller.mass--
    bigger.mass += (1 / dist)
    if (smaller.mass < 1){
        replaceBall(smaller)
    }
}

function start() {
    ctx.canvas.width  = 0.98 * window.innerWidth;
    ctx.canvas.height = 0.97 * window.innerHeight;
    
    mousePosX = canvas.width / 2
    mousePosY = canvas.height / 2
    player = new Ball(mousePosX, mousePosY, 1, 25, [(Math.random() * 255), (Math.random() * 255), (Math.random() * 255),])
    addFood((canvas.width + canvas.height) / 10)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const ball of foodBalls) {
            ball.draw();
        }

        player.move()
        player.eat()
        player.draw()        
        
        animation = requestAnimationFrame(animate);
    }
    animate();
}

function addFood(quantity){
    for (let i = 0; i < quantity; i++) {
        let x = Math.random() * (canvas.width - 2 * 5) + 5;
        let y = Math.random() * (canvas.height - 2 * 5) + 5;
        let color = [(Math.random() * 255), (Math.random() * 255), (Math.random() * 255),]
        foodBalls.push(new Ball(x, y, 0, (Math.random() * (player.mass)), color));
    }
}

function replaceBall(ball){
    ball.x = Math.random() * (canvas.width - 2 * 5) + 5;
    ball.y = Math.random() * (canvas.height - 2 * 5) + 5;
    ball.mass = (Math.random() * (player.mass * 1.2))
}

start()