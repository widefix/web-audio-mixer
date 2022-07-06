import React from 'react';
interface FaderProps {
    value?: number;
    isVertical?: boolean;
    isKnobThumb?: boolean;
    onChange?: any;
    onChangeEnd?: (value: any) => void;
    onDoubleClick?: (id: any) => void;
    className?: string;
}
declare const Fader: React.FC<FaderProps>;
export default Fader;
