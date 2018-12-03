import Canvas from './Canvas';
import Vector2 from './Vector2';
import Node from './Node';

export default class Layer {
	/** @property {CanvasRenderingContext2D} */
	context = null;
	/** @property {Canvas} */
    canvas = null;
    /** @property {Vector2} */
	size = null;
    
	constructor(size, index = 0, offset = Vector2(0, 0)) {
        this.size = size;
		const canvasElement = Canvas.createCanvas(offset.x, offset.y, size.x, size.y, index);
		this.canvas = new Canvas(canvasElement);
		this.context = this.canvas.context;
	}

    /**
     * 
     * @param {HTMLElement} element 
     */
	mount(element) {
		element.appendChild(this.canvas.canvas);
    }

    clear() {
        this.context.clearRect(0, 0, this.size.x, this.size.y);
    }

    /**
     * 
     * @param {Node|Node[]} nodes 
     */
    draw(nodes) {
        if (nodes instanceof Node) {
            return nodes.draw(this.context);
        }

        if (nodes instanceof Array) {
            for(let i = 0; i < nodes.length; i++) {
                nodes[i].draw(this.context);
            }
        }
    }
}
