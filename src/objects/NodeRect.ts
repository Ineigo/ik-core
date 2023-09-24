import Node, { NodeOptions } from './Node';

export type NodeRectOptions = NodeOptions & {
  color?: string;
};

export default class NodeRect extends Node {
  color = '#ccc';

  constructor(options: NodeRectOptions) {
    super(options);
    this.color = options.color || this.color;
  }

  render(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(-(this.size.x / 2), -(this.size.y / 2), this.size.x, this.size.y);
  }
}
