export default class TimeseriesGenerator {
  max: number;
  min: number;
  chance: number;
  prevValue: number;
  direction: number;

  constructor(max?: number, min?: number, chance?: number) {
    this.max = max || 100;
    this.min = min || 0;
    this.chance = chance || 10;
    this.prevValue = Math.random() * (this.max + Math.abs(this.min)) - this.min;
    this.newDirection();
  }

  coinFlip() {
    return Math.round(Math.random() * this.chance) === 0;
  }

  newDirection() {
    const direction = this.direction;
    while (direction == this.direction)
      this.direction = Math.round(Math.random() * 2);
  }

  generate(index: number) {
    if (this.coinFlip()) {
      this.newDirection();
    }
    switch (this.direction) {
      case 0:
        this.prevValue += Math.random() * 10;
        break;
      case 1:
        this.prevValue -= Math.random() * 10;
        break;
    }
    if (this.prevValue > this.max) this.prevValue = this.max;
    if (this.prevValue < this.min) this.prevValue = this.min;
    return this.prevValue;
  }
}
