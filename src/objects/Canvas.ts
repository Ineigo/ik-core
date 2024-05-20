export default class Canvas {
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  element: HTMLCanvasElement | null = null;

  constructor(game_box: string | HTMLCanvasElement = '') {
    if (game_box instanceof HTMLCanvasElement) {
      this.initCanvas(game_box);
      return;
    }

    if (typeof game_box === 'string') {
      const box = document.getElementById(game_box);
      if (!box) {
        throw new Error('Not element exists');
      }

      if (box instanceof HTMLCanvasElement) {
        this.initCanvas(box);
      } else {
        throw new Error('Not valid game_box');
      }
    }
    throw new Error('Not valid game_box');
  }

  private initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw require("Can't create context");
    }
    this.context = ctx;

    console.info('2d Context created', this);
  }

  static createCanvas(offsetX: number, offsetY: number, width: number, height: number, index: number | null = null, name?: string) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `position: absolute; left: ${offsetX}; top: ${offsetY}`;
    canvas.dataset.name = name;
    canvas.width = width;
    canvas.height = height;
    if (index !== null) {
      canvas.style.zIndex = String(100 + index);
    }
    return canvas;
  }
}

function require(msg: string) {
  return new Error('[Canvas]: ' + msg);
}
