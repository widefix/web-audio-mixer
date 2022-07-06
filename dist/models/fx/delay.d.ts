import { FX } from './fx-base';
export declare class Delay extends FX {
    chain: any;
    constructor(context: any, masterBus: any);
    set time(value: any);
    get time(): any;
    set feedback(value: any);
    get feedback(): any;
    set frequency(value: any);
    get frequency(): any;
}
