import { useState } from "react"
import Player from "./Components/Players/Player"
import GameBoard from "./Components/GameBoard/GameBoard"
import Log from "./Components/Log/Log";
import { WINNING_COMBINATIONS } from "../winning_combination.js";


const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = "O";
  }

  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function App() {
const [gameTurns, setGameTurns] = useState([]);

const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for(const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }

for(const combination of WINNING_COMBINATIONS) {
  const firstSquare = combination[0];
  const secondSquare = combination[0];
  const thirdSquare = combination[0];
}


const handleSelectPlayer = (rowIndex, colIndex) => {

  setGameTurns((prevTurns) => {
    const currentPlayer = deriveActivePlayer(prevTurns);

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
          // turns={gameTurns}  // passing the turns array to the GameBoard component for display purposes.
          board = {gameBoard}  // passing the game board array to the GameBoard component for rendering purposes.
        />
      </div>
      <Log  turns={gameTurns}/>
    </main>
  )
}

export default App
