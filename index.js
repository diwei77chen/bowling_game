const ScoreAccumulator = require('./ScoreAccumulator').ScoreAccumulator;
const BowlingGame = require('./BowlingGame').BowlingGame;
const { NUMBER_OF_FRAMES, NUMBER_OF_TRIES, MAX_NUMBER_OF_PINS } = require('./Constants');

const scoreAccumulator = new ScoreAccumulator([0, 0]);
const bowlingGame = new BowlingGame(NUMBER_OF_FRAMES, NUMBER_OF_TRIES, MAX_NUMBER_OF_PINS, scoreAccumulator);

bowlingGame.roll(10);
bowlingGame.roll(10);
bowlingGame.roll(10);
bowlingGame.roll(10);
bowlingGame.roll(10);

bowlingGame.roll(10);
bowlingGame.roll(10);
bowlingGame.roll(10);
bowlingGame.roll(10);
bowlingGame.roll(10);

bowlingGame.roll(10);
bowlingGame.roll(10);


console.log("Your score is: ", bowlingGame.score());