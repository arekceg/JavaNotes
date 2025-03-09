import { useState } from "react";
import { Player } from "./Player";

export function PlayerContainer({ isStarted: gameStarted, activePlayer }) {
  const [players, setPlayers] = useState([
    {name: "PLAYER1", symbol: "X"},
    {name: "PLAYER2", symbol: "O"}
  ]);

  function handlePlayerNameChange(event) {
    const { name: playerIndex, value: playerName } = event.target;
    setPlayers((currentPlayers) => {
      const newPlayers = [...currentPlayers];
      newPlayers[playerIndex].name = playerName;
      return newPlayers;
    });
    event.preventDefault();
  }

  return (
    <ol id="players" className="highlight-player">
      {players.map((player, index) => (
        <Player
          key={index}
          index={index}
          player={player.name}
          handlePlayerNameChange={handlePlayerNameChange}
          gameStarted={gameStarted}
          isActive={activePlayer === player.symbol}
        />
      ))}
    </ol>
  );
}
