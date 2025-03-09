export function TicTacToeButton({ value, keyValue, onClick: updateBoard}) {
  function handleClick() {
    updateBoard();
  }

  function handleContextMenu(event) {
    event.preventDefault();
  }

  return (
    <button
      key={keyValue}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      disabled={value != ""}
    >
      {value}
    </button>
  );
}
