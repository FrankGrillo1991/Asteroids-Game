// Get the canvas elements and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Player spaceship
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    angle: 0,
    speed: 0,
    rotateSpeed: 0.05,
    moveSpeed: 0.1,
    dx: 0,
    dy: 0,
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(0, -this.radius);
        ctx.lineTo(-this.radius, this.radius);
        ctx.lineTo(this.radius, this.radius);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
    },
    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Keep the player within the canvas
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
};

// Handle keyboard input
const keys = {
    left: false,
    right: false,
    up: false
};

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowLeft") keys.right = true;
    if (e.key === "ArrowUp") keys.up = true;
});

document.addEventListener("keyup", () => {
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
    if (e.key === "ArrowUp") keys.up = false;
});

// Update player position based on input
function update() {
    if (keys.left) player.angle -= player.rotateSpeed;
    if (keys.right) player.angle += player.rotateSpeed;

    if (keys.up) {
        player.dx = Math.cos(player.angle) * player.moveSpeed;
        player.dy = Math.sin(player.angle) * player.moveSpeed;
    } else {
        player.dx = 0;
        player.dy = 0
    }

    player.update();
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
}

// Main game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();