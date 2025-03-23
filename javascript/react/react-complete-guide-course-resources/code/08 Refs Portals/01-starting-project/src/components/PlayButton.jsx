export function PlayButton({ handlePlayButtonPressed, timerState }) {
    return (
        <button onClick={handlePlayButtonPressed}>
            {timerState.isRunning() ? "Stop" : "Start"} challenge!
        </button>
    );
}
