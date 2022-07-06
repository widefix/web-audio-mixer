import { DependencyList } from 'react';
interface IPosition {
    x: number;
    y: number;
}
interface IScrollProps {
    prevPos: IPosition;
    currPos: IPosition;
}
export declare const useScrollPosition: {
    (effect: (props: IScrollProps) => void, deps?: DependencyList, wait?: number): void;
    defaultProps: {
        deps: any[];
        element: boolean;
        useWindow: boolean;
        wait: any;
        boundingElement: boolean;
    };
};
export {};
