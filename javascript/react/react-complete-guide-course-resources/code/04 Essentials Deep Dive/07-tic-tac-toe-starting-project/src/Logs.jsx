export function Logs({ gameLog }) {
  return (
    <ol id="log">
      {gameLog.map(({ symbol, xIndex, yIndex }, index) => {
        return (
          <li className={index === 0 ? "highlighted" : ""} key={index}>
            {symbol} placed at {xIndex} : {yIndex}
          </li>
        );
      })}
    </ol>
  );
}
