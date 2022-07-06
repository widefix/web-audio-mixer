import React from 'react';
interface MasterTrackProps {
    analyser: AnalyserNode;
    width?: number;
    height?: number;
    volume?: number;
    onVolumeChange: (value: any) => void;
}
declare const MasterTrack: React.FC<MasterTrackProps>;
export default MasterTrack;
