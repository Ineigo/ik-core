let map = [], context;

export default class LinearMap {
    constructor({ width, height, boxSize }) {
        this.width = width;
        this.height = height;
        this.boxSize = boxSize;
        map = new Array(this.getMapItemCount());
    }

    fill = func => typeof func == 'function' ? map.fill(func()) : map.fill(func);

    each = collback => map = map.map(collback);

    shuffle() {
        for (let i = map.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [map[i - 1], map[j]] = [map[j], map[i - 1]];
        }
    }

    getIndex(x, y) {
        const index = y * this.widthCount + x;
        return index > map.length ? null : index;
    }

    getItem = (x, y) => map[this.getIndex(x, y)];

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
        this.widthCount = Math.ceil(this.width/this.boxSize);
        this.heightCount = Math.ceil(this.height/this.boxSize);
        return this.widthCount * this.heightCount;
    }
}