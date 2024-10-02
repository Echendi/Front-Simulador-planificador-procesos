export interface SimulationLog {
    readyQueue: Process[];
    endQueue: Process[];
    toReadyProcess: Process[];
    remainingQuantum: number;
    toRunningProcess?: Process;
    runningProcess?: Process;
    clock: number;
    cpuStatus: CPUStatus;
    toEndedProcess?: Process;
    batch?: number
}

export enum CPUStatus {
    Busy = "BUSY",
    Idle = "IDLE",
}

export interface Process {
    id: number;
    burstTime: number;
    remainingTime: number;
    status: ToEndedProcessStatus;
    timeArrive: number;
    completionTime?: number;
    turnaroundTime?: number;
    waitingTime?: number;
    normalizedTurnaroundTime?: number;
}

export enum ToEndedProcessStatus {
    Ended = "ENDED",
}

export enum RunningProcessStatus {
    Ready = "READY",
    Running = "RUNNING",
}
