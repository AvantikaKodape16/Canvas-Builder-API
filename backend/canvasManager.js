import { createCanvas, loadImage } from 'canvas';

export default class CanvasManager {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, width, height);
  }

  addRectangle({ x, y, width, height, color }) {
    this.ctx.fillStyle = color || 'black';
    this.ctx.fillRect(x, y, width, height);
  }

  addText({ text, x, y, fontSize, color }) {
    this.ctx.fillStyle = color || 'black';
    this.ctx.font = `${fontSize || 16}px Arial`;
    this.ctx.fillText(text, x, y);
  }

  toBuffer() {
    return this.canvas.toBuffer('image/png');
  }
}