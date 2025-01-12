const Frame = require("../main/frame.cjs");

describe("frame", () => {
  it("has a score property of 0", () => {
    const frame = new Frame();
    expect(frame.score).toEqual(0);
  });

  it('returns the frame', () => {
    const frame = new Frame();
    expect(frame.addRoll(5)).toBeInstanceOf(Frame)
  })

  describe("addRoll", () => {
    it("adds first roll to frame", () => {
      const frame = new Frame();
      frame.addRoll(5);
      expect(frame.roll1).toEqual(5);
    });

    it("adds second roll to frame", () => {
      const frame = new Frame();
      frame.addRoll(3);
      frame.addRoll(7);
      expect(frame.roll1).toEqual(3);
      expect(frame.roll2).toEqual(7);
    });

    describe('#validateRoll', () => {
      describe('when invalid 2nd roll', () => {
        it('throws an error', () => {
          const frame = new Frame();
          frame.addRoll(5)
          expect(() => { frame.addRoll(6) }).toThrow('invalid roll')
        })
      })

      describe('when given 11', () => {
        it('throws an error', () => {
          const frame = new Frame();
          expect(() => {frame.addRoll(11)}).toThrow('invalid roll')
          
        })
      })
    })

    describe('#summariseFrame', () => {
      describe('when strike', () => {
        it('sets roll2 as null', () => {
          const frame = new Frame();
          frame.addRoll(10)
          expect(frame.roll2).toEqual(null)
        })

        it('assigns 2 bonus points', () => {
          const frame = new Frame();
          frame.addRoll(10)
          expect(frame.bonusPoints).toEqual(2)
        })
      })

      describe('when spare', () => {
        it('assigns 1 bonus points', () => {
          const frame = new Frame();
          frame.addRoll(5)
          frame.addRoll(5)
          expect(frame.bonusPoints).toEqual(1)
        })
      })
      
      describe('when open', () => {
        it('assigns 0 bonus points', () => {
          const frame = new Frame();
          frame.addRoll(5)
          frame.addRoll(4)
          expect(frame.bonusPoints).toEqual(0)
        })
      })
    })

    describe('#updateScore', () => {
      it('updates score each roll', () => {
        const frame = new Frame();
        frame.addRoll(5)
        expect(frame.score).toEqual(5)
        frame.addRoll(4)
        expect(frame.score).toEqual(9)
      })
    })
  });

  describe('addBonus', () => {
    it('adds first bonus to roll', () => {
      const frame = new Frame();
      frame.addRoll(7)
      frame.addRoll(3)
      frame.addBonus(7)
      expect(frame.bonus1).toEqual(7)
    })
    it('adds second bonus to roll', () => {
      const frame = new Frame();
      frame.addRoll(10)
      frame.addBonus(7)
      frame.addBonus(3)
      expect(frame.bonus2).toEqual(3)
    })

    it('deducts a bonus point each time', () => {
      const frame = new Frame();
      frame.addRoll(5)
      frame.addRoll(5)
      frame.addBonus(10)
      expect(frame.bonusPoints).toEqual(0)
    })

    it('updates score', () => {
      const frame = new Frame();
      frame.addRoll(10)
      frame.addBonus(7)
      expect(frame.score).toEqual(17)
      frame.addBonus(3)
      expect(frame.score).toEqual(20)
    })
    describe('when no bonus points', () => {
      it('throws no bonus points', () => {
        const frame = new Frame();
        frame.addRoll(5)
        frame.addRoll(4)
        expect(() => frame.addBonus(3)).toThrow('no bonus points')
      })
    })

    describe('#validate_bonus', () => {
      describe('when bonus1(!=10) and bonus2 larger than 10', () => {
        it('throws an error', () => {
          const frame = new Frame();
          frame.addRoll(10)
          frame.addBonus(3)
          expect(() => {frame.addBonus(8)}).toThrow('invalid bonus')
        })
      })

      describe('when given 11', () => {
        const frame = new Frame();
        frame.addRoll(10)
        expect(() => { frame.addBonus(11) }).toThrow('invalid bonus')
      })

      describe('when strike-->10-->10', () => {
        it('does not throw error', () => {
          const frame = new Frame();
          frame.addRoll(10)
          frame.addBonus(10)
          expect(() => {frame.addBonus(10)}).not.toThrow('invalid bonus')
        })
      })
    })
  })

  describe('isComplete', () => {
    describe('when strike', () => {
      it('returns true', () => {
        const frame = new Frame()
        frame.addRoll(10)
        expect(frame.isComplete()).toEqual(true)
      })
    })
    describe('when 2 rolls', () => {
      it('returns true', () => {
        const frame = new Frame()
        frame.addRoll(2)
        frame.addRoll(7)
        expect(frame.isComplete()).toEqual(true)
      })
    })
    describe('when 1 roll and NOT strike', () => {
      it('returns false', () => {
        const frame = new Frame()
        frame.addRoll(2)
        expect(frame.isComplete()).toEqual(false)
      })
    })
  })

  describe("isStrike", () => {
    it("returns true", () => {
      const frame = new Frame();
      frame.addRoll(10);
      expect(frame.isStrike()).toEqual(true);
    });

    describe('when spare frame', () => {
      it('returns false', () => {
        const frame = new Frame();
        frame.addRoll(3);
        frame.addRoll(7);
        expect(frame.isStrike()).toEqual(false);
      })
    })

    describe('when open frame', () => {
      it('returns false', () => {
        const frame = new Frame();
        frame.addRoll(2);
        frame.addRoll(7);
        expect(frame.isStrike()).toEqual(false);
      })
    })
  });

  describe("isSpare", () => {
    it("returns true", () => {
      const frame = new Frame();
      frame.addRoll(3);
      frame.addRoll(7);
      expect(frame.isSpare()).toEqual(true);
    });

    describe('when strike frame', () => {
      it('returns false', () => {
        const frame = new Frame();
        frame.addRoll(10);
        expect(frame.isSpare()).toEqual(false);
      })
    })

    describe('when open frame', () => {
      it('returns false', () => {
        const frame = new Frame();
        frame.addRoll(2);
        frame.addRoll(7);
        expect(frame.isSpare()).toEqual(false);
      })
    })
  });
});
