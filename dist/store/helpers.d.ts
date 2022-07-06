import { Mixer } from '../models/mixer';
export declare const createState: (mixdesk: Mixer, hasMasterTrack: any) => {
    tracks: any;
    effects: any;
    playback: import("../helpers/entities").Playback;
};
