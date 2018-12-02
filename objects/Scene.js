import Node from './Node';

const NODES = Symbol('nodes');

export default class Scene {
	name = '';
	[NODES] = [];

	init() {
		if (this.options.init) {
			if (!(this.options.init instanceof Function)) {
				require('init must be function');
			}
			this.options.init.call(this);
		}
	}

	update() {
		if (this.options.update) {
			if (!(this.options.update instanceof Function)) {
				require('update must be function');
			}
			this.options.update.call(this);
		}
	}

	draw(context) {
		if (this.options.draw) {
			if (!(this.options.draw instanceof Function)) {
				require('draw must be function');
			}
			this.options.draw.call(this, context);
		}
	}

	exit() {
		if (this.options.exit) {
			if (!(this.options.exit instanceof Function)) {
				require('exit must be function');
			}
			this.options.exit.call(this);
		}
	}

	constructor(options) {
		this.options = options;
	}

	draw_nodes(context) {
		for (let i = 0; i < this[NODES].length; i++) {
			this[NODES][i].draw(context);
		}
	}

	/**
     * Добавить ноду
     * @param {Node} node 
     */
	add(node = require('node is required')) {
		if (node instanceof Node) {
			this[NODES].push(node);
		} else {
			require('node must be instance of Node');
		}
	}
}

function require(msg) {
	throw new Error('[Scene]: ' + msg);
}
