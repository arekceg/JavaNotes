import { TicTacToeButton } from "./TicTacToeButton";



export default function GameBoard({ buttonClickHandler, boardState }) {

  const printBoard = () => {
    return boardState.map((column, xIndex) => (
      <ol key={xIndex}>
        {column.map((value, yIndex) => (
          <TicTacToeButton
            value={value}
            keyValue={`${xIndex}-${yIndex}`}
            onClick={() => handleButtonClick(xIndex, yIndex)}
          />
        ))}
      </ol>
    ));
  };

  return (
    <>
      <div id="game-board">{printBoard()}</div>
    </>
  );

  function handleButtonClick(xIndex, yIndex) {
    if (boardState[xIndex][yIndex] != "") {
      return;
    }
    return buttonClickHandler(xIndex, yIndex);
  }
}
