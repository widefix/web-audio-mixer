import React from 'react';
import { UserInputEvent, MixerChanges } from "../containers";
interface MxContextInterface {
    mx: any;
    isReady: boolean;
    mixerChanges: MixerChanges;
    onUserInput: (event: UserInputEvent) => void;
}
export declare const MxContext: React.Context<MxContextInterface>;
export declare const MxContextProvider: React.FC<MxContextInterface>;
declare const useMxContext: () => MxContextInterface;
export { useMxContext };
