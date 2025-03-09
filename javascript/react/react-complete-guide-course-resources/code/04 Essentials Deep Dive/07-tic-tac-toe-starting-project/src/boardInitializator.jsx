export function createInitialBoardState() {
  const xSize = 3;
  const ySize = 3;
  const initialBoardState = [];
  for (let x = 0; x < xSize; x++) {
    const column = [];
    for (let y = 0; y < ySize; y++) {
      column.push("");
    }
    initialBoardState.push(column);
  }
  return initialBoardState;
}
