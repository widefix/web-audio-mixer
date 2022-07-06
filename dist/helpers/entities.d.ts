import { PLAYBACK_STATUS } from '../constants';
export declare const generateIdByTitle: (title: any) => any;
export declare const createTrackEntity: ({ analyser, id, title, volume, pan, muted, soloed, bypassFX, fx, state }: {
    analyser: any;
    id: any;
    title: any;
    volume: any;
    pan: any;
    muted: any;
    soloed: any;
    bypassFX: any;
    fx: any;
    state: any;
}) => {
    analyser: any;
    id: any;
    title: any;
    volume: any;
    pan: any;
    state: any;
    isMuted: any;
    isSolo: any;
    isEffectsDisabled: any;
    send: any;
};
export declare const createEffectEntity: (effect: any) => {
    id: any;
    name: string;
    parameters: {
        name: string;
        id: string;
        value: any;
    }[];
};
export interface Playback {
    analyser: AnalyserNode;
    status: PLAYBACK_STATUS;
    currentPosition: number;
    duration?: number;
    isLooped: boolean;
    masterVolume: number;
}
export declare const createPlaybackEntity: ({ analyser, status, currentPosition, duration, isLooped, masterVolume }: {
    analyser: any;
    status?: PLAYBACK_STATUS;
    currentPosition?: number;
    duration: any;
    isLooped?: boolean;
    masterVolume?: number;
}) => Playback;
