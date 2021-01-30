/**
 * ScoreAccumulator controls how the following scores should be accumulated.
 */
class ScoreAccumulator {
    /**
     * @constructor
     * @param {array} rules specifies how the next scores should be added.
     *                  E.g., rules = [1], add up the next score one more time.
     */
    constructor(rules = []) {
        this._accumulator = rules;
    }

    increaseAll() {
        this._accumulator = this._accumulator.reduce((acct, currentValue) => {
            return acct.concat(currentValue + 1)
        }, [])
    }

    increaseNext() {
        this._accumulator[0] += 1;
    }

    getMyAccumulation() {
        if (this._accumulator.length < 1) {
            console.error("Please initialise the accumulator with an array length greater than zero.");
            return;
        }
        return this._accumulator[0];
    }

    consume() {
        this._accumulator.shift();
        this._accumulator.push(0);
    }
}

exports.ScoreAccumulator = ScoreAccumulator;