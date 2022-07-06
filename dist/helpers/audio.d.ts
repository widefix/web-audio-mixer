import { AudioContext, IAnalyserNode, IGainNode, IAudioContext } from 'standardized-audio-context';
export declare const createContext: () => IAudioContext;
export declare const createMasterBus: (context: AudioContext, connections?: any[]) => IGainNode<IAudioContext>;
export declare const createAnalyser: (context: AudioContext, parameters?: {
    fftSize: number;
}) => IAnalyserNode<IAudioContext>;
export declare const createPanner: (context: IAudioContext) => import("standardized-audio-context").IStereoPannerNode<IAudioContext>;
export declare const isAudioParam: (node: any, parameter: any) => boolean;
export declare const fetchAudioAsArrayBuffer: (url: any) => Promise<ArrayBuffer>;
export declare const isContextRunning: (context: any) => boolean;
/**
 * @returns {Promise}
 */
export declare const resumeContext: (context: any) => any;
