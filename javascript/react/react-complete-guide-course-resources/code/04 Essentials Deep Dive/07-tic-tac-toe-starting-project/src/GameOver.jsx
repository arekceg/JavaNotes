import { GameResult } from "./GameResult";
export function GameOver({ gameResult, restartHandler }) {
  return (
    <div id="game-over">
      <h2>Game over!</h2>
      {gameResult === GameResult.DRAW ? <p>Draw!</p> : <p>{gameResult} won!</p>}
      <button onClick={restartHandler}>Restart</button>
    </div>
  );
}
