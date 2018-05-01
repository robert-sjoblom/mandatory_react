import React, {Fragment as F} from 'react';

import {makeMove, newGame} from '../logic';

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

export default class App extends React.Component {
    state = newGame();
    
    onClick = (key) => {
        this.setState(
            makeMove(this.state, key)
        );
    }

    onReset = () => {
        this.setState(
            newGame()
        )
    }
    render(){
        const {board, line} = this.state;
        const gameState = this.state.state;

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