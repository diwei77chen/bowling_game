const Game = require('./Game').Game;

describe("Class Game Test Suite", () => {
    test("Increase a game score with a negative number, the game score stays unchanged.", () => {
        const game = new Game(0, false);
        game.increaseScore(-1);
        expect(game.totalScore).toBe(0);
    });
    test("Increase a game score with a not-a-number type value, the game score stays unchanged.", () => {
        const game = new Game(0, false);
        game.increaseScore('a');
        expect(game.totalScore).toBe(0);
    });
    test("Decrease a game score with a negative number, the game score stays unchanged.", () => {
        const game = new Game(0, false);
        game.decreaseScore(-1);
        expect(game.totalScore).toBe(0);
    });
    test("Decrease a game score with a not-a-number type value, the game score stays unchanged.", () => {
        const game = new Game(0, false);
        game.decreaseScore('a');
        expect(game.totalScore).toBe(0);
    });
    test("Set isGameClosed with a non-boolean type value, the status stays unchanged.", () => {
        const game = new Game(0, false);
        game.isGameClosed = 'a';
        expect(game.isGameClosed).toBe(false);
    });
})