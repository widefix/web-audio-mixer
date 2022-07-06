import React from 'react';
interface TrackProps {
    analyser: AnalyserNode;
    id: string;
    title: string;
    volume: number;
    pan: number;
    isMuted: boolean;
    isSolo: boolean;
    isEffectsDisabled: boolean;
    fx: any;
    onMute: (trackId: any) => {};
    onSolo: (trackId: any) => {};
    onBypass: (trackId: any) => {};
    onVolumeChange: (trackId: any, volume: any) => any;
    onSendLevelChange?: (trackId: any, id: any, value: any) => void;
    onPanChange: (trackId: any, value: any) => {};
    hasSolo: boolean;
}
declare const Track: React.FC<TrackProps>;
export default Track;
