import Canvas from './Canvas';
import Vector2 from './objects/Vector2';
import Scene from './objects/Scene';

const SCENES = Symbol('scenes');

export default class IKCore {
    /** @property {CanvasRenderingContext2D} */
    context = null;

    /** @property {Vector2} */
    size = null;

    /** @property {Vector2} */
    canvas_offset = null;

    /** @property {Scene} */
    active_scene = null;

    [SCENES] = {};
    runnig = false;

    /**
     * @param {string|HTMLCanvasElement} canvas_tag_id 
     */
    constructor(canvas_id = null) {
        this.context = Canvas.create2d(canvas_id);
        this.size = this.vector2(Canvas.canvas.width, Canvas.canvas.height);
        const pos = Canvas.canvas.getBoundingClientRect();
        this.canvas_offset = this.vector2(pos.left, pos.right);
        this.update = this.update.bind(this);
    }

    /**
     * Запуск движка
     * @param {String} scene 
     */
    start(scene = require('scene is required')) {
        if (this.runnig) {
            return;
        }
        this.runnig = true;
        this.set_scene(scene);
        this.update();
    }
    
    /** @private */
    update() {
        if (this.runnig) {
            this.context.clearRect(0, 0, this.size.x, this.size.y);
            this.active_scene.update();
            this.active_scene.draw_nodes(this.context);
            this.active_scene.draw(this.context);

            requestAnimationFrame(this.update);
        }
    }

    vector2(x, y) {
        return new Vector2(x, y);
    }

    /**
     * 
     * @param {String} name 
     * @param {Scene} SceneObject 
     */
    add_scene(name, scene = require('scene is required')) {
        if (scene instanceof Scene) {
            scene.name = name;
            this[SCENES][name] = scene;
        } else {
            require('scene must be instance of Scene');
        }
    }

    /**
     * @param {String} name 
     */
    set_scene(name = require('name is required')) {
        if (!this[SCENES][name]) {
            require('scene not Found');
        }

        if (this.active_scene) {
            this.active_scene.exit();
        }

        this.active_scene = this[SCENES][name];
        this.active_scene.init();

    }
}

function require(msg) {
    throw new Error('[IKCore]: ' + msg);
}