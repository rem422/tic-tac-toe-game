import { useState } from "react"
import Player from "./Components/Players/Player"
import GameBoard from "./Components/GameBoard/GameBoard"
import Log from "./Components/Log/Log";

function App() {
const[activePlayer, setActivePlayer] = useState('X');
const [gameTurns, setGameTurns] = useState([]);


const handleSelectPlayer = (rowIndex, colIndex) => {
  setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
  setGameTurns(prevTurns => {
    let currentPlayer = "X";

    if(prevTurns.length > 0 && prevTurns[0] === 'X') {
      currentPlayer = "O";
    }

    const updatedTurns = [
      { square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns, 
      ];

    return updatedTurns;
  });
}

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            InitialName="Player 1" 
            symbol="X" 
            isActive={activePlayer === 'X'}
          />
          <Player 
            InitialName="Player 2"
            symbol="O" 
            isActive={activePlayer === 'O'}
          />
        </ol>
        <GameBoard 
          onSelectSquare={handleSelectPlayer}
          turns={gameTurns}  // passing the turns array to the GameBoard component for display purposes.
        />
      </div>
      <Log />
    </main>
  )
}

export default App
