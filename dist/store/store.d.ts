export declare const effectsState: import("recoil").RecoilState<any[]>;
export declare const tracksState: import("recoil").RecoilState<any[]>;
export declare const isSoloSelector: import("recoil").RecoilValueReadOnly<boolean>;
export declare const mxState: import("recoil").RecoilState<{
    current: {
        isLooped: boolean;
        isFinished: boolean;
        currentTime: number;
        rewind: () => void;
        play: () => void;
        pause: () => void;
        fastForward: (value: any) => any;
        fastRewind: (value: any) => any;
        setCurrentPosition: (value: any) => any;
        loop: (value: any) => any;
        volume: (value: any) => any;
    };
}>;
export declare const loadingState: import("recoil").RecoilState<{}>;
