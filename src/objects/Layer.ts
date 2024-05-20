import Canvas from './Canvas';
import Vector2 from './Vector2';
import Node from './Node';

export default class Layer {
  context: CanvasRenderingContext2D;
  canvas: Canvas;
  size: Vector2;
  name: string;

  constructor(name: string, size: Vector2, index = 0, offset: Vector2 = new Vector2(0, 0)) {
    this.size = size;
    this.name = name;
    const canvasElement = Canvas.createCanvas(offset.x, offset.y, size.x, size.y, index, `layer-${name}`);
    this.canvas = new Canvas(canvasElement);
    this.context = this.canvas.context;
  }

  /**
   *
   * @param {HTMLElement} element
   */
  mount(element: HTMLElement) {
    element.appendChild(this.canvas.canvas);
  }

  clear() {
    this.context.clearRect(0, 0, this.size.x, this.size.y);
  }

  /**
   *
   * @param {Node|Node[]} nodes
   */
  draw(nodes: Node | Node[]) {
    if (nodes instanceof Node) {
      return nodes.draw(this.context);
    }

    if (nodes instanceof Array) {
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].draw(this.context);
      }
    }
  }
}
