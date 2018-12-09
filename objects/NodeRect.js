import Node from './Node';

export default class NodeRect extends Node {
	color = '#ccc';

	constructor(options) {
		super(options);
		this.color = options.color || this.color;
	}

	/**
     * @private
     * @override
     * @param {CanvasRenderingContext2D} context 
     */
	render(context) {
		context.fillStyle = this.color;
		context.fillRect(-(this.size.x / 2), -(this.size.y / 2), this.size.x, this.size.y);
	}
}

function require(msg) {
	throw new Error('[NodeRect]: ' + msg);
}
