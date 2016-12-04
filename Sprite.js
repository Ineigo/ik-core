export default class Sprite {
    // Construct
    static TO_RADIANS = Math.PI / 180;

    constructor(context, filename, is_pattern) {
        if(!context) throw Error("Not exist Canvas Context");
        if (!filename) throw new Error('Unable load file');

        console.log("Load Sprite:", filename);

        this.context = context;
        this.image = new Image();
        this.image.src = filename;
        if (is_pattern) {
            this.pattern = this.context.createPattern(this.image, 'repeat');
        }
    }    

    draw(x, y, w, h) {
        if (this.pattern) {
            this.context.fillStyle = this.pattern;
            this.context.fillRect(x, y, w, h);
        } else {
            // Image
            if (w == undefined || h == undefined) {
                this.context.drawImage(this.image, x, y, this.image.width, this.image.height);
            } else {
                // stretched
                this.context.drawImage(this.image, x, y, w, h);
            }
        }
    };

    rotate(x, y, angle) {
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle * Sprite.TO_RADIANS);
        this.context.drawImage(this.image,
            -(this.image.width / 2),
            -(this.image.height / 2));
        this.context.restore();
    };
};