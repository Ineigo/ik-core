export type UpdateFunction = (deltaTime: number) => void;
export type DrawFunction = () => void;
export type GameLoopOptions = {
  timeStep?: number;
};

export default class GameLoop {
  public isRunnig: boolean = false;
  protected timeStep: number;
  protected requestAnimationFrameId: number = 0;
  protected lastTime = 0;
  protected accumulatedTime = 0;

  constructor(protected update: UpdateFunction, protected draw: DrawFunction, options: GameLoopOptions = {}) {
    const { timeStep } = options;
    this.timeStep = timeStep ?? 1000 / 60;
  }

  protected loop = (time: number) => {
    if (!this.isRunnig) {
      return;
    }

    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(deltaTime);
      this.accumulatedTime -= this.timeStep;
    }

    this.draw();

    this.requestAnimationFrameId = requestAnimationFrame(this.loop);
  };

  start() {
    this.isRunnig = true;
    this.requestAnimationFrameId = requestAnimationFrame(this.loop);
  }

  stop() {
    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId);
    }
    this.isRunnig = false;
  }
}
