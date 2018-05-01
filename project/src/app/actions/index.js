export const MOVE = "MOVE";
export const NEWGAME = "NEWGAME";

export const makeMove = (game, key) => ({
    type: MOVE,
    game,
    key
})

export const newGame = () => ({
    type: NEWGAME
})