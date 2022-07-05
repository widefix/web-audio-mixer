import {map, not} from 'ramda';

import {
    PLAYBACK_STATUS,
} from '../constants';

export const isPlaying = status => status === PLAYBACK_STATUS.PLAYING;

export const isPaused = status => status === PLAYBACK_STATUS.PAUSED; //@TODO: && playback.currentPosition !== 0;

export const isReady = status => status === PLAYBACK_STATUS.READY;

export const isActive = status => (isPlaying(status) || isPaused(status) || isReady(status));

export const isNotActive = status => not(isActive(status));

export const playAll = map(track => track.play());

export const pauseAll = map(track => track.pause());

export const rewindAll = map(track => {
    track.stop();
    track.play();
});

export const stopAll = map(track => track.stop());
