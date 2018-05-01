import { MOVE, NEWGAME } from "../actions"
import { newGame, makeMove } from "../../logic";

export default (state, action) => {
    switch (action.type) {
        case MOVE: {
            return { game: makeMove(action.game, action.key) }
        }
        case NEWGAME: {
            return { game: newGame() }
        }
        default:
            return state;
    }
};