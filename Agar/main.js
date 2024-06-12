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
    constructor(x, y, speed, radius, colorArray) {
        this.x = x;
        this.y = y;
        this.vx = speed * (Math.random() - 0.5);
        this.vy = speed * (Math.random() - 0.5);
        this.radius = radius;
        this.colorArray = colorArray;
        this.mass = radius / 1000
    }

    move() {
        this.x += (mousePosX - this.x) / 100
        this.y += (mousePosY - this.y) / 100        
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
    ctx.canvas.width  = 0.98 * window.innerWidth;
    ctx.canvas.height = 0.97 * window.innerHeight;
    
    mousePosX = canvas.width / 2
    mousePosY = canvas.height / 2
    player = new Ball(mousePosX, mousePosY, 1, 25, [(Math.random() * 255), (Math.random() * 255), (Math.random() * 255),])
    addFood((canvas.width + canvas.height) / 5)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const ball of foodBalls) {
            ball.draw();
        }
        player.draw()
        player.move()
        animation = requestAnimationFrame(animate);
    }
    animate();
}

function addFood(quantity){
    for (let i = 0; i < quantity; i++) {
        let x = Math.random() * (canvas.width - 2 * 5) + 5;
        let y = Math.random() * (canvas.height - 2 * 5) + 5;
        let color;
        color = [(Math.random() * 255), (Math.random() * 255), (Math.random() * 255),]

        foodBalls.push(new Ball(x, y, 0, 5, color));
    }
}

start()