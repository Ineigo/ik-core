export default class Node {
    position = null;
    size = null;
    angle = 0;
    children = [];
    static TO_RADIANS = Math.PI / 180;

    constructor({ position, size, angle = 0 } = {}) {
        this.position = position;
        this.angle = angle;
        this.size = size;
    }

    add(node) {
        if (!(node instanceof Node)) {
            require('node must be instance of Node');
        }
        this.children.push(node);
    }

    /**
     * @param {Vector2} vector
     */
    move(vector) {
        this.position.plus(vector);
    }

    rotate(angle = require('angle is required')) {
        this.angle += angle;
    }

    /**
     * @param {CanvasRenderingContext2D} context
     */
    draw(context = require('context is required')) {
        if (!(context instanceof CanvasRenderingContext2D)) {
            require('context must be instance of CanvasRenderingContext2D');
        }

        context.save();
        context.translate(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
        context.rotate(this.angle * Node.TO_RADIANS);
        this.render(context);
        context.restore();
    }

    render() {
        return require('render not override');
    }
}

function require(msg) {
    throw new Error('[Node]: ' + msg);
}
