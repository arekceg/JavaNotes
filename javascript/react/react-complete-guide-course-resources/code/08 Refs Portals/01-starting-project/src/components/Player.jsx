import { useRef, useState } from "react";

export default function Player() {
  const playerInput = useRef();
  const [playerName, setPlayerName] = useState("unknown player");

  return (
    <section id="player">
      <h2>Welcome {playerName ?? "unknown player"}</h2>
      <p>
        <input ref={playerInput} type="text" />
        <button onClick={savePlayerName}> Set Name</button>
      </p>
    </section>
  );

  function savePlayerName() {
    setPlayerName(playerInput.current.value);
  }
}
