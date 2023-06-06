export interface BallProps {
  radius: number;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}
class Ball {
  radius: number;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = rand(10, 30);
    this.color = randomColor();
    this.vx = rand(-5, 5);
    this.vy = rand(-5, 5);
    this.ax = rand(-5, 5) / 100;
    this.ay = rand(-5, 5) / 100;
  }
  update() {
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;
    this.color = changeColor(this.color);
    if (this.radius > 0) this.radius -= 0.4;
  }
}

function rand(a: number, b: number) {
  return Math.floor(Math.random() * (b - a)) + a;
}
function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function changeColor(color: string) {
  const arr = color.split('')
  const letters = '0123456789ABCDEF';
  const emphasis = Math.floor(Math.random() * 5) + 1;
  arr[emphasis] = letters[Math.floor(Math.random() * 16)];
  return arr.join('');
}

export default Ball;
