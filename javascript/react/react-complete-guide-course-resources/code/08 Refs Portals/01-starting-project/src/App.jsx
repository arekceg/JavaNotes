import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallenge.jsx";

const challenges = [
  { challengeTime: 3, title: "easy" },
  { challengeTime: 5, title: "mid" },
  { challengeTime: 8, title: "hard" },
  { challengeTime: 10, title: "impossible" },
];

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        {challenges.map((challenge, index) => (
          <TimerChallenge
            key={index}
            challengeTime={challenge.challengeTime}
            title={challenge.title}
          />
        ))}
      </div>
    </>
  );
}

export default App;
