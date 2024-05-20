import Vector2 from './objects/Vector2';
import Scene from './objects/Scene';
import Layer from './objects/Layer';
import GameLoop from './objects/GameLoop';

const SCENES = Symbol('scenes');
const LAYERS = Symbol('layers');
const CLEAR_LAYERS = Symbol('clear_layers');

export default class IKCore {
  /** @property {CanvasRenderingContext2D} */
  context?: CanvasRenderingContext2D;
  size: Vector2;
  layer?: Layer;
  canvas_offset: Vector2;
  active_scene?: Scene;
  parent: HTMLElement;
  gameLoop: GameLoop;

  [SCENES]: Record<string, Scene> = {};
  [LAYERS]: Record<string, Layer> = {};
  [CLEAR_LAYERS]: Layer[] = [];

  constructor(element_id: string, fullScreen: boolean = false) {
    const element = document.getElementById(element_id);
    if (!element) {
      throw '[IKCore]: Not parent elemet with id ' + element_id;
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

    this.gameLoop = new GameLoop(this.update, this.draw);

    this.add_layer(new Layer('main', this.size, 0, this.canvas_offset));
    this.set_layer('main');
  }

  /**
   * Запуск движка
   */
  start(scene: string) {
    if (this.gameLoop.isRunnig) {
      return;
    }

    this.set_scene(scene);
    this.gameLoop.start();
  }

  stop() {
    this.gameLoop.stop();
  }

  private update = (time: number) => {
    if (!this.layer) {
      throw '[IKCore]: layer not found';
    }
    if (!this.active_scene) {
      throw '[IKCore]: active scene not set';
    }

    this.active_scene.update(time);
  };

  private draw = () => {
    if (!this.layer) {
      throw '[IKCore]: layer not found';
    }
    if (!this.active_scene) {
      throw '[IKCore]: active scene not set';
    }

    for (let i = this[CLEAR_LAYERS].length - 1; i >= 0; i--) {
      this[CLEAR_LAYERS][i].clear();
    }

    this.active_scene.draw(this.layer);
  };

  vector2(x: number, y: number) {
    return new Vector2(x, y);
  }

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

  add_layer(layer: Layer, isAutoClear = true) {
    if (this[LAYERS][layer.name] === layer) {
      return;
    }

    this[LAYERS][layer.name] = layer;
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
