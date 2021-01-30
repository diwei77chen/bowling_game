const Game = require('./Game').Game;

class BowlingGame extends Game {
    /**
     * @constructor
     * @param {number} numberOfFrames maximum number of frames
     * @param {number} numberOfTries maximum number of tries in a frame
     * @param {number} numberOfPins maximum nnumber of pins n a frame
     * @param {ScoreAccumulator} accumulator rules to calculate scores. This dependency is injected into BowlingGame.
     */
    constructor(numberOfFrames, numberOfTries, numberOfPins, accumulator) {
        super(0, false);
        this.remainingTries = numberOfFrames * numberOfTries;
        this.numberOfPins = numberOfPins;
        this.accumulator = accumulator;
        this.prevScore = 0;
    }

    consumeTries(optNumber = 1) {
        if (optNumber) {
            this.remainingTries -= optNumber;
            return;
        }
        this.remainingTries -= 1;
    }

    addScore(newScore) {
        // One scores, we always add up the newSocre
        this.increaseScore(newScore);
        // Check if we need to add up the newScore multiple times by the rules set in the accumulator
        const numberOfAccumulations = this.accumulator.getMyAccumulation();
        if (numberOfAccumulations > 0) {
            this.increaseScore(newScore * numberOfAccumulations);
            this.accumulator.consume();
        }
        if (!this.isGameClosed) {
            // Strike
            if (newScore === this.numberOfPins && this.remainingTries % 2 === 0) {
                this.consumeTries(2);
                // Happens in the last frame
                if (this.remainingTries === 0) {
                    this.isGameClosed = true;
                    this.remainingTries += 2;
                }
                else {
                    this.accumulator.increaseAll();
                }
                return;
            }

            // Spare
            if (this.remainingTries % 2 === 1 && newScore + this.prevScore === this.numberOfPins) {
                this.consumeTries();
                // Happens in the last frame
                if (this.remainingTries === 0) {
                    this.isGameClosed = true;
                    this.remainingTries += 1;
                }
                this.accumulator.increaseNext();
                return;
            }
        }
    
        this.prevScore = newScore;
        this.consumeTries();
    }

    roll(noOfPins) {
        if (isNaN(noOfPins) || noOfPins < 0 || noOfPins > this.numberOfPins) {
            console.error(`Please enter a valid number between 0 and ${this.numberOfPins}.`);
            return;
        }
        if (this.remainingTries <= 0) {
            console.error("You're done! Please have a new game.");
            return;
        }
        
        this.addScore(noOfPins);
    }

    score() {
        return this.totalScore;
    }
}

exports.BowlingGame = BowlingGame;