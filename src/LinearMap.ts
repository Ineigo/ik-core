export type LinearMapInitProps = {
  width: number;
  height: number;
  boxSize: number;
};
export default class LinearMap<T> {
  private map: T[];
  width: number;
  height: number;
  boxSize: number;
  widthCount!: number;
  heightCount!: number;

  constructor({ width, height, boxSize }: LinearMapInitProps) {
    this.width = width;
    this.height = height;
    this.boxSize = boxSize;
    this.map = new Array<T>(this.getMapItemCount());
  }

  fill = (func: () => T) => (typeof func == 'function' ? this.map.fill(func()) : this.map.fill(func));

  each = (collback: (element: T) => T) => (this.map = this.map.map(collback));

  shuffle() {
    for (let i = this.map.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.map[i - 1], this.map[j]] = [this.map[j], this.map[i - 1]];
    }
  }

  getIndex(x: number, y: number) {
    const index = y * this.widthCount + x;
    return index > this.map.length ? null : index;
  }

  getItem = (x: number, y: number) => {
    const index = this.getIndex(x, y);
    if (index === null) {
      return null;
    }
    this.map[index];
  };

  setItem(x: number, y: number, value: T) {
    const index = this.getIndex(x, y);
    if (index === null) {
      return null;
    }
    this.map[index] = value;
  }

  [Symbol.iterator]() {
    const $this = this;
    let y = 0;
    return {
      next() {
        return {
          value: {
            [Symbol.iterator]() {
              let x = 0;
              return {
                next() {
                  return {
                    value: $this.getItem(x, y - 1),
                    done: x++ >= $this.widthCount,
                  };
                },
              };
            },
          },
          done: y++ >= $this.heightCount,
        };
      },
    };
  }

  getMapItemCount() {
    this.widthCount = Math.ceil(this.width / this.boxSize);
    this.heightCount = Math.ceil(this.height / this.boxSize);
    return this.widthCount * this.heightCount;
  }
}
