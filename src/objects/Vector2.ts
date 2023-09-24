export default class Vector2 {
    x = 0;
    y = 0;

    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Vector2} vector
     */
    plus(vector: Vector2) {
        if (vector instanceof Vector2) {
            this.x += vector.x;
            this.y += vector.y;
        } else {
            require('vector must be  instance of Vector2');
        }
    }
}

function require(msg: string) {
    throw new Error('[Vector2]: ' + msg);
}
