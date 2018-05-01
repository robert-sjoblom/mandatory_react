import React, {Fragment as F} from 'react';

// import {makeMove, newGame} from '../logic';
import { newGame, makeMove } from "./actions";
// import { makeMove as mMove } from "../logic";
import { connect } from "react-redux";

import Message from './message';
import Tile from './tile';

/*
The main game App! It should have a TicTacToe game state in its component state,
and use the Tile and Message components to render the game.

Then the `makeMove` function from the logic layer should be used to update the
game state as the tiles are being clicked.

The user should also be able to reset the game.

The App component should render an outer element with a `container` CSS class,
and all tiles in an element with a `board` CSS class.
*/

class App extends React.Component {
    
    // state = newGame();
    
    onClick = (key) => {
        this.props.makeMove(this.props.game, key)
    }

    onReset = () => {
        this.props.newGame();
    }
    render(){
        const {board, line} = this.props.game;
        const gameState = this.props.game.state;

        return (
            <F>
                <Message gameState={gameState}/>
                <div className="board">
                    {board.map((tile, i) => {
                            return (<Tile
                                key={i}
                                i={i}
                                piece={tile}
                                line={line.includes(i)}
                                onClick={this.onClick} />
                            )}
                    )}
                    <button onClick={this.onReset}>Reset Game.</button>
                </div>
            </F>
        );
    }
}


export { App }; //for testing
export default connect(
    state => ({ game: state.game }), //definiera vad vår komponent vill ha
    {
        newGame, makeMove //defines what action creators we need in this component 
    }
)(App); //for using redux
