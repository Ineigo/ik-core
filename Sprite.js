export default class Sprite {
    static TO_RADIANS = Math.PI / 180;

    color = null;
    context = null;
    image = null;
    pattern = null;

    constructor(context, filename, is_pattern) {
        if(!context) throw Error("Not exist Canvas Context");
        if (!filename) throw new Error('Unable load file');
        this.color = isColor(filename) ? filename : null;
        this.context = context;

        if(!this.color) {
            console.log("Load Sprite:", filename);

            this.image = new Image();
            this.image.src = filename;
            if (is_pattern) {
                this.pattern = this.context.createPattern(this.image, 'repeat');
            }
        }
    }

    draw(x, y, w, h) {
        this.color ? drawColor.call(this, x, y, w, h) : drawImage.call(this, x, y, w, h);
        return this;
    }

    rotate(x, y, angle) {
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle * Sprite.TO_RADIANS);
        this.context.drawImage(this.image,
            -(this.image.width / 2),
            -(this.image.height / 2));
        this.context.restore();
        return this;
    };
};

const colorPattern = /(^#[a-f0-9]{3}$)|(^#[a-f0-9]{6}$)|(^#[a-f0-9]{8}$)/gi;
const isColor = str => str.search(colorPattern) >= 0; // test не рабит ...

function drawImage(x, y, w = this.image.width, h = this.image.height) {
    if (this.pattern) {
        this.context.fillStyle = this.pattern;
        this.context.fillRect(x, y, w, h);
    } else {
        this.context.drawImage(this.image, x, y, w, h);
    }
}

function drawColor(x, y, w, h) {
    this.context.fillStyle = this.color;
    this.context.fillRect(x, y, w, h);
}
