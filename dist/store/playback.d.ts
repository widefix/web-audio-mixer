export declare const analyserState: import("recoil").RecoilState<any>;
export declare const statusState: import("recoil").RecoilState<string>;
export declare const currentPositionState: import("recoil").RecoilState<number>;
export declare const durationState: import("recoil").RecoilState<number>;
export declare const isLoopedState: import("recoil").RecoilState<boolean>;
export declare const masterVolumeState: import("recoil").RecoilState<number>;
export declare const progressBarSelector: import("recoil").RecoilValueReadOnly<{
    currentPosition: number;
    duration: number;
}>;
