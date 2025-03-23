import { useRef, useState } from "react";
import { TimerState } from "./TimerState";
import { PlayButton } from "./PlayButton";
import { TimerStateView } from "./TimerStateView";
import { ResultModal } from "./ResultModal";

export default function TimerChallenge({ title, challengeTime = 0 }) {
  const [timerState, setTimerState] = useState(new TimerState(TimerState.IDLE));
  const timer = useRef();
  const dialog = useRef();

  function handlePlayButtonPressed() {
    if (!timerState.isRunning()) {
      startTimer();
    } else {
      stopTimer();
    }
  }

  return (
    <>
      <ResultModal
        dialogRef={dialog}
        result={timerState.isExpired() ? "lost" : "won"}
        targetTime={challengeTime}
      />
      <span className="challenge">
        {timerState.isExpired() && <p>YOU LOST</p>}
        <h2>{title}</h2>
        <p className="challenge-time">{challengeTime} seconds</p>
        <PlayButton
          handlePlayButtonPressed={handlePlayButtonPressed}
          timerState={timerState}
        />
        <TimerStateView timerState={timerState} />
      </span>
    </>
  );

  function stopTimer() {
    clearTimeout(timer.current);
    const newState = new TimerState(TimerState.States.STOPPED);
    setTimerState(newState);
    dialog.current.show();
  }

  function startTimer() {
    const newState = new TimerState(TimerState.States.RUNNING);
    setTimerState(newState); // Set to running when starting
    timer.current = setTimeout(() => {
      setTimerState(new TimerState(TimerState.States.EXPIRED));
      dialog.current.show();
    }, challengeTime * 1000);
  }
}
