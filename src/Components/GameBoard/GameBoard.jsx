const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]
const GameBoard = ({onSelectSquare, turns}) => {
    const gameBoard = initialGameBoard;

    for(const turn of turns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }





    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // const handleSelectSquare = (rowIndex, colIndex) => {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];

    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }

    return (
        <ol id='game-board'>
            {gameBoard.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => 
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    )
}

export default GameBoard