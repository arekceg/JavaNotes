// TimerState class to manage timer states
export class TimerState {
    static States = {
        STOPPED: "stopped",
        RUNNING: "running",
        EXPIRED: "expired",
        IDLE: "idle",
    };

    constructor(state = TimerState.States.IDLE) {
        this.state = state;
    }

    isStopped() {
        return this.state === TimerState.States.STOPPED;
    }

    isRunning() {
        return this.state === TimerState.States.RUNNING;
    }

    isExpired() {
        return this.state === TimerState.States.EXPIRED;
    }

    isIdle(){
        return this.state === TimerState.States.IDLE;
    }

    setState(newState) {
        this.state = newState;
    }
}
