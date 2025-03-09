import { GameResult } from "./GameResult";

export function checkWinCondition(boardState) {
  const checkLine = (a, b, c) => {
    return a === b && b === c && a !== "";
  };

  // Check rows
  for (let row = 0; row < 3; row++) {
    if (checkLine(boardState[row][0], boardState[row][1], boardState[row][2])) {
      return boardState[row][0] === 'X' ? GameResult.X : GameResult.O;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (checkLine(boardState[0][col], boardState[1][col], boardState[2][col])) {
      return boardState[0][col] === 'X' ? GameResult.X : GameResult.O;
    }
  }

  // Check diagonals
  if (checkLine(boardState[0][0], boardState[1][1], boardState[2][2])) {
    return boardState[0][0] === 'X' ? GameResult.X : GameResult.O;
  }
  if (checkLine(boardState[0][2], boardState[1][1], boardState[2][0])) {
    return boardState[0][2] === 'X' ? GameResult.X : GameResult.O;
  }

  // Check for draw
  const isDraw = boardState.every((column) => column.every((cell) => cell !== ""));
  if (isDraw) {
    return GameResult.DRAW;
  }

  // No winner
  return GameResult.NONE;
}
