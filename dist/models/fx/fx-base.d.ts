import { IAudioContext, IGainNode } from 'standardized-audio-context';
export declare class FX {
    id: string;
    isLooped: boolean;
    chain: any[];
    context: IAudioContext;
    signalIn: IGainNode<IAudioContext>;
    signalOut: IGainNode<IAudioContext>;
    constructor({ id, context, masterBus }: {
        id: any;
        context: any;
        masterBus: any;
    });
    get isChainEmpty(): boolean;
    get gain(): number;
    set gain(value: number);
    addNode(node: any, parameters?: {}): void;
    tweakNode(nodeIndex: any, parameter: any, value: any): any;
    set loop(value: boolean);
    get loop(): boolean;
}
