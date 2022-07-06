/// <reference types="react" />
import { EffectParameterProps } from '../EffectParameter';
interface Effect {
    name: string;
    parameters: EffectParameterProps[];
    onParamChange: () => void;
}
declare const Effect: ({ name, parameters, onParamChange }: {
    name?: string;
    parameters: any;
    onParamChange?: () => void;
}) => JSX.Element;
export default Effect;
