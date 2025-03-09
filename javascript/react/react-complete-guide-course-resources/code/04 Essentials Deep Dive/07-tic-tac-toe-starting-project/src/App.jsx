import { Header } from "./Header";
import { Logs } from "./Logs";
import { checkWinCondition } from "./checkWinCondition";
import { createInitialBoardState } from "./boardInitializator";
import { useState } from "react";
import GameBoard from "./GameBoard";
import { PlayerContainer } from "./PlayerContainer";
import { GameOver } from "./GameOver";

function App() {
  const boardState = createInitialBoardState();
  const [log, setLog] = useState([]);

  drawBoard(log, boardState);
  const gameResult = checkWinCondition(boardState);

  function handleButtonClick(xIndex, yIndex) {
    const symbol = getActivePlayerSymbol(log);
    console.log(symbol);

    setLog((currentLog) => {
      const updatedLog = [
        { xIndex: xIndex, yIndex: yIndex, symbol: symbol },
        ...currentLog,
      ];
      return updatedLog;
    });
  }

  function restartGame() {
    setLog([]);
  }

  return (
    <>
      <Header />
      <div id="game-container">
        <PlayerContainer
          isStarted={log.length > 0 && !gameResult}
          activePlayer={getActivePlayerSymbol(log)}
        />
        <GameBoard
          buttonClickHandler={handleButtonClick}
          boardState={boardState}
        />
        {gameResult && <GameOver gameResult={gameResult} restartHandler={restartGame} />}
      </div>
      {!gameResult && <Logs gameLog={log} />}
    </>
  );
}

function getActivePlayerSymbol(log) {
  if (log.length === 0) {
    return "X";
  }
  return log[0].symbol === "X" ? "O" : "X";
}

function drawBoard(log, boardState) {
  log.forEach((state) => {
    const { xIndex, yIndex, symbol } = state;
    boardState[xIndex][yIndex] = symbol;
  });
}
export default App;

