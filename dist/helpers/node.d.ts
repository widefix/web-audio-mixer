import { IAudioContext, IGainNode } from 'standardized-audio-context';
export declare const getNodeParamNormalizedValue: (node: any) => any;
export declare const setNodeParamNormalizedValue: (node: any, value: any) => AudioParam;
export declare const setNodeParams: (node: any, params: any) => any;
export declare const connectNodes: (source: any, destination: any) => any;
export declare const connectNodesSingle: (source: any, destination: any) => void;
export declare const createGainNode: (context: IAudioContext, defaultVolume?: number) => IGainNode<IAudioContext>;
