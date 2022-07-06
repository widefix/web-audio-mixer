import { FX } from './fx-base';
declare const RESPONSES: {
    Versatile: string;
    Pattan: string;
    Style: string;
};
export declare class Reverb extends FX {
    responses: typeof RESPONSES;
    currentResponseId: 'Versatile' | 'Pattan' | 'Style';
    constructor(context: any, masterBus: any, options?: {
        responses: {
            Versatile: string;
            Pattan: string;
            Style: string;
        };
    });
    get currentResponse(): "Versatile" | "Pattan" | "Style";
    set currentResponse(responseId: "Versatile" | "Pattan" | "Style");
    loadResponse(): Promise<void>;
}
export {};
