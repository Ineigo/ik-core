import Canvas from './Canvas';
import Vector2 from './Vector2';

export default class Layer {
	/** @property {CanvasRenderingContext2D} */
	context = null;
	/** @property {Canvas} */
	canvas = null;

	constructor(size, index = 0, offset = Vector2(0, 0)) {
		const canvasElement = Canvas.createCanvas(offset.x, offset.y, size.x, size.y, index);
		this.canvas = new Canvas(canvasElement);
		this.context = this.canvas.context;
	}

	mount(element) {
		element.appendChild(this.canvas.canvas);
	}
}
