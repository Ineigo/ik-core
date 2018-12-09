import Node from './Node';
import Vector2 from './Vector2';

export default class NodeImage extends Node {
	color = '#ccc';
	loaded = false;

	constructor(options) {
		options.size = new Vector2(0, 0);
		super(options);
		this.scale = options.scale || 1;
		this.image = new Image();
		this.image.src = options.filename || require('filename is required');
		this.image.onload = this.initIMG.bind(this);
	}

	initIMG() {
		this.loaded = true;
		this.size = new Vector2(this.image.width * this.scale, this.image.height * this.scale);
		console.log('[NodeImage]: Load Sprite ->', this.image.src);
	}

	/**
     * @private
     * @override
     * @param {CanvasRenderingContext2D} context 
     */
	render(context) {
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

function require(msg) {
	throw new Error('[NodeImage]: ' + msg);
}
