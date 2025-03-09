import { useState } from "react";
import { PlayerNameInput } from "./PlayerNameInput";
import { EditButton } from "./EditButton";

export function Player({
  index,
  player,
  handlePlayerNameChange,
  gameStarted,
  isActive,
}) {
  const [editable, setEditable] = useState(false);

  function updateEditable(_) {
    setEditable((prev) => !prev);
  }

  return (
    <>
      <PlayerNameInput
        index={index}
        editable={editable && !gameStarted}
        player={player}
        handlePlayerNameChange={handlePlayerNameChange}
        isActive={isActive && gameStarted}
      />
      <EditButton
        updateEditable={updateEditable}
        editable={editable && !gameStarted}
        isStarted={gameStarted}
      />
    </>
  );
}
