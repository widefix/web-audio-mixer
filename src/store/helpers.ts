import { reject, not} from 'ramda';

import {
    createEffectEntity,
    createPlaybackEntity,
    createTrackEntity,
} from '../helpers/entities';
import { Mixer } from '../models/mixer';


const compact = reject(item => not(Boolean(item)));

export const createState = (mixdesk: Mixer, hasMasterTrack) => {
    if (typeof window === 'undefined') {
      return null;
    }

    const tracks = compact(mixdesk.tracks.map(createTrackEntity));

    const effects = compact(mixdesk.fx.map(createEffectEntity));

    const playback = createPlaybackEntity({
        analyser: hasMasterTrack ? mixdesk.analyser : false,
        masterVolume: mixdesk.volume,
        duration: Math.max(...mixdesk.tracks.map(track => track.buffer?.duration))
    });

    return {
        tracks,
        effects,
        playback,
    };
}

