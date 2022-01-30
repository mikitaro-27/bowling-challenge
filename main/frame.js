class Frame {
  constructor() {
    this.score = 0;
  }

  addRoll(points) {
    //  create roll1 or roll2
    this.roll1 ? (this.roll2 = points) : (this.roll1 = points);
    // if strike make roll_2 null
    //summarise frame
  }

  addBonus(points) {
    this.bonus1 ? (this.bonus2 = points) : (this.bonus1 = points)
  }

  isStrike() {
    return this.roll1 === 10;
  }

  isSpare() {
    return this.isStrike() ? false : this.roll1 + this.roll2 === 10;
  }

  isComplete() {
    return !!this.roll2 || this.isStrike()
  }
}

module.exports = Frame;