import Node from './Node';

export default class NodeText extends Node {
    color = '#ccc';
    text = '';

    constructor(options) {
        super(options);
        this.color = options.color || this.color;
        this.text = options.text || this.text;
    }

    /**
     * @private
     * @override
     * @param {CanvasRenderingContext2D} context
     */
    render(context) {
        context.font = this.size.y + 'px serif';
        context.fillStyle = this.color;
        context.fillText(this.text, -(this.size.x / 2), -(this.size.y / 2), this.size.x);
    }
}

function require(msg) {
    throw new Error('[NodeText]: ' + msg);
}
