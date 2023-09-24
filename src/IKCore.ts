import Vector2 from './objects/Vector2';
import Scene from './objects/Scene';
import Layer from './objects/Layer';

const SCENES = Symbol('scenes');
const LAYERS = Symbol('layers');
const CLEAR_LAYERS = Symbol('clear_layers');

export default class IKCore {
  /** @property {CanvasRenderingContext2D} */
  context?: CanvasRenderingContext2D;

  /** @property {Vector2} */
  size: Vector2;

  /** @property {Layer} */
  layer?: Layer;

  /** @property {Vector2} */
  canvas_offset: Vector2;

  /** @property {Scene} */
  active_scene?: Scene;
  parent: HTMLElement;

  [SCENES]: Record<string, Scene> = {};
  [LAYERS]: Record<string, Layer> = {};
  [CLEAR_LAYERS]: Layer[] = [];
  runnig = false;

  /**
   * @param {string} element_id
   */
  constructor(element_id: string, fullScreen: boolean = false) {
    const element = document.getElementById(element_id);
    if (!element) {
      throw 'Not parent elemet with id ' + element_id;
    }
    this.parent = element;
    if (fullScreen) {
      document.body.style.margin = String(0);
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
   */
  start(scene: string) {
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
      if (!this.layer) {
        throw 'layer not found';
      }
      if (!this.active_scene) {
        throw 'active scene not set';
      }

      this.active_scene.update();
      this.active_scene.draw(this.layer);

      requestAnimationFrame(this.update);
    }
  }

  vector2(x: number, y: number) {
    return new Vector2(x, y);
  }

  /**
   *
   * @param {String} name
   * @param {Scene} SceneObject
   */
  add_scene(name: string, scene: Scene) {
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
  set_scene(name: string) {
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
  add_layer(name: string, layer: Layer, isAutoClear = true) {
    if (this[LAYERS][name] === layer) {
      return;
    }

    layer.name = name;
    this[LAYERS][name] = layer;
    if (isAutoClear) {
      this[CLEAR_LAYERS].push(layer);
    }
    layer.mount(this.parent);
  }

  set_layer(name: string) {
    this.layer = this.get_layer(name);
    return this.layer;
  }

  get_layer(name: string) {
    if (!this[LAYERS][name]) {
      require('layer not Found');
    }
    return this[LAYERS][name];
  }
}

function require(msg: string) {
  throw new Error('[IKCore]: ' + msg);
}
