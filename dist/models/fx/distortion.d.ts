import { FX } from './fx-base';
export declare class Distortion extends FX {
    private _strength;
    get strength(): any;
    set strength(value: any);
    set filterType(value: any);
    get filterType(): any;
    set frequency(value: any);
    get frequency(): any;
    constructor(context: any, masterBus: any);
    getCurve(strength: any): Float32Array;
}
