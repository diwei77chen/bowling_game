const ScoreAccumulator = require('./ScoreAccumulator').ScoreAccumulator;
const BowlingGame = require('./BowlingGame').BowlingGame;
const { NUMBER_OF_FRAMES, NUMBER_OF_TRIES, MAX_NUMBER_OF_PINS } = require('./Constants');

const playBowlingGame = pins => {
    const scoreAccumulator = new ScoreAccumulator([0, 0]);
    const bowlingGame = new BowlingGame(NUMBER_OF_FRAMES, NUMBER_OF_TRIES, MAX_NUMBER_OF_PINS, scoreAccumulator);
    for (let noOfPins of pins) {
        bowlingGame.roll(noOfPins);
    }
    return bowlingGame.score();
}

describe("Bowling Game Test Suite", () => {
    describe("One makes at least a strike", () => {
        test("One has a strike for every roll", () => {
            const pins = [
                10, 10, 10, 10, 10,
                10, 10, 10, 10, 10,
                10, 10
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(300);
        });
        test("One makes a strike in the last frame", () => {
            const pins = [
                3, 4, 
                1, 1, 
                0, 9, 
                2, 2, 
                3, 3, 
                4, 4, 
                4, 4, 
                3, 3, 
                2, 3,
                10,     // sum = 65
                2, 3
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(70);
        });
        test("One makes a strike in the last frame, then makes another strike in the bonus tries", () => {
            const pins = [
                3, 4, 
                1, 1, 
                0, 9, 
                2, 2, 
                3, 3, 
                4, 4, 
                4, 4, 
                3, 3, 
                2, 3,
                10,     // sum = 65
                10, 
                3
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(78);
        });
        test("One makes a strike in the last frame, then makes another spare in the bonus tries", () => {
            const pins = [
                3, 4, 
                1, 1, 
                0, 9, 
                2, 2, 
                3, 3, 
                4, 4, 
                4, 4, 
                3, 3, 
                2, 3,
                10,     // sum = 65
                1, 
                9
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(75);
        });
        test("One makes a strike in the second last frame", () => {
            const pins = [
                3, 4, 
                1, 1, 
                0, 9, 
                2, 2, 
                3, 3, 
                4, 4, 
                4, 4, 
                3, 3, 
                10,
                2, 3
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(70);
        });
        test("One makes a strike in the last two frames", () => {
            const pins = [
                3, 4, 
                1, 1, 
                0, 9, 
                2, 2, 
                3, 3, 
                4, 4, 
                4, 4, 
                3, 3,  // sum = 50
                10,
                10,  
                10, 
                3
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(103);
        });
        test("One makes a strike in the second last two frames, then makes a spare", () => {
            const pins = [
                3, 4, 
                1, 1, 
                0, 9, 
                2, 2, 
                3, 3, 
                4, 4, 
                4, 4, 
                3, 3,  // sum = 50
                10,
                10,  
                2, 
                3
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(87);
        });
        test("One makes a strike before the last two frames", () => {
            const pins = [
                3, 4, 
                1, 1, 
                0, 9, 
                10, 
                3, 3, 
                4, 4, 
                4, 4, 
                3, 3, 
                2, 3,
                1, 4
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(72);
        });
    })

    describe("One makes at least a spare", () => {
        test("One makes a spare in the last frame", () => {
            const pins = [
                3, 4, 
                1, 1, 
                0, 9, 
                2, 2, 
                3, 3, 
                4, 4, 
                4, 4, 
                3, 3, 
                2, 3,   // sum = 55
                4, 6,     
                2
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(69);
        });
        test("One makes a spare before the last frame", () => {
            const pins = [
                1, 9, 
                1, 1, 
                0, 9, 
                2, 2, 
                3, 3, 
                4, 4, 
                4, 4, 
                3, 3, 
                2, 3,  
                1, 1     
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(61);
        });

    })
    
    describe("One makes at least a strike and a spare", () => {
        test("One makes a strike and a spare", () => {
            const pins = [
                10, 
                1, 1, 
                0, 9, 
                2, 2, 
                3, 3, 
                1, 9, 
                4, 4, 
                3, 3, 
                2, 3,
                1, 1     
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(68);
        });
        test("One makes multiple strikes and multiple spares", () => {
            const pins = [
                10, 
                1, 1, 
                0, 9, 
                10, 
                3, 3, 
                1, 9, 
                4, 4, 
                2, 8, 
                2, 3,
                1, 1     
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(86);
        });
        
    })

    describe("One makes no strike and no spare", () => {
        test("One scores", () => {
            const pins = [
                1, 0, 
                1, 1, 
                0, 9, 
                2, 2, 
                3, 3, 
                1, 3, 
                4, 4, 
                2, 1, 
                2, 3,
                1, 1     
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(44);
        });
        test("One doesn't score", () => {
            const pins = [
                0, 0, 
                0, 0, 
                0, 0, 
                0, 0, 
                0, 0, 
                0, 0, 
                0, 0, 
                0, 0, 
                0, 0,
                0, 0     
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(0);
        })
    })
    
    describe("One terminates the game in between", () => {
        test("One terminates the game in between and gets the score", () => {
            const pins = [
                0, 0, 
                2, 3, 
                0, 0, 
                10, 
                0
            ];
            const score = playBowlingGame(pins);
            expect(score).toBe(15);
        })
    })
})