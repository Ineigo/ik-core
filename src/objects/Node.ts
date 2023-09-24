import Vector2 from './Vector2';

export type NodeOptions = {
  size: Vector2;
  position: Vector2;
  angle?: number;
  children?: Node[];
};

export default class Node {
  position: Vector2;
  size: Vector2;
  angle: number = 0;
  children: Node[] = [];
  parent: Node | null = null;
  static TO_RADIANS = Math.PI / 180;

  constructor({ position, size, angle = 0, children = [] }: NodeOptions) {
    this.position = position;
    this.angle = angle;
    this.size = size;
    this.children = children.map((node) => {
      node.parent = this;
      return node;
    });
  }

  add(node: Node) {
    node.parent = this;
    this.children.push(node);
  }

  /**
   * @param {Vector2} vector
   */
  move(vector: Vector2) {
    this.position.plus(vector);
  }

  rotate(angle: number) {
    this.angle += angle;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
    context.rotate(this.angle * Node.TO_RADIANS);
    this.render(context);
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].draw(context);
    }
    context.restore();
  }

  render(_: CanvasRenderingContext2D) {
    return require('render not override');
  }
}

function require(msg: string) {
  throw new Error('[Node]: ' + msg);
}
