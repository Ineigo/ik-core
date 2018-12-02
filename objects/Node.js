export default class Node {
    position = null;
    size = null;

    /** */
    constructor({ position, size } = {}) {
        this.position = position;
        this.size = size;
    }

    /**
     * @param {Vector2} vector 
     */
    move(vector) {
        this.position.plus(vector);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context = require('context is required')) {
        if (!(context instanceof CanvasRenderingContext2D)) {
            require('context must be instance of CanvasRenderingContext2D');
        }
        this.render(context);
    }

    render() {
        return require('render not override');
    }
}

function require(msg) {
    throw new Error('[Node]: ' + msg);
}