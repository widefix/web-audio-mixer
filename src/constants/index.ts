export enum PLAYBACK_STATUS {
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
    READY = 'READY',
    FAILED = 'FAILED',
    NOT_SET = 'NOT_SET',
};

export enum CONTEXT_STATE {
    RUNNING = 'running',
    SUSPENDED = 'suspended',
}

export enum TRACK_STATE {
    LOADING = 'LOADING',
    READY = 'READY',
    FAILED = 'FAILED',
    NOT_SET = 'NOT_SET',
};

export enum FILTER_TYPES {
	LOWPASS = 'lowpass',
	HIGHPASS = 'highpass',
	BANDPASS = 'bandpass',
};
