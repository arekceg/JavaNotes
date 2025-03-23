export function TimerStateView({ timerState }) {
    return (
        <p className={timerState.isRunning() ? "active" : undefined}>
            {timerState.isStopped() && "Timer waiting"}
            {timerState.isRunning() && "Timer running..."}
            {timerState.isExpired() && "Timer expired!"}
        </p>
    );
}
