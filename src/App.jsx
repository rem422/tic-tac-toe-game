import { useState } from "react"
import Player from "./Components/Players/Player"
import GameBoard from "./Components/GameBoard/GameBoard"
import Log from "./Components/Log/Log";
import GameOver from "./Components/GameOver/GameOver";
import { WINNING_COMBINATIONS } from "../winning_combination.js";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
const [gameTurns, setGameTurns] = useState([]);

const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  let winner;

for(const combination of WINNING_COMBINATIONS) {
  const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
  const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

  if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
    winner = players[firstSquareSymbol];
  }
}

const hasDraw = gameTurns.length === 9 &&!winner;

const handleSelectPlayer = (rowIndex, colIndex) => {

  setGameTurns((prevTurns) => {
    const currentPlayer = deriveActivePlayer(prevTurns);

    const updatedTurns = [
      { square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns, 
      ];

    return updatedTurns;
  });
}

const handleRestart = () => {
  setGameTurns([]);
}

const handlePlayerNameChange = (symbol, newName) => {
  setPlayers(prevPlayers => {
    return {
      ...prevPlayers, 
      [symbol]: newName 
    };
  });
}

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            InitialName={PLAYERS.X} 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            InitialName={PLAYERS.O}
            symbol="O" 
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRetart={handleRestart}/>}
        <GameBoard 
          onSelectSquare={handleSelectPlayer}
          board = {gameBoard}  // passing the game board array to the GameBoard component for rendering purposes.
        />
      </div>
      <Log  turns={gameTurns}/>
    </main>
  )
}

export default App
