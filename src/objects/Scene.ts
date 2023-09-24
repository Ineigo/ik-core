import Node from './Node';
import IKCore from '../IKCore';
import type Layer from './Layer';

const NODES = Symbol('nodes');

type SceneOptions = {
  core?: IKCore;
  exit?: () => void;
  draw?: (layer: Layer) => void;
  update?: () => void;
  init?: (scene: Scene) => void;
};

export default class Scene {
  name: string = '';
  core?: IKCore;
  [NODES]: Node[] = [];

  init() {
    if (this.options.init) {
      if (!(this.options.init instanceof Function)) {
        require('init must be function');
      }
      this.options.init.call(this, this);
    }
  }

  update() {
    if (this.options.update) {
      if (!(this.options.update instanceof Function)) {
        require('update must be function');
      }
      this.options.update.call(this);
    }
  }

  /**
   * @param {Layer} layer
   */
  draw(layer: Layer) {
    this.draw_nodes(layer);
    if (this.options.draw) {
      this.options.draw.call(this, layer);
    }
  }

  exit() {
    if (this.options.exit) {
      this.options.exit.call(this);
    }
  }

  constructor(private options: SceneOptions = {}) {
    this.options = options;
    if (!(this.options.core instanceof IKCore)) {
      require('core is required');
    }
    this.core = options.core;
  }

  draw_nodes(layer: Layer) {
    layer.draw(this[NODES]);
  }

  add(node: Node) {
    this[NODES].push(node);
  }
}

function require(msg: string) {
  throw new Error('[Scene]: ' + msg);
}
