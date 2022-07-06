/// <reference types="react" />
import { Mixer } from '../models/mixer';
import { FX } from '../models/fx/fx-base';
import { Playback } from '../helpers/entities';
export interface MixerTrack {
    url: string;
    title: string;
}
export interface MixerState {
    tracks: MixerTrack[];
    effects: FX[];
    playback: Playback;
    loadingState?: () => MixerLoadingState;
}
export interface MixerLoadingState {
    length: number;
    current: number;
    progress: number;
    isLoading: boolean;
}
export interface UseMixerHook {
    mx: {
        current?: Mixer;
    };
    state: MixerState;
    dispatch: React.Dispatch<any>;
}
export declare const useMixer: (commonTracks: any, tracks: any, effects: any, hasMasterTrack: any, onLoading: any, setIsReady: any, handleMixerUnsupportedError: any) => import("react").MutableRefObject<any>;
