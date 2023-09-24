import Node, { NodeOptions } from './Node';

export type NodeTextOptions = NodeOptions & {
  color?: string;
  text?: string;
};

export default class NodeText extends Node {
  color: string = '#ccc';
  text: string = '';

  constructor(options: NodeTextOptions) {
    super(options);
    this.color = options.color || this.color;
    this.text = options.text || this.text;
  }

  render(context: CanvasRenderingContext2D) {
    context.font = this.size.y + 'px serif';
    context.fillStyle = this.color;
    context.fillText(this.text, -(this.size.x / 2), -(this.size.y / 2), this.size.x);
  }
}
