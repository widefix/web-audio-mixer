/// <reference types="react" />
import { MixerLoadingState } from '../../hooks/useMixer';
import { FX } from '../../models/fx';
interface TrackType {
    title: string;
    url: string;
}
export declare enum UserInputEvents {
    masterVolumeChange = "masterVolumeChange",
    trackVolumeChange = "trackVolumeChange",
    panChange = "panChange",
    playingStateChange = "playingStateChange",
    onRepeat = "onRepeat"
}
export interface UserInputEvent {
    type: UserInputEvents;
    value: string | bigint;
    trackId?: string;
}
export interface MixerChanges {
    masterVolume?: number;
    repeat?: boolean;
    songKey?: string;
    tracks?: {
        [trackId: string]: {
            volume?: number;
            pan?: number;
            playingState?: string | null;
        };
    };
}
export interface MixdeskProps {
    commonTracks: Array<TrackType>;
    tracks: Array<TrackType>;
    effects: FX[];
    hasMasterTrack?: boolean;
    onLoading?: (loadingState: MixerLoadingState) => void;
    stopAudio: boolean;
    setMixerIsPlaying: (boolean: any) => void;
    songKey: string;
    songId: string;
    mixerChanges: MixerChanges;
    handleMixerUnsupportedError: () => void;
    onUserInput: (event: UserInputEvent) => void;
    addMixerCountPlay?: () => void;
    isRouteChanged?: boolean;
}
export declare const Mixdesk: (props: any) => JSX.Element;
export {};
