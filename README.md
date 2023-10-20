# ik-core
Some simple instruments for Game Dev

## IKCore

### Параметры:
| name      | type                          | default |
| :-------- | :---------------------------- | :------ |
| canvas_id | `string or HTMLCanvasElement` | *null*  |

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