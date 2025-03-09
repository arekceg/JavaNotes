export function PlayerNameInput({
  index,
  editable,
  player,
  handlePlayerNameChange,
  isActive,
}) {
  return (
    <span className="player">
      <li className={`${isActive ? "active" : ""}`} key={index}>
        {!editable ? (
          <span className="player-name">{player}</span>
        ) : (
          <input
            readOnly={!editable}
            name={index}
            onChange={handlePlayerNameChange}
            value={player}
          />
        )}
      </li>
    </span>
  );
}
