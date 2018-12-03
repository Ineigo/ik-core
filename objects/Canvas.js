export default class Canvas {
	/** @property {HTMLCanvasElement} */
	element = null;
	/** @property {CanvasRenderingContext2D} */
	context = null;

	/**
     * @param {string|HTMLCanvasElement} game_box 
     */
	constructor(game_box = '') {
		if (game_box instanceof HTMLCanvasElement) {
			return this.initCanvas(game_box);
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

	/**
	 * @private
     * @param {HTMLCanvasElement} canvas 
     */
	initCanvas(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		console.info('2d Context created', this);
	}

	/**
	 * @param {Number} offsetX 
	 * @param {Number} offsetY 
	 * @param {Number} width 
	 * @param {Number} height 
	 * @param {Number|null} [index=null] 
	 */
	static createCanvas(offsetX, offsetY, width, height, index = null) {
		const canvas = document.createElement('canvas');
		canvas.style.cssText = `position: absolute; left: ${offsetX}; top: ${offsetY}`;
		canvas.width = width;
		canvas.height = height;
		if (index !== null) {
			canvas.style.zIndex = 100 + index;
		}
		return canvas;
	}
}
