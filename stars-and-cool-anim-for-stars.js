class Star {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 1.5 + 1; // 1px - 2.5px
    this.opacity = 0.3 + Math.random() * 0.4;
  }

  update(width, height) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    if (Math.random() < 0.01) {
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
    }

    if (Math.random() < 0.02) {
      this.opacity = 0.2 + Math.random() * 0.8;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }
}

const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
const STAR_COUNT = 60;
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(new Star(canvas.width, canvas.height));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    star.update(canvas.width, canvas.height);
    star.draw(ctx);
  }
  requestAnimationFrame(animate);
}

resizeCanvas();
initStars();
animate();

window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
});
