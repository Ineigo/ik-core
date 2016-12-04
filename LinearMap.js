let map = [], context;

export default class LinearMap {
    constructor({ width, height, boxSize }) {
        this.width = width;
        this.height = height;
        this.boxSize = boxSize;
        map = new Array(this.getMapItemCount());
    }
    
    fill(func) {
        if(typeof func == 'function') map.fill(func());
        else map.fill(func);
    }

    each(collback) {
        map = map.map(collback);
    }

    getIndex(x, y) {
        const index = y * this.widthCount + x;
        if(index > map.length) return null;
        return index;
    }

    getItem(x, y) {
        return map[this.getIndex(x, y)];
    }

    setItem(x, y, value) {
        map[this.getIndex(x, y)] = value;
    }

    [Symbol.iterator] () {
        const $this = this;
        let y = 0;
        return {
            next() {
                return {
                    value: {
                        [Symbol.iterator] () {
                            let x = 0;
                            return {
                                next() {
                                    return {
                                        value: $this.getItem(x, y-1),
                                        done: x++ >= $this.widthCount
                                    }
                                }
                            }
                        }
                    },
                    done: y++ >= $this.heightCount
                }
            }
        }
    }

    getMapItemCount() {
        this.widthCount = Math.floor(this.width/this.boxSize);
        this.heightCount = Math.ceil(this.height/this.boxSize) + 1;
        return this.widthCount * this.heightCount;
    }
}