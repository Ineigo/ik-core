import Node, { NodeOptions } from './Node';
import Vector2 from './Vector2';

export type NodeImageOptions = NodeOptions & {
  scale?: number;
  filename: string;
};

export default class NodeImage extends Node {
  color: string = '#ccc';
  loaded: boolean = false;
  scale: number;
  image: HTMLImageElement;

  constructor(options: NodeImageOptions) {
    options.size = new Vector2(0, 0);
    super(options);
    this.scale = options.scale || 1;
    this.image = new Image();
    this.image.src = options.filename;
    this.image.onload = this.initIMG;
  }

  initIMG = () => {
    this.loaded = true;
    this.size = new Vector2(this.image.width * this.scale, this.image.height * this.scale);
    console.log('[NodeImage]: Load Sprite ->', this.image.src);
  };

  render(context: CanvasRenderingContext2D) {
    if (!this.loaded) {
      return;
    }

    context.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      -(this.size.x / 2),
      -(this.size.y / 2),
      this.size.x,
      this.size.y
    );
  }
}
