import Vector2 from './objects/Vector2';
import Scene from './objects/Scene';
import Layer from './objects/Layer';

const SCENES = Symbol('scenes');
const LAYERS = Symbol('layers');
const CLEAR_LAYERS = Symbol('clear_layers');

export default class IKCore {
    /** @property {CanvasRenderingContext2D} */
    context = null;

    /** @property {Vector2} */
    size = null;

    /** @property {Layer} */
    layer = null;

    /** @property {Vector2} */
    canvas_offset = null;

    /** @property {Scene} */
    active_scene = null;

    [SCENES] = {};
    [LAYERS] = {};
    [CLEAR_LAYERS] = [];
    runnig = false;

    /**
     * @param {string} element_id
     */
    constructor(element_id = null, fullScreen = false) {
        if (typeof element_id !== 'string') {
            require('element_id must be string');
        }

        const element = document.getElementById(element_id);
        this.parent = element;
        if (fullScreen) {
            document.body.style.margin = 0;
            this.size = this.vector2(window.innerWidth, window.innerHeight);
        } else {
            this.size = this.vector2(element.clientWidth, element.clientHeight);
        }
        const box = element.getBoundingClientRect();
        this.canvas_offset = this.vector2(box.left, box.top);
        this.update = this.update.bind(this);

        this.add_layer('main', new Layer(this.size, 0, this.canvas_offset));
        this.set_layer('main');
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
            for (let i = this[CLEAR_LAYERS].length - 1; i >= 0; i--) {
                this[CLEAR_LAYERS][i].clear();
            }
            this.active_scene.update();
            this.active_scene.draw(this.layer);

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
            if (this[SCENES][name] === scene) {
                return;
            }
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

    /**
     *
     * @param {String} name
     * @param {Layer} layer
     */
    add_layer(name, layer = require('layer is required'), isAutoClear = true) {
        if (layer instanceof Layer) {
            if (this[LAYERS][name] === layer) {
                return;
            }

            layer.name = name;
            this[LAYERS][name] = layer;
            if (isAutoClear) {
                this[CLEAR_LAYERS].push(layer);
            }
            layer.mount(this.parent);
        } else {
            require('layer must be instance of Layer');
        }
    }

    /**
     * @param {String} name
     */
    set_layer(name) {
        return (this.layer = this.get_layer(name));
    }

    /**
     * @param {String} name
     */
    get_layer(name = require('name is required')) {
        if (!this[LAYERS][name]) {
            require('layer not Found');
        }
        return this[LAYERS][name];
    }
}

function require(msg) {
    throw new Error('[IKCore]: ' + msg);
}
