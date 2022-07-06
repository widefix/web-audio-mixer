/// <reference types="react" />
interface KnobProps {
    min: number;
    max: number;
    value: number;
    onChange: any;
}
declare const Knob: ({ max, min, value, onChange }: KnobProps) => JSX.Element;
export default Knob;
