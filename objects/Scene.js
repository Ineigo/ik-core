import Node from './Node';
import IKCore from '../IKCore';

const NODES = Symbol('nodes');

export default class Scene {
	name = '';
	/** @property IKCore */
	core = null;
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

	/**
	 * @param {Layer} layer 
	 */
	draw(layer) {
		this.draw_nodes(layer);
		if (this.options.draw) {
			if (!(this.options.draw instanceof Function)) {
				require('draw must be function');
			}
			this.options.draw.call(this, layer);
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

	constructor(options = {}) {
		this.options = options;
		if (!(this.options.core instanceof IKCore)) {
			require('core is required');
		}
		this.core = options.core;
	}

	/**
	 * @param {Layer} layer 
	 */
	draw_nodes(layer) {
		layer.draw(this[NODES]);
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
