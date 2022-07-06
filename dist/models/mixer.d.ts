import Track from './track';
import { FX } from './fx';
import { IAudioContext, IAnalyserNode, IGainNode } from 'standardized-audio-context';
export declare class Mixer {
    context: IAudioContext;
    analyser: IAnalyserNode<IAudioContext>;
    tracks: Track[];
    commonTracks: Track[];
    fx: FX[];
    masterBus: IGainNode<IAudioContext>;
    handleMixerUnsupportedError: () => void;
    constructor(sources: any[], effects: any[], handleMixerUnsupportedError: any);
    getFirstTrackProperty(propName: any, defaultValue: any): any;
    get volume(): number;
    set volume(value: number);
    get duration(): number;
    get currentTime(): number;
    get isFinished(): boolean;
    get isLooped(): boolean;
    setCurrentPosition(value: any): Promise<Track[]>;
    fastForward(value?: number): Promise<Track[]>;
    fastRewind(value?: number): Promise<Track[]>;
    /**
     * @returns {Promise<Mixer>}
     */
    play(): Promise<this>;
    /**
     * @returns {Promise<Mixer>}
     */
    pause(): Promise<this>;
    /**
     * @returns {Promise<Mixer>}
     */
    rewind(): Promise<this>;
    /**
     * @returns {Promise<Mixer>}
     */
    stop(): Promise<this>;
    /**
     * @param {TrackId} trackId
     * @param {number} volume
     * @returns {Promise<Track[]>}
     */
    setTrackVolume(trackId: any, volume: any): Promise<Track[]>;
    /**
     * @param {TrackId} trackId
     * @param {number} volume
     * @returns {Promise<Track[]>}
     */
    setTrackPan(trackId: any, pan: any): Promise<Track[]>;
    /**
     *
     * @param {TrackId} trackId
     * @param {SendId} sendId
     * @param {number} level
     * @returns {Promise<Track[]>}
     */
    setTrackSendLevel(trackId: any, sendId: any, level: any): Promise<Track[]>;
    /**
     * @param {TrackId} trackId
     * @param {number} value
     * @returns {Promise<Track[]>}
     */
    setTrackPanLevel(trackId: any, value: any): Promise<Track[]>;
    /**
     * @param {TrackId} trackId
     * @returns {Promise<Track[]>}
     */
    soloTrack(trackId: any): Promise<Track[]>;
    /**
     * @param {TrackId} trackId
     * @returns {Promise<Track[]>}
     */
    toggleTrack(trackId: any): Promise<Track[]>;
    /**
     * @param {TrackId} trackId
     * @returns {Promise<Track[]>}
     */
    toggleTrackFx(trackId: any): Promise<Track[]>;
    /**
     *
     * @param {SendId} sendId
     * @param {number|string} value
     * @retruns {Promise<Send[]>}
     */
    setSendParamValue(sendId: any, parameterId: any, value: any): Promise<FX[]>;
    loop(value: any): Promise<Track[]>;
    loadCommonTrack(sources: any): Promise<void>;
    load(sources: any, callback?: any): Promise<Track[]>;
}
