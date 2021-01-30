/**
 * Game is a generic game class.
 */
class Game {
    /**
     * @constructor
     * @param {number} initialScore 
     * @param {boolean} isGameClosed if a game is closed, we can proceed to the bonus round.
     */
    constructor(initialScore = 0, isGameClosed = false) {
        this._totalScore = initialScore;
        this._isGameClosed = isGameClosed;
    }
    increaseScore(value) {
        if (isNaN(value) || value < 0) {
            console.error("Please enter a positive number to increase the score.");
            return;
        }
        this._totalScore += value;
    }
    decreaseScore(value) {
        if (isNaN(value) || value < 0) {
            console.error("Please enter a positive number to decrease the score.");
            return;
        }
        this._totalScore -= value;
    }
    get totalScore() {
        return this._totalScore;
    }
    set isGameClosed(value) {
        if (typeof value !== "boolean") {
            console.error("Please pass in a boolean value.");
            return;
        }
        this._isGameClosed = value;
    }
    get isGameClosed() {
        return this._isGameClosed;
    }
}

exports.Game = Game;