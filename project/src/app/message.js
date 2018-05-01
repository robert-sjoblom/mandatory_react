/*
The Message component expects to be passed...
- state: a game state string (plr1,plr2,plr1won,plr2won,draw)

The component will then render an appropriate message.
*/

import React from 'react';

export default function Message({gameState}){

    let message;
    if (["plr1", "plr2"].includes(gameState)) {
        message = `Player ${gameState.slice(-1)} to play.`
    } else if (gameState === "draw") {
        message = "It's a draw!"
    } else {
        message = `Player ${gameState.charAt(3)} won!`
    }

    return (
        <div className="message">{message}</div>
    );
}