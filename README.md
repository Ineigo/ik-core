# ik-core
Some simple instruments for Game Dev

Steps to run this project:
- `npm ci` | `bun install`
- `npm run dev` | `bun dev`
- open http://localhost:3000 for demo

How it install:
```
npm install --save ik-core
yarn add ik-core
bun install --save ik-core
```

Usage:
```typescript
import { IKCore, Layer, NodeRect, NodeText, Scene } from 'ik-core';

const core = new IKCore('canvas', true);

const image2 = new NodeImage({
    position: core.vector2(400, 10),
    size: core.vector2(50, 50),
    scale: 0.2,
    filename: 'https://cards.scryfall.io/large/front/e/3/e3450882-d791-4172-b02a-ee7fdb36acfc.jpg?1673310369',
  });

const background = new NodeRect({
    position: core.vector2(0, 0),
    size: core.size,
  });

const text = new NodeText({
    position: core.vector2(10, core.size.y - 10),
    size: core.vector2(500, 36),
    color: '#555',
  });

const bgLayerName = 'background';
core.add_layer(new Layer(bgLayerName, core.size, -1, core.canvas_offset), false);

const scene = new Scene({
  core,
  init(scene) {
    scene.add(image2);
    scene.add(text);
    core.get_layer(bgLayerName).draw(background);
  },
  update() {
    image2.rotate(1);
    text.text = 'Time: ' + new Date().toLocaleString();
  },
});
const baseSceneName = 'rect';
core.add_scene(baseSceneName, scene);
core.start(baseSceneName);
```

## IKCore

### Constructor
| name      | type                          | default |
| :-------- | :---------------------------- | :------ |
| canvas_id | `string or HTMLCanvasElement` | *null*  |
... coming soon

## GameLoop

### Constructor
| name    | type                          | default     |
| :------ | :---------------------------- | :---------- |
| update  | `(deltaTime: number) => void` | *required*  |
| draw    | `() => void}`                 | *required*  |
| oprions | `GameLoopOptions`             | *undefined* |

#### GameLoopOptions
| name     | type     | default   | describtion |
| :------- | :------- | :-------- | :---------- |
| timeStep | `number` | *1000/60* | Frame rate  |

### function `start`
This function begin gameloop

### function `stop`
This function end gameloop

### property `isRunnig` 
This property has gameloop status: `true/false`

## Objects
- Vector2
- Scene
- NodeText
- NodeRect
- NodeImage
- Node
- Layer
- GameLoop
- Canvas
- LinearMap