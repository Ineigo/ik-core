export default class Canvas {
	static canvas = null;
    static context = null;
    /**
     * @param {string|HTMLCanvasElement} canvas_tag_id 
     */
	static create2d(canvas_tag_id = '') {
		if (canvas_tag_id instanceof HTMLCanvasElement) {
			Canvas.canvas = canvas_tag_id;
		} else if (typeof canvas_tag_id === 'string') {
			const canvas = document.getElementById(canvas_tag_id);
			if (!canvas) {
				throw new Error('Not element exists');
			}
			Canvas.canvas = canvas;
			Canvas.context = canvas.getContext('2d');
		} else {
			throw new Error('Not valid canvas_tag_id');
		}

		console.info('2d Context created from', '#' + canvas_tag_id);
		return Canvas.context;
	}
}
