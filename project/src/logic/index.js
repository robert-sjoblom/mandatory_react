// ---------- A tictactoe gaming library! ------------

/*
A game is an object with...
- state: a string describing the current state:
  - 'plr1': It is player 1's turn to play
  - 'plr2': It is player 2's turn to play
  - 'plr1won': Game over, the first player won
  - 'plr2won': Game over, the second player won
  - 'draw': Game over, nobody won
  gameObject = {
    state: "plr1"
    board: [0, 1, 2, 1, 2, 0, 1, 0, 2]
  }
- board: An array of 9 numbers, each of which are either:
  - 0: An empty square
  - 1: Player 1 has a marker here
  - 2: Player 2 has a marker here
- line: an array of all positions involved in the win, otherwise empty array (STRETCH TASK)

The board array goes from top left to bottom right. For example, the array
[0,1,2,1,2,0,1,0,2] represents this board:

  .---.---.---.
  |   | 1 | 2 |
  |---+---+---|
  | 1 | 2 |   |
  |---+---+---|
  | 1 |   | 2 |
  '---'---'---'
*/

/*
The newGame function will return a valid new game object.
*/
export const newGame = () => ({
    state: 'plr1',
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    line: []
});

/*
The makeMove function should be called with...
- game: A valid game object
- pos: A number 0-8 corresponding to where we want to play

It will return a new game object. If the move was invalid
(because the position was already taken or the game is over),
an unchanged game will be returned.
*/

export const makePosition = (game, pos) => {
    const meeple = (game.state === "plr1") ? 1 : 2
    return game.board.map((item, i) => {
        if (i === pos) return meeple;
        return item;
    })
}

export const stateBuilder = (game, board) => {
    let state;
    let line = winCheck(board);
    
    if (line.length > 0) {
        state = `${game.state}won`
    } else if (board.every(item => item !== 0)) {
        state = "draw"
    } else {
        state = (game.state === "plr1") ? "plr2" : "plr1"
    }
    return { state, line };
}

const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

export const winCheck = (board) => {
    let line = () => {
        return winPatterns.some((item, index) => {
            if (board[item[0]] && board[item[0]] === board[item[1]] 
                && board[item[1]] === board[item[2]]) {
                    line = item;
                    return true;
                } 
                return false
            })
            ? line 
            : [];
    }
    return line();
}

export const makeMove = (game, pos) => {
    // check if game state is plr1 or plr2, otherwise game is won/drawn
    // also check if position is free to play on
    if (!["plr1", "plr2"].includes(game.state) || game.board[pos] !== 0) {
        return game;
    }
    const board = makePosition(game, pos);
    const {state, line} = stateBuilder(game, board);

    return {
        state,
        board,
        line
    }
}

export const positionEvaluation = (position) => {
    const row_length = 3;
    const row = Math.floor(position/row_length)
    const column = position%row_length
    return { row, column} //returns 
}