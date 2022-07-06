/**
 * @returns {number} vertical coordinate from touch or mouse event
 */
export declare const getY: (event: any) => any;
/**
 * @returns {number} horizontal coordinate from touch or move event
 */
export declare const getX: (event: any) => any;
/**
 * @returns {number} relative position in percents
 */
export declare const getPointerVerticalPosition: (position: any, { top, bottom, height }: {
    top: any;
    bottom: any;
    height: any;
}) => number;
/**
 * @returns {number} relative position in percents
 */
export declare const getPointerHorizontalPosition: (position: any, { width, left }: {
    width: any;
    left: any;
}) => number;
export declare const getCloserToDefaultValue: (value: any, defaultValue?: number) => any;
