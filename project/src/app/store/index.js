import { createStore, compose } from "redux";
import reducer from "../reducers"
import { newGame } from "../../logic"

const initialState = {
    game: newGame(),
};

const composeEnhancer = (
    typeof window !== "undefined" && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

export default createStore(
    reducer,    //första parametern är vilken reducer vi använder
    initialState, // andra parametern är initial state 
    composeEnhancer()
);