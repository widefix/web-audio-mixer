import React from 'react';
interface DeskProps {
    onPlay: () => void;
    onPause: () => void;
    onLoop: (value: any) => void;
    onMasterVolumeChange: (value: any) => void;
}
declare const Desk: React.FC<DeskProps>;
export default Desk;
