import { IAudioContext, IAnalyserNode, IStereoPannerNode, IGainNode, IAudioBufferSourceNode } from 'standardized-audio-context';
import { TRACK_STATE } from '../constants';
declare class Track {
    source: IAudioBufferSourceNode<IAudioContext> | null;
    title: string;
    id: string;
    analyser: IAnalyserNode<IAudioContext>;
    buffer: AudioBuffer;
    context: IAudioContext;
    pausedAt: number;
    startedAt: number;
    muted: boolean;
    soloed: boolean;
    playing: boolean;
    hasBeenPlayed: boolean;
    bypassFX: boolean;
    previousVolume: number;
    state: TRACK_STATE;
    bus: IGainNode<IAudioContext>;
    soloBus: IGainNode<IAudioContext>;
    fx: any;
    loadingState: Promise<this>;
    panner: IStereoPannerNode<IAudioContext>;
    isFinished: boolean;
    isLooped: boolean;
    handleMixerUnsupportedError: (message: string) => void;
    constructor({ url, title, context, masterBus, sends, volume, pan, handleMixerUnsupportedError }: {
        url: any;
        title: any;
        context: any;
        masterBus: any;
        sends?: any[];
        volume?: number;
        pan?: number;
        handleMixerUnsupportedError: any;
    });
    get volume(): any;
    set volume(value: any);
    get pan(): number;
    set pan(value: number);
    get looped(): boolean;
    set looped(value: boolean);
    get currentTime(): number;
    toStartPosition(volume?: number, pan?: number): void;
    load(url: any): Promise<this>;
    createSource(): void;
    onSourceEnded: () => void;
    removeSource(): void;
    play(playPosition: any): void;
    playWithOffset(offset?: number): void;
    pause(): void;
    setCurrentPosition(requestedSecond: any): void;
    fastForward(value?: number): void;
    stop(): void;
    mute(): void;
    unmute(): void;
    toggleMute(): void;
    solo(): void;
    unsolo(): void;
    resetSolo(): void;
    toggleSolo(): void;
    addFx(effects: any): any;
    removeFx(id: any): void;
    toggleFX(): boolean;
}
export default Track;
