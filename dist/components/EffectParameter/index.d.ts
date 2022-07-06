import React from 'react';
export declare type EffectParameterType = 'fader' | 'radio';
export interface EffectParameterProps {
    id: string;
    name: string;
    type: EffectParameterType;
    onChange: (id: any) => void;
}
declare const EffectParameter: React.FC<EffectParameterProps>;
export default EffectParameter;
