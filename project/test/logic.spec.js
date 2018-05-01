import {
    makeMove,
    newGame,
    switchPlayer,
    makePosition,
    winCheck,
    stateBuilder,
    positionEvaluation
} from '../src/logic';

test("initial state works okay", () => {
    const initial = newGame();
    expect(initial).toEqual({
        state: "plr1",
        board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        line: []
    })
});

test('first move works ok', () => {
    const initial = newGame();
    const expected = { state: 'plr2', board: [0, 0, 1, 0, 0, 0, 0, 0, 0], line: [] };
    const result = makeMove(initial, 2);
    expect(result).toEqual(expected);
    expect(initial).toEqual(newGame()); // testing we didn't mutate entry state
});

test("playing on same position returns unchanged state", () => {
    const initial = newGame();
    const firstMove = makeMove(initial, 2);
    const secondMove = makeMove(firstMove, 2);
    expect(firstMove).toEqual(secondMove);
});

test("incorrect play returns unchanged state", () => {
    const initial = newGame();
    const firstMove = makeMove(initial);
    expect(firstMove).toEqual(initial);
});
test("incorrect play returns unchanged state", () => {
    const initial = newGame();
    const firstMove = makeMove(initial, 9);
    expect(firstMove).toEqual(newGame());
});

test("makePosition returns a valid array", () => {
    const initial = newGame();
    const returnedBoard = makePosition(initial, 2);
    const secondBoard = makePosition({
        state: "plr2",
        board: [0, 0, 1, 0, 0, 0, 0, 0, 0]
    }, 0)
    expect(returnedBoard).toEqual([0, 0, 1, 0, 0, 0, 0, 0, 0])
    expect(secondBoard).toEqual([2, 0, 1, 0, 0, 0, 0, 0, 0])
});

test('second move works ok', () => {
    const initial = newGame();
    const firstMove = makeMove(initial, 0);
    const secondMove = makeMove(firstMove, 1)

    expect(initial).toEqual(newGame()); // testing we didn't mutate entry state
    expect(firstMove).toEqual({ state: "plr2", board: [1, 0, 0, 0, 0, 0, 0, 0, 0], line: [] });
    expect(secondMove).toEqual({ state: "plr1", board: [1, 2, 0, 0, 0, 0, 0, 0, 0], line: [] });
});

test("won state returns same game state", () => {
    const wonState = { state: "plr2won", board: [1, 0, 0, 0, 0, 0, 0, 0, 0], line: [] }
    const returnedState = makeMove(wonState, 2);
    expect(returnedState).toEqual(wonState);

});

test("win state returns a proper line", () => {
    const board = [0, 0, 0, 1, 1, 1, 0, 2, 2];
    expect(winCheck(board)).toEqual([3, 4, 5]);
});

test("win state returns a proper line", () => {
    const board = [0, 0, 0, 2, 1, 1, 1, 2, 2];
    expect(winCheck(board)).toEqual([]);
});

test("stateBuilder returns correct state", () => {
    const game = {
        state: "plr1",
        board: [0, 0, 0, 2, 1, 1, 1, 2, 2]
    }
    const board = [0, 0, 0, 2, 1, 1, 1, 2, 2];
    expect(stateBuilder(game, board)).toEqual({ state: "plr2", line: [] })
});

test("stateBuilder returns correct win state", () => {
    const game = { state: "plr1" }
    const board = [0, 0, 0, 1, 1, 1, 0, 2, 2];
    expect(stateBuilder(game, board)).toEqual({ state: "plr1won", line:[3, 4, 5] })
});
test("stateBuilder returns correct win state", () => {
    const game = {
        state: "plr1"
    }
    const board = [1, 1, 1, 2, 1, 1, 0, 2, 2];
    expect(stateBuilder(game, board)).toEqual({ state: "plr1won", line:[0, 1, 2] })
});

test("stateBuilder returns correct draw state", () => {
    const game = {
        state: "plr1"
    }
    const board = [1, 2, 1, 2, 2, 1, 2, 1, 2];
    expect(stateBuilder(game, board)).toEqual({state: "draw", line: []})
});

test("positionEvaluation returns correct position", () => {
    expect(positionEvaluation(7)).toEqual({ row: 2, column: 1})
    expect(positionEvaluation(3)).toEqual({ row: 1, column: 0})
})