function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ramda = require('ramda');
var recoil = require('recoil');
var standardizedAudioContext = require('standardized-audio-context');

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

(function (PLAYBACK_STATUS) {
  PLAYBACK_STATUS["PLAYING"] = "PLAYING";
  PLAYBACK_STATUS["PAUSED"] = "PAUSED";
  PLAYBACK_STATUS["READY"] = "READY";
  PLAYBACK_STATUS["FAILED"] = "FAILED";
  PLAYBACK_STATUS["NOT_SET"] = "NOT_SET";
})(exports.PLAYBACK_STATUS || (exports.PLAYBACK_STATUS = {}));

(function (CONTEXT_STATE) {
  CONTEXT_STATE["RUNNING"] = "running";
  CONTEXT_STATE["SUSPENDED"] = "suspended";
})(exports.CONTEXT_STATE || (exports.CONTEXT_STATE = {}));

(function (TRACK_STATE) {
  TRACK_STATE["LOADING"] = "LOADING";
  TRACK_STATE["READY"] = "READY";
  TRACK_STATE["FAILED"] = "FAILED";
  TRACK_STATE["NOT_SET"] = "NOT_SET";
})(exports.TRACK_STATE || (exports.TRACK_STATE = {}));

(function (FILTER_TYPES) {
  FILTER_TYPES["LOWPASS"] = "lowpass";
  FILTER_TYPES["HIGHPASS"] = "highpass";
  FILTER_TYPES["BANDPASS"] = "bandpass";
})(exports.FILTER_TYPES || (exports.FILTER_TYPES = {}));

const isPlaying = status => status === exports.PLAYBACK_STATUS.PLAYING;
const isPaused = status => status === exports.PLAYBACK_STATUS.PAUSED;
const isReady = status => status === exports.PLAYBACK_STATUS.READY;
const isActive = status => isPlaying(status) || isPaused(status) || isReady(status);
const isNotActive = status => ramda.not(isActive(status));
const playAll = ramda.map(track => track.play());
const pauseAll = ramda.map(track => track.pause());
const rewindAll = ramda.map(track => {
  track.stop();
  track.play();
});
const stopAll = ramda.map(track => track.stop());

var style = {"desk":"_2kf8g","mixerTitle":"_2V3yc","tracks":"_2TO1x","deskContainer":"_2kOB-","controlsBlock":"_3SXRN","controlsContainerDisable":"_SN2XI","controlsContainer":"_3WLpI","controls":"_1otLf","controlsLeft":"_3FLrC","controlButton":"_3Il0q","controlsCustom":"_Daig5","controlsRight":"_3Ss9M","button":"_2FsJu","loopButton":"_30Mz1","isNotActive":"_oTeQj","isActive":"_2cjg2","masterVolumeContainer":"_2IMuc","isButtonPressed":"_3oNW9","effects":"_35pDI","progressContainer":"_gyQgR","progressBar":"_1nvMv","progressTimeNow":"_3SsZg","progressTime":"_yggUB","masterVolume":"_81rJ9","volumeSlider":"_3zm63","controlsWrapper":"_2ktLa","isFixed":"_Rsy0z"};

const analyserState = recoil.atom({
  key: 'analyserState',
  default: null
});
const statusState = recoil.atom({
  key: 'statusState',
  default: 'NOT_SET'
});
const currentPositionState = recoil.atom({
  key: 'currentPositionState',
  default: 0
});
const durationState = recoil.atom({
  key: 'durationState',
  default: 0
});
const isLoopedState = recoil.atom({
  key: 'isLoopedState',
  default: false
});
const masterVolumeState = recoil.atom({
  key: 'masterVolumeState',
  default: 0
});
const progressBarSelector = recoil.selector({
  key: 'progressBarSelector',
  get: ({
    get
  }) => {
    const currentPosition = get(currentPositionState);
    const duration = get(durationState);
    return {
      currentPosition,
      duration
    };
  }
});

var style$1 = {"fader":"_3SLwD","isHorisontal":"_a_YRY","control":"_1PidS","thumb":"_jFkfm","isAnimated":"_2cNRh","isKnobThumb":"_1T2bO","knobControl":"_QdsWQ","isDragging":"_3kloK"};

const FaderThumb = ({
  position = 0,
  isVertical = false,
  events = {},
  isKnobThumb = false,
  className
}) => {
  const styleProperty = isVertical ? 'bottom' : 'left';
  const stylePropertyValue = position + '%';
  return /*#__PURE__*/React__default.createElement("div", {
    "data-thumb": true
  }, /*#__PURE__*/React__default.createElement("div", Object.assign({
    className: `${style$1.thumb} ${className}`,
    style: {
      [styleProperty]: stylePropertyValue
    }
  }, events)), isKnobThumb && /*#__PURE__*/React__default.createElement("div", {
    className: style$1.knobControl,
    style: {
      width: stylePropertyValue
    }
  }));
};

const getY = event => event.touches ? event.touches[0].pageY : event.pageY;
const getX = event => event.touches ? event.touches[0].pageX : event.pageX;
const getPointerVerticalPosition = (position, {
  top,
  bottom,
  height
}) => {
  let value = position;
  if (value < top) value = top;
  if (value > bottom) value = bottom;
  value = bottom - value;
  return value / (height / 100);
};
const getPointerHorizontalPosition = (position, {
  width,
  left
}) => {
  let value = position;
  const rightBorder = left + width;
  if (value > rightBorder) value = rightBorder;
  if (value < left) value = left;
  value = value - left;
  return value / (width / 100);
};
const getCloserToDefaultValue = (value, defaultValue = 70) => {
  return Number(value) <= Number(defaultValue + 10) && Number(value) >= Number(defaultValue - 10) ? defaultValue : value;
};

const EVENTS_MAP = {
  mousemove: 'touchmove',
  mouseup: 'touchend',
  mousedown: 'touchstart'
};
const isServer = typeof window === 'undefined';

const hasTouchEventsSupport = () => !isServer && 'ontouchstart' in window;

const getEventNameByFeature = eventName => hasTouchEventsSupport() ? EVENTS_MAP[eventName] : eventName;

const Fader = ({
  value = 0,
  isVertical = false,
  isKnobThumb = false,
  onChange = () => {},
  onChangeEnd = () => {},
  onDoubleClick,
  className = ''
}) => {
  const containerRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const onMoveStart = event => {
    event.preventDefault();
    document.documentElement.addEventListener(getEventNameByFeature('mousemove'), onMove);
    document.documentElement.addEventListener(getEventNameByFeature('mouseup'), onMoveEnd);
    return false;
  };

  const onMove = event => {
    event.preventDefault();
    triggerChangeEvent(event, onChange);
    return false;
  };

  const onMoveEnd = event => {
    event.preventDefault();
    document.documentElement.removeEventListener(getEventNameByFeature('mousemove'), onMove);
    document.documentElement.removeEventListener(getEventNameByFeature('mouseup'), onMoveEnd);
    triggerChangeEvent(event, onChangeEnd);
    setIsDragging(false);
    return false;
  };

  let timeout;

  const triggerChangeEvent = (event, changeCallback) => {
    if (timeout) {
      cancelAnimationFrame(timeout);
    }

    timeout = requestAnimationFrame(() => {
      setIsDragging(true);
      const containerElement = containerRef.current;
      const offset = containerElement && containerElement.getBoundingClientRect();
      const x = getX(event) - document.documentElement.scrollLeft;
      const y = getY(event) - document.documentElement.scrollTop;
      const newValue = isVertical ? getPointerVerticalPosition(y, offset) : getPointerHorizontalPosition(x, offset);
      changeCallback(getCloserToDefaultValue(newValue));
    });
    return false;
  };

  const thumbEventName = hasTouchEventsSupport() ? 'onTouchStart' : 'onMouseDown';

  const onClick = event => onChangeEnd((event.clientX - containerRef.current.offsetLeft) / containerRef.current.offsetWidth * 100);

  return /*#__PURE__*/React__default.createElement("div", {
    className: classnames(style$1.fader, !isVertical && style$1.isHorisontal, isKnobThumb && style$1.isKnobThumb, isDragging && style$1.isDragging),
    ref: containerRef,
    onClick: onClick
  }, /*#__PURE__*/React__default.createElement("div", {
    className: style$1.control
  }, /*#__PURE__*/React__default.createElement(FaderThumb, {
    position: value,
    events: {
      [thumbEventName]: onMoveStart,
      onDoubleClick: onDoubleClick
    },
    isVertical: isVertical,
    isKnobThumb: isKnobThumb,
    className: className
  })));
};

const isBrowser = typeof window !== `undefined`;
const zeroPosition = {
  x: 0,
  y: 0
};

const getScrollPosition = () => {
  if (!isBrowser) {
    return zeroPosition;
  }

  return {
    x: window.scrollX,
    y: window.scrollY
  };
};

const useScrollPosition = (effect, deps, wait) => {
  const position = React.useRef(getScrollPosition());
  let throttleTimeout = null;

  const callBack = () => {
    const currPos = getScrollPosition();
    effect({
      prevPos: position.current,
      currPos
    });
    position.current = currPos;
    throttleTimeout = null;
  };

  React.useLayoutEffect(() => {
    if (!isBrowser) {
      return undefined;
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = window.setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, deps);
};
useScrollPosition.defaultProps = {
  deps: [],
  element: false,
  useWindow: false,
  wait: null,
  boundingElement: false
};

const createContext = () => {
  return new standardizedAudioContext.AudioContext();
};
const createMasterBus = (context, connections = []) => {
  const gain = context.createGain();
  gain.connect(context.destination);
  connections.map(connection => gain.connect(connection));
  return gain;
};
const createAnalyser = (context, parameters = {
  fftSize: 64
}) => {
  const analyser = context.createAnalyser();
  ramda.keys(parameters).map(key => analyser[key] = parameters[key]);
  return analyser;
};
const createPanner = context => context.createStereoPanner();
const isAudioParam = (node, parameter) => node[parameter] instanceof AudioParam;
const fetchAudioAsArrayBuffer = url => fetch(url, {
  credentials: 'include'
}).then(response => response.arrayBuffer());
const isContextRunning = context => context.state === exports.CONTEXT_STATE.RUNNING;
const resumeContext = context => context.resume();

const getNodeParamNormalizedValue = node => {
  const {
    value,
    maxValue,
    defaultValue
  } = node;
  let resultValue = value;

  if (defaultValue === 1) {
    resultValue = value / (1 / 100);
  } else {
    resultValue = value / (maxValue / 100);
  }

  return resultValue;
};
const setNodeParamNormalizedValue = (node, value) => {
  const {
    maxValue,
    minValue,
    defaultValue
  } = node;
  const dividend = defaultValue === 1 ? 1 : maxValue;
  const absoluteValue = value * (dividend / 100);

  if (absoluteValue < minValue) {
    node.value = minValue;
    return node;
  }

  if (absoluteValue > maxValue) {
    node.value = maxValue;
    return node;
  }

  node.value = absoluteValue;
  return node;
};
const setNodeParams = (node, params) => ramda.keys(params).forEach(key => {
  if (isAudioParam(node, key)) {
    setNodeParamNormalizedValue(node[key], params[key]);
  } else {
    node[key] = params[key];
  }

  return node;
});
const connectNodes = (source, destination) => source.connect(destination);
const connectNodesSingle = (source, destination) => {
  source.disconnect();
  connectNodes(source, destination);
};
const createGainNode = (context, defaultVolume = 1) => {
  const gain = context.createGain();
  gain.gain.value = defaultVolume;
  return gain;
};

const createReverbEntity = ({
  id,
  responses,
  currentResponse
}) => ({
  id,
  name: 'Reverb',
  parameters: [{
    name: 'Response',
    id: 'currentResponse',
    value: currentResponse,
    values: Object.keys(responses),
    type: 'radio'
  }]
});

const createDelayEntity = ({
  id,
  time,
  feedback,
  frequency
}) => ({
  id,
  name: 'Delay',
  parameters: [{
    name: 'Time',
    id: 'time',
    value: time
  }, {
    name: 'Feedback',
    id: 'feedback',
    value: feedback
  }, {
    name: 'Frequency',
    id: 'frequency',
    value: frequency
  }]
});

const createDistortionEntity = ({
  id,
  filterType,
  frequency,
  strength
}) => ({
  id,
  name: 'Distortion',
  parameters: [{
    name: 'Filter Type',
    id: 'filterType',
    value: filterType,
    values: Object.values(exports.FILTER_TYPES),
    type: 'radio'
  }, {
    name: 'Frequency',
    id: 'frequency',
    value: frequency
  }, {
    name: 'Strength',
    id: 'strength',
    value: strength
  }]
});

const generateIdByTitle = title => title.replace(/[^A-Za-z0-9]+/gi, '').toLowerCase();
const createTrackEntity = ({
  analyser,
  id,
  title,
  volume,
  pan,
  muted,
  soloed,
  bypassFX,
  fx,
  state
}) => {
  return {
    analyser,
    id,
    title,
    volume,
    pan,
    state,
    isMuted: muted,
    isSolo: soloed,
    isEffectsDisabled: bypassFX,
    send: ramda.map(send => getNodeParamNormalizedValue(send.gain), fx)
  };
};
const createEffectEntity = effect => {
  switch (effect.id) {
    case 'delay':
      return createDelayEntity(effect);

    case 'distortion':
      return createDistortionEntity(effect);

    case 'reverb':
      return createReverbEntity(effect);

    default:
      return null;
  }
};
const createPlaybackEntity = ({
  analyser,
  status = exports.PLAYBACK_STATUS.NOT_SET,
  currentPosition = 0,
  duration,
  isLooped = false,
  masterVolume = 70
}) => ({
  analyser,
  status,
  currentPosition,
  duration,
  isLooped,
  masterVolume
});

const compact = ramda.reject(item => ramda.not(Boolean(item)));
const createState = (mixdesk, hasMasterTrack) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const tracks = compact(mixdesk.tracks.map(createTrackEntity));
  const effects = compact(mixdesk.fx.map(createEffectEntity));
  const playback = createPlaybackEntity({
    analyser: hasMasterTrack ? mixdesk.analyser : false,
    masterVolume: mixdesk.volume,
    duration: Math.max(...mixdesk.tracks.map(track => {
      var _track$buffer;

      return (_track$buffer = track.buffer) === null || _track$buffer === void 0 ? void 0 : _track$buffer.duration;
    }))
  });
  return {
    tracks,
    effects,
    playback
  };
};

class Track {
  constructor({
    url,
    title,
    context,
    masterBus,
    sends = [],
    volume = 70,
    pan = 50,
    handleMixerUnsupportedError
  }) {
    this.buffer = null;
    this.pausedAt = 0;
    this.startedAt = 0;
    this.muted = false;
    this.soloed = false;
    this.playing = false;
    this.hasBeenPlayed = false;
    this.bypassFX = false;
    this.state = exports.TRACK_STATE.NOT_SET;
    this.isLooped = false;

    this.onSourceEnded = () => {
      this.stop();
    };

    this.id = generateIdByTitle(title);
    this.handleMixerUnsupportedError = handleMixerUnsupportedError;
    this.title = title;
    this.context = context;
    this.isFinished = false;
    this.analyser = createAnalyser(this.context);
    this.bus = createGainNode(context);
    this.soloBus = createGainNode(context);
    this.panner = createPanner(context);
    connectNodes(this.bus, this.panner);
    connectNodes(this.panner, this.analyser);
    connectNodes(this.analyser, this.soloBus);
    connectNodes(this.soloBus, masterBus);
    this.fx = {};
    this.volume = volume;
    this.pan = pan;

    if (sends.length > 0) {
      this.addFx(sends);
    }

    this.loadingState = this.load(url);
  }

  get volume() {
    return getNodeParamNormalizedValue(this.bus.gain);
  }

  set volume(value) {
    if (this.muted) {
      this.previousVolume = value;
    } else {
      setNodeParamNormalizedValue(this.bus.gain, value);
    }
  }

  get pan() {
    const countAbsoluteValue = val => {
      return (val + 100) / 2;
    };

    return countAbsoluteValue(getNodeParamNormalizedValue(this.panner.pan));
  }

  set pan(value) {
    const countAbsoluteValue = val => {
      return -100 + val * 2;
    };

    setNodeParamNormalizedValue(this.panner.pan, countAbsoluteValue(value));
  }

  get looped() {
    return this.source.loop;
  }

  set looped(value) {
    this.isLooped = value;
    !this.source && this.createSource();
    this.source.loop = value;
  }

  get currentTime() {
    if (this.buffer) {
      return (this.context.currentTime - this.startedAt) % this.buffer.duration;
    }

    return 0;
  }

  toStartPosition(volume = 70, pan = 50) {
    if (this.muted) {
      this.unmute();
    }

    setNodeParamNormalizedValue(this.soloBus.gain, 100);
    this.soloed = false;
    this.volume = volume;
    this.pan = pan;
  }

  load(url) {
    return fetchAudioAsArrayBuffer(url).catch(e => {
      throw {
        error: e,
        message: 'Mixer unavailable at this time. Please reach out to support if the issue persists'
      };
    }).then(audioBuffer => {
      return new Promise((resolve, reject) => this.context.decodeAudioData(audioBuffer, resolve, reject)).then(decodedAudioData => {
        this.buffer = decodedAudioData;
        this.state = exports.TRACK_STATE.READY;
        this.createSource();
        return this;
      }).catch(e => {
        throw {
          error: e,
          message: "Unfortunately, your browser doesn't support mixer!"
        };
      });
    }).catch(error => {
      this.handleMixerUnsupportedError(error.message);
      this.state = exports.TRACK_STATE.FAILED;
      console.log('[ERROR LOADING TRACK]', error, `URL: ${url}`);
      return this;
    });
  }

  createSource() {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.bus);

    if (this.isLooped) {
      this.looped = true;
    } else {
      this.source.addEventListener('ended', this.onSourceEnded);
    }
  }

  removeSource() {
    if (this.source) {
      this.source.removeEventListener('ended', this.onSourceEnded);
      this.source.disconnect();
      this.hasBeenPlayed && this.source.stop(0);
      this.source = null;
    }
  }

  play(playPosition) {
    this.hasBeenPlayed = true;
    this.isFinished = false;

    if (!this.playing) {
      !this.source && this.createSource();
      this.source.start(0, playPosition || this.pausedAt);
      this.startedAt = playPosition ? (this.context.currentTime - playPosition) % this.buffer.duration : (this.context.currentTime - this.pausedAt) % this.buffer.duration;
      this.pausedAt = 0;
      this.playing = true;
    }
  }

  playWithOffset(offset = 0) {
    this.play(this.pausedAt + offset > 0 ? this.pausedAt + offset : 0);
  }

  pause() {
    if (this.playing) {
      const elapsed = (this.context.currentTime - this.startedAt) % this.buffer.duration;
      this.removeSource();
      this.playing = false;
      this.pausedAt = elapsed;
    }
  }

  setCurrentPosition(requestedSecond) {
    if (this.playing) {
      this.pause();
      this.play(requestedSecond);
    } else {
      this.pausedAt = requestedSecond < 0 ? 0 : requestedSecond;
    }
  }

  fastForward(value = 15) {
    if (this.playing) {
      this.pause();
      this.playWithOffset(value);
    } else {
      this.pausedAt = this.pausedAt + value > 0 ? this.pausedAt + value : 0;
    }
  }

  stop() {
    this.isFinished = true;
    this.pause();
  }

  mute() {
    this.previousVolume = this.volume;
    this.volume = 0;
    this.muted = true;
  }

  unmute() {
    this.muted = false;
    this.volume = this.previousVolume;
  }

  toggleMute() {
    this.muted ? this.unmute() : this.mute();
  }

  solo() {
    this.soloed = true;
    setNodeParamNormalizedValue(this.soloBus.gain, 100);
  }

  unsolo() {
    this.soloed = false;
    setNodeParamNormalizedValue(this.soloBus.gain, 0);
  }

  resetSolo() {
    setNodeParamNormalizedValue(this.soloBus.gain, 100);
  }

  toggleSolo() {
    this.soloed ? this.unsolo() : this.solo();
  }

  addFx(effects) {
    return effects.map(fx => {
      const {
        id,
        signalIn
      } = fx;
      const bus = createGainNode(this.context, 0);

      if (this.fx[id]) {
        return false;
      }

      connectNodes(this.bus, bus);
      connectNodes(bus, signalIn);
      this.fx[id] = bus;
      return bus;
    });
  }

  removeFx(id) {
    this.fx[id].disconnect();
  }

  toggleFX() {
    const keys = Object.keys(this.fx);
    this.bypassFX ? keys.map(fxId => this.fx[fxId].gain.value = this.fx[fxId].previousVolume) : keys.map(fxId => {
      this.fx[fxId].previousVolume = this.fx[fxId].gain.value;
      this.fx[fxId].gain.value = 0;
    });
    this.bypassFX = !this.bypassFX;
    return this.bypassFX;
  }

}

class Mixer {
  constructor(sources = [], effects = [], handleMixerUnsupportedError) {
    if (typeof window !== 'undefined') {
      this.context = createContext();
      this.analyser = createAnalyser(this.context);
      this.masterBus = createMasterBus(this.context, [this.analyser]);
      this.tracks = [];
      this.handleMixerUnsupportedError = handleMixerUnsupportedError;
      this.volume = 100;
      this.fx = effects.map(Effect => new Effect(this.context, this.masterBus));
      this.loadCommonTrack(sources);
    }
  }

  getFirstTrackProperty(propName, defaultValue) {
    return this.tracks[0] ? this.tracks[0][propName] : defaultValue;
  }

  get volume() {
    return getNodeParamNormalizedValue(this.masterBus.gain);
  }

  set volume(value) {
    setNodeParamNormalizedValue(this.masterBus.gain, value);
  }

  get duration() {
    return Math.max(...this.tracks.map(track => {
      var _track$buffer;

      return (_track$buffer = track.buffer) === null || _track$buffer === void 0 ? void 0 : _track$buffer.duration;
    }));
  }

  get currentTime() {
    return this.getFirstTrackProperty("currentTime", 0);
  }

  get isFinished() {
    return this.getFirstTrackProperty("isFinished", false);
  }

  get isLooped() {
    return this.getFirstTrackProperty("isLooped", false);
  }

  setCurrentPosition(value) {
    try {
      const _this = this;

      return Promise.resolve(_this.tracks.map(track => {
        track.setCurrentPosition(value);
        return track;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  fastForward(value = 15) {
    try {
      const _this2 = this;

      return Promise.resolve(_this2.tracks.map(track => {
        track.fastForward(value);
        return track;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  fastRewind(value = 15) {
    try {
      const _this3 = this;

      return Promise.resolve(_this3.fastForward(-value));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  play() {
    try {
      const _this4 = this;

      function _temp2() {
        playAll(_this4.tracks);
        return Promise.resolve(context.resume()).then(function () {
          return _this4;
        });
      }

      const {
        context
      } = _this4;

      const _temp = function () {
        if (isContextRunning(context) === false) {
          return Promise.resolve(resumeContext(context)).then(function () {});
        }
      }();

      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  pause() {
    try {
      const _this5 = this;

      pauseAll(_this5.tracks);
      return Promise.resolve(_this5.context.suspend()).then(function () {
        return _this5;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  rewind() {
    try {
      const _this6 = this;

      rewindAll(_this6.tracks);
      return Promise.resolve(_this6);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  stop() {
    try {
      const _this7 = this;

      pauseAll(_this7.tracks);
      stopAll(_this7.tracks);
      return Promise.resolve(_this7);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  setTrackVolume(trackId, volume) {
    try {
      const _this8 = this;

      return Promise.resolve(_this8.tracks.map(track => {
        if (track.id === trackId) {
          track.volume = volume;
        }

        return track;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  setTrackPan(trackId, pan) {
    try {
      const _this9 = this;

      return Promise.resolve(_this9.tracks.map(track => {
        if (track.id === trackId) {
          track.pan = pan;
        }

        return track;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  setTrackSendLevel(trackId, sendId, level) {
    try {
      const _this10 = this;

      return Promise.resolve(_this10.tracks.map(track => {
        if (track.id === trackId) {
          setNodeParamNormalizedValue(track.fx[sendId].gain, level);
        }

        return track;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  setTrackPanLevel(trackId, value) {
    try {
      const _this11 = this;

      return Promise.resolve(_this11.tracks.map(track => {
        if (track.id === trackId) {
          track.pan = value;
        }

        return track;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  soloTrack(trackId) {
    try {
      const _this12 = this;

      const newTracks = _this12.tracks.map(track => {
        if (track.id === trackId) {
          track.toggleSolo();

          if (track.muted) {
            track.unmute();
          }
        } else {
          if (!track.soloed) {
            track.unsolo();
          }
        }

        return track;
      });

      if (newTracks.every(track => !track.soloed)) {
        newTracks.forEach(track => track.resetSolo());
      }

      return Promise.resolve(newTracks);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  toggleTrack(trackId) {
    try {
      const _this13 = this;

      return Promise.resolve(_this13.tracks.map(track => {
        if (track.id === trackId) {
          track.toggleMute();
        }

        return track;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  toggleTrackFx(trackId) {
    try {
      const _this14 = this;

      return Promise.resolve(_this14.tracks.map(track => {
        if (track.id === trackId) {
          track.toggleFX();
        }

        return track;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  setSendParamValue(sendId, parameterId, value) {
    try {
      const _this15 = this;

      return Promise.resolve(_this15.fx.map(fx => {
        if (fx.id === sendId) {
          setNodeParams(fx, {
            [parameterId]: value
          });
        }

        return fx;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  loop(value) {
    try {
      const _this16 = this;

      return Promise.resolve(_this16.tracks.map(track => {
        track.looped = value;
        return track;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  loadCommonTrack(sources) {
    try {
      const _this17 = this;

      _this17.commonTracks = sources.map(({
        url,
        title
      }) => new Track({
        url,
        title,
        context: _this17.context,
        masterBus: _this17.masterBus,
        sends: _this17.fx,
        handleMixerUnsupportedError: _this17.handleMixerUnsupportedError
      }));
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  load(sources, callback) {
    try {
      const _this18 = this;

      _this18.commonTracks.forEach(track => track.toStartPosition());

      _this18.tracks = [...(_this18.commonTracks || []), ...sources.map(({
        url,
        title
      }) => new Track({
        url,
        title,
        context: _this18.context,
        masterBus: _this18.masterBus,
        sends: _this18.fx,
        handleMixerUnsupportedError: _this18.handleMixerUnsupportedError
      }))];
      const tracksLength = _this18.tracks.length;
      let trackCounter = 1;
      return Promise.all(_this18.tracks.map(track => track.loadingState.then(chunk => {
        const current = trackCounter++;
        callback({
          length: tracksLength,
          current: current,
          progress: Math.floor(current / tracksLength * 100),
          isLoading: true
        });
        return chunk;
      })));
    } catch (e) {
      return Promise.reject(e);
    }
  }

}

const effectsState = recoil.atom({
  key: 'effectsState',
  default: []
});
const tracksState = recoil.atom({
  key: 'tracksState',
  default: []
});
const isSoloSelector = recoil.selector({
  key: 'isSoloSelector',
  get: ({
    get
  }) => {
    const tracks = get(tracksState);
    return tracks.some(track => track.isSolo);
  }
});
const mxState = recoil.atom({
  key: 'mxState',
  default: {
    current: {
      isLooped: false,
      isFinished: false,
      currentTime: 0,
      rewind: () => {},
      play: () => {},
      pause: () => {},
      fastForward: value => value,
      fastRewind: value => value,
      setCurrentPosition: value => value,
      loop: value => value,
      volume: value => value
    }
  }
});
const loadingState = recoil.atom({
  key: 'loadingState',
  default: {}
});

const useMixer = (commonTracks, tracks, effects, hasMasterTrack, onLoading, setIsReady, handleMixerUnsupportedError) => {
  const mx = React.useRef();
  const setTracks = recoil.useSetRecoilState(tracksState);
  const setEffects = recoil.useSetRecoilState(effectsState);
  const setAnalyser = recoil.useSetRecoilState(analyserState);
  const setStatus = recoil.useSetRecoilState(statusState);
  const setCurrentPosition = recoil.useSetRecoilState(currentPositionState);
  const setDuration = recoil.useSetRecoilState(durationState);
  const setIsLooped = recoil.useSetRecoilState(isLoopedState);
  const setMasterVolume = recoil.useSetRecoilState(masterVolumeState);
  React.useEffect(() => {
    setIsReady(false);

    const onLoad = function () {
      try {
        const {
          tracks,
          effects,
          playback
        } = createState(mx.current, hasMasterTrack);
        mx.current.setCurrentPosition(0);
        return Promise.resolve(setTracks(tracks)).then(function () {
          return Promise.resolve(setEffects(effects)).then(function () {
            return Promise.resolve(setStatus('READY')).then(function () {
              return Promise.resolve(setAnalyser(playback.analyser)).then(function () {
                return Promise.resolve(setCurrentPosition(0)).then(function () {
                  return Promise.resolve(setDuration(playback.duration)).then(function () {
                    return Promise.resolve(setIsLooped(playback.isLooped)).then(function () {
                      return Promise.resolve(setMasterVolume(playback.masterVolume)).then(function () {
                        setIsReady(true);
                        onLoading({
                          length: tracks.length,
                          current: tracks.length,
                          isLoading: false
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };

    if (!mx.current) {
      mx.current = new Mixer(commonTracks, effects, handleMixerUnsupportedError);
    }

    mx.current.stop().then(() => mx.current.load(tracks, onLoading, handleMixerUnsupportedError)).then(onLoad);
  }, [tracks]);
  return mx;
};

const useProgress = mx => {
  const [status, setStatus] = recoil.useRecoilState(statusState);
  const setCurrentPosition = recoil.useSetRecoilState(currentPositionState);
  React.useEffect(() => {
    let interval;

    switch (status) {
      case exports.PLAYBACK_STATUS.PLAYING:
        interval = setInterval(() => {
          setCurrentPosition(mx.current.currentTime);

          if (mx.current.isLooped && mx.current.isFinished) {
            setCurrentPosition(0);
          } else if (mx.current.isFinished) {
            setStatus('PAUSED');
            setCurrentPosition(0);
          } else {
            setCurrentPosition(mx.current.currentTime);
          }
        }, 1000);
        return () => clearInterval(interval);

      default:
        return () => clearInterval(interval);
    }
  }, [status]);
};

const MxContext = /*#__PURE__*/React__default.createContext({
  mx: null,
  isReady: false,
  mixerChanges: null,
  onUserInput: event => {
  }
});
const MxContextProvider = ({
  mx,
  isReady,
  mixerChanges,
  onUserInput,
  children
}) => {
  return /*#__PURE__*/React__default.createElement(MxContext.Provider, {
    value: {
      mx,
      isReady,
      mixerChanges,
      onUserInput
    }
  }, children);
};

const useMxContext = () => {
  return React.useContext(MxContext);
};

const ProgressBar = () => {
  const {
    mx
  } = useMxContext();
  const setCurrentPosition = recoil.useSetRecoilState(currentPositionState);

  const onSetCurrentPosition = function (value) {
    try {
      function _temp2() {
        setCurrentPosition(value);
      }

      const _temp = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.setCurrentPosition(value)).then(function () {});
        }
      }();

      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const {
    currentPosition,
    duration
  } = recoil.useRecoilValue(progressBarSelector);
  const [progressPosition, setProgressPosition] = React.useState(0);
  React.useEffect(() => {
    setProgressPosition(persentPassed(currentPosition, duration));
  }, [currentPosition]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: style.progressContainer
  }, /*#__PURE__*/React__default.createElement(Fader, {
    className: style.progressBar,
    onChangeEnd: percent => {
      onSetCurrentPosition(secondsParsed(percent, duration));
    },
    onChange: percent => {
      setProgressPosition(percent);
    },
    isKnobThumb: true,
    value: progressPosition
  }), /*#__PURE__*/React__default.createElement("div", {
    className: style.progressTimeNow
  }, convertTime(currentPosition)), /*#__PURE__*/React__default.createElement("div", {
    className: style.progressTime
  }, convertTime(duration)));
};

var ProgressBar$1 = /*#__PURE__*/React__default.memo(ProgressBar);

const convertTime = (seconds = 0) => {
  const secondsResult = Math.floor(seconds % 60);
  const result = {
    minutes: Math.floor((seconds - secondsResult) / 60 % 60),
    seconds: secondsResult >= 10 ? secondsResult : `0${secondsResult}`
  };
  return `${result.minutes}:${result.seconds}`;
};

const persentPassed = (seconds, duration) => {
  const persent = 100 * seconds / duration;
  return persent >= 100 ? 100 : persent;
};

const secondsParsed = (percent, duration) => percent * duration / 100;

const PlayController = ({
  isDisabled,
  status,
  onPlay,
  onPause
}) => {
  const btnClassNames = isButtonPressed => classnames(style.control, style.button, isButtonPressed && style.isButtonPressed);

  const {
    mx
  } = useMxContext();
  const setCurrentPosition = recoil.useSetRecoilState(currentPositionState);
  const {
    currentPosition,
    duration
  } = recoil.useRecoilValue(progressBarSelector);

  const onFastForward = function (value) {
    try {
      const _temp2 = function () {
        if (mx.current) {
          const _temp = function () {
            if (currentPosition + value < duration) {
              setCurrentPosition(state => state + value);
              return Promise.resolve(mx.current.fastForward(value)).then(function () {});
            } else {
              setCurrentPosition(duration);
              return Promise.resolve(mx.current.fastForward(duration - currentPosition)).then(function () {});
            }
          }();

          if (_temp && _temp.then) return _temp.then(function () {});
        }
      }();

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const onFastRewind = function (value) {
    try {
      const _temp4 = function () {
        if (mx.current) {
          const _temp3 = function () {
            if (currentPosition - value > 0) {
              setCurrentPosition(state => state - value);
              return Promise.resolve(mx.current.fastRewind(value)).then(function () {});
            } else {
              setCurrentPosition(0);
              return Promise.resolve(mx.current.fastRewind(currentPosition)).then(function () {});
            }
          }();

          if (_temp3 && _temp3.then) return _temp3.then(function () {});
        }
      }();

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: style.controlsLeft
  }, /*#__PURE__*/React__default.createElement("button", {
    className: style.controlButton,
    disabled: isDisabled,
    onClick: () => onFastRewind(15)
  }, /*#__PURE__*/React__default.createElement("span", null, "15"), /*#__PURE__*/React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 28',
    width: '24px'
  }, /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M12.4 4V.5a.4.4 0 00-.8-.3L7.5 4.3a1 1 0 000 1.4l4.1 4.2c.3.3.8 0 .8-.3V6a9.8 9.8 0 11-10 9.8H.6A11.7 11.7 0 1012.4 4z'
  }))), !isPlaying(status) ? /*#__PURE__*/React__default.createElement("button", {
    className: btnClassNames(isPlaying(status)),
    onClick: onPlay,
    disabled: isDisabled
  }, /*#__PURE__*/React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '32px',
    viewBox: '0 0 32 36'
  }, /*#__PURE__*/React__default.createElement("defs", null), /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M31.5 18L.5 36V0z'
  }))) : /*#__PURE__*/React__default.createElement("button", {
    className: btnClassNames(isPaused(status)),
    onClick: onPause,
    disabled: isDisabled
  }, /*#__PURE__*/React__default.createElement("svg", {
    width: '32px',
    height: '36px',
    viewBox: '0 0 100 100',
    xmlns: 'http://www.w3.org/2000/svg'
  }, /*#__PURE__*/React__default.createElement("path", {
    id: 'svg_1',
    d: 'm29.05829,98.186882l-18.799027,0c-4.588525,0 -8.308265,-3.719734 -8.308265,-8.308266l0,-79.706622c0,-4.588521 3.71974,-8.308262 8.308265,-8.308262l18.799027,0c4.588522,0 8.308264,3.71974 8.308264,8.308262l0,79.706622c0,4.588531 -3.719742,8.308266 -8.308264,8.308266z'
  }), /*#__PURE__*/React__default.createElement("path", {
    id: 'svg_2',
    d: 'm88.74073,98.108856l-18.799034,0c-4.588516,0 -8.308258,-3.719734 -8.308258,-8.308266l0,-79.706615c0,-4.588525 3.719742,-8.308266 8.308258,-8.308266l18.799034,0c4.588531,0 8.308273,3.719741 8.308273,8.308266l0,79.706615c0,4.588531 -3.719742,8.308266 -8.308273,8.308266z'
  }), /*#__PURE__*/React__default.createElement("path", {
    id: 'svg_3',
    d: 'm30.498528,2.009229c1.62159,1.516152 2.650631,3.65859 2.650631,6.054068l0,79.706615c0,4.588539 -3.71974,8.308273 -8.30826,8.308273l-18.799028,0c-0.493438,0 -0.970003,-0.063263 -1.440241,-0.1455c1.484523,1.387512 3.464588,2.254196 5.657634,2.254196l18.799027,0c4.588522,0 8.308264,-3.719734 8.308264,-8.308266l0,-79.706622c0,-4.095088 -2.96904,-7.477437 -6.868027,-8.162765z'
  }), /*#__PURE__*/React__default.createElement("path", {
    id: 'svg_4',
    d: 'm90.180962,1.93121c1.621582,1.516153 2.65065,3.658586 2.65065,6.054068l0,79.706608c0,4.588539 -3.719742,8.308273 -8.308273,8.308273l-18.799026,0c-0.493439,0 -0.970009,-0.063263 -1.440239,-0.1455c1.484512,1.387535 3.464584,2.254196 5.657623,2.254196l18.799034,0c4.588531,0 8.308273,-3.719734 8.308273,-8.308266l0,-79.706615c0,-4.095092 -2.969055,-7.479549 -6.868042,-8.162765z'
  }), /*#__PURE__*/React__default.createElement("path", {
    id: 'svg_5',
    fill: 'none',
    stroke: '#000000',
    strokeMiterlimit: '10',
    d: 'm29.05829,98.186882l-18.799027,0c-4.588525,0 -8.308265,-3.719734 -8.308265,-8.308266l0,-79.706622c0,-4.588521 3.71974,-8.308262 8.308265,-8.308262l18.799027,0c4.588522,0 8.308264,3.71974 8.308264,8.308262l0,79.706622c0,4.588531 -3.719742,8.308266 -8.308264,8.308266z'
  }), /*#__PURE__*/React__default.createElement("path", {
    id: 'svg_6',
    fill: 'none',
    stroke: '#000000',
    strokeMiterlimit: '10',
    d: 'm88.74073,98.108856l-18.799034,0c-4.588516,0 -8.308258,-3.719734 -8.308258,-8.308266l0,-79.706615c0,-4.588525 3.719742,-8.308266 8.308258,-8.308266l18.799034,0c4.588531,0 8.308273,3.719741 8.308273,8.308266l0,79.706615c0,4.588531 -3.719742,8.308266 -8.308273,8.308266z'
  }))), /*#__PURE__*/React__default.createElement("button", {
    className: style.controlButton,
    disabled: isDisabled,
    onClick: () => onFastForward(15)
  }, /*#__PURE__*/React__default.createElement("span", null, "15"), /*#__PURE__*/React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '24px',
    viewBox: '0 0 24 28'
  }, /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M11.9 4V.5c0-.4.4-.5.7-.3l4.2 4.2a1 1 0 010 1.4L12.6 10a.4.4 0 01-.7-.3V6a9.8 9.8 0 109.9 9.8h1.9A11.7 11.7 0 1111.9 4z'
  }))));
};

const VolumeController = ({
  onMasterVolumeChange
}) => {
  const masterVolume = recoil.useRecoilValue(masterVolumeState);
  const volumeIcon = React.useMemo(() => {
    if (masterVolume === 0) {
      return /*#__PURE__*/React__default.createElement("svg", {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '30',
        height: '24',
        viewBox: '0 0 30 24'
      }, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
        fill: '#fff',
        d: 'M16.044 2.959v17.166L6.63 16.342H2V6.743h4.63zM0 4.743v13.599h6.243l11.801 4.742V0L6.243 4.743z'
      })), /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
        fill: '#fff',
        d: 'M26.291 11.542l2.674-2.674a1 1 0 0 0-1.414-1.414l-2.674 2.674-2.674-2.674a1 1 0 0 0-1.414 1.414l2.674 2.674-2.674 2.674a.999.999 0 1 0 1.414 1.414l2.674-2.674 2.674 2.674a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414z'
      })))));
    } else if (masterVolume > 0 && masterVolume <= 25) {
      return /*#__PURE__*/React__default.createElement("svg", {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '25',
        height: '24',
        viewBox: '0 0 25 24'
      }, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
        fill: '#fff',
        d: 'M16.045 2.959v17.166L6.63 16.342H2V6.743h4.63zM0 4.743v13.599h6.243l11.802 4.742V0L6.243 4.743z'
      })), /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
        fill: '#fff',
        d: 'M22.166 6.628a1 1 0 0 0-1.414 1.414 4.918 4.918 0 0 1 1.451 3.5 4.92 4.92 0 0 1-1.451 3.501.999.999 0 1 0 1.414 1.414 6.903 6.903 0 0 0 2.037-4.915c0-1.855-.724-3.6-2.037-4.914z'
      })))));
    } else if (masterVolume > 25 && masterVolume <= 75) {
      return /*#__PURE__*/React__default.createElement("svg", {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '26',
        height: '24',
        viewBox: '0 0 26 24'
      }, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
        fill: '#fff',
        d: 'M16.043 2.959v17.166l-9.414-3.783H2V6.743h4.629zM0 4.743v13.599h6.243l11.8 4.742V0l-11.8 4.743z'
      })), /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
        fill: '#fff',
        d: 'M22.166 4.319a1 1 0 1 0-1.415 1.414c3.204 3.204 3.204 8.416 0 11.62a1 1 0 0 0 1.415 1.413c3.982-3.983 3.982-10.464 0-14.447z'
      })))));
    } else {
      return /*#__PURE__*/React__default.createElement("svg", {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '30px',
        viewBox: '0 0 30 25'
      }, /*#__PURE__*/React__default.createElement("defs", null), /*#__PURE__*/React__default.createElement("path", {
        fill: '#fff',
        d: 'M16 3.7v17.1l-9.4-3.7H2V7.5h4.6zM0 5.5V19h6.2L18 23.8V.8L6.2 5.4zM22.2 5a1 1 0 10-1.4 1.4 8.2 8.2 0 012.4 5.9 8.2 8.2 0 01-2.4 5.8 1 1 0 101.4 1.4 10.1 10.1 0 003-7.2c0-2.8-1.1-5.3-3-7.3z'
      }), /*#__PURE__*/React__default.createElement("path", {
        fill: '#fff',
        d: 'M24.9.3a1 1 0 00-1.4 1.4 15 15 0 010 21.1 1 1 0 101.4 1.4 17 17 0 000-24z'
      }));
    }
  }, [masterVolume]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: style.masterVolumeContainer
  }, /*#__PURE__*/React__default.createElement("div", {
    className: style.masterVolume
  }, volumeIcon), /*#__PURE__*/React__default.createElement(Fader, {
    onChange: onMasterVolumeChange,
    isKnobThumb: true,
    value: masterVolume
  }));
};

const COLOR_GREEN = '#05860f';
const COLOR_YELLOW = '#f9ef5c';
const COLOR_RED = '#861615';
const createMeterGradient = (context, {
  width,
  height
}) => {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0.0, COLOR_GREEN);
  gradient.addColorStop(0.8, COLOR_YELLOW);
  gradient.addColorStop(0.9, COLOR_RED);
  return gradient;
};
const getAverage = ramda.converge(ramda.divide, [ramda.sum, ramda.length]);

var style$2 = {"meter":"_6u3vm","meterValue":"_1VI_U","masterTrackIcon":"_2QV_w"};

var style$3 = {"track":"_2iklQ","trackControls":"_2dJCU","button":"_3U0Kd","buttonSeparator":"_2PUvZ","isHidden":"_2cHyh","isPressed":"_3mOYy","soloButton":"_35-s3","mute":"_3mVyk","reset":"_3vx72","bypass":"_1kXhU","sends":"__RuPX","send":"_2WB_F","sendTitle":"_3M106","title":"_1mGJd","titleText":"_3wxwh","meterValue":"_2QBsx"};

const MasterTrack = ({
  analyser = null,
  width = 6,
  height = 176,
  volume = 70,
  onVolumeChange
}) => {
  if (!analyser) {
    return null;
  }

  const average = React.useRef(0);
  const status = recoil.useRecoilValue(statusState);
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    let frame;
    const context = canvasRef.current && canvasRef.current.getContext('2d');
    const array = new Uint8Array(analyser.frequencyBinCount);

    const drawMeter = () => {
      analyser.getByteFrequencyData(array);
      average.current = getAverage(array);

      if (context) {
        context.clearRect(0, 0, width, height);
        context.fillStyle = createMeterGradient(context, {
          width,
          height
        });
        const maxValueToCurrentVolume = height * (volume / 100);
        const progress = height / 100 * average.current;
        context.fillRect(0, 0, width, Math.min(progress, maxValueToCurrentVolume));
      }

      frame = requestAnimationFrame(drawMeter);
    };

    const toZero = () => {
      if (average.current > 0) {
        average.current -= 2;
        context.clearRect(0, 0, width, height);
        context.fillStyle = createMeterGradient(context, {
          width,
          height
        });
        context.fillRect(0, 0, width, height / 100 * average.current);
        frame = requestAnimationFrame(toZero);
      } else {
        cancelAnimationFrame(frame);
      }
    };

    if (status === 'PLAYING') {
      frame = requestAnimationFrame(drawMeter);
    } else {
      toZero();
    }

    return () => cancelAnimationFrame(frame);
  }, [status, volume]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: `${style$2.meter} ${style$3.track}`
  }, /*#__PURE__*/React__default.createElement("div", {
    className: style$2.masterTrackIcon
  }, /*#__PURE__*/React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '30',
    height: '25',
    viewBox: '0 0 30 25'
  }, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M.018 25V7.644h5.729V25z'
  })), /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M8.096 25v-9.704h5.729V25z'
  })), /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M16.176 25V.913h5.729V25z'
  })), /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M24.254 25V11.368h5.729V25z'
  })))))), /*#__PURE__*/React__default.createElement("canvas", {
    className: style$2.meterValue,
    width: width,
    height: height,
    ref: canvasRef
  }), /*#__PURE__*/React__default.createElement(Fader, {
    onChange: onVolumeChange,
    isVertical: true,
    value: volume
  }), /*#__PURE__*/React__default.createElement("div", {
    className: style$3.title
  }, "Master"));
};

const Context = /*#__PURE__*/React.createContext(null);

class FX {
  constructor({
    id,
    context,
    masterBus
  }) {
    this.id = id;
    this.isLooped = false;
    this.chain = [];
    this.context = context;
    this.signalIn = createGainNode(context);
    this.signalOut = createGainNode(context);
    connectNodes(this.signalOut, masterBus);
  }

  get isChainEmpty() {
    return this.chain.length === 0;
  }

  get gain() {
    return this.signalIn.gain.value;
  }

  set gain(value) {
    this.signalIn.gain.value = value;
  }

  addNode(node, parameters = {}) {
    setNodeParams(node, parameters);
    this.isChainEmpty ? connectNodes(this.signalIn, node) : connectNodesSingle(ramda.last(this.chain), node);
    connectNodes(node, this.signalOut);
    this.chain.push(node);
  }

  tweakNode(nodeIndex, parameter, value) {
    const node = this.chain[nodeIndex];

    if (!node) {
      return false;
    }

    return setNodeParams(node, {
      [parameter]: value
    });
  }

  set loop(value) {
    const lastNode = ramda.last(this.chain);
    const firstNode = ramda.head(this.chain);
    connectNodes(lastNode, firstNode);
    this.isLooped = value;
  }

  get loop() {
    return this.isLooped;
  }

}

const DEFAULT_FEEDBACK = 80;
const DEFAULT_TIME = 25;
const DEFAULT_FREQUENCY = 5;
class Delay extends FX {
  constructor(context, masterBus) {
    super({
      context,
      masterBus,
      id: 'delay'
    });
    this.addNode(context.createDelay(), {
      delayTime: DEFAULT_TIME
    });
    this.addNode(context.createGain(), {
      gain: DEFAULT_FEEDBACK
    });
    this.addNode(context.createBiquadFilter(), {
      frequency: DEFAULT_FREQUENCY
    });
    this.loop = true;
  }

  set time(value) {
    this.tweakNode(0, 'delayTime', value);
  }

  get time() {
    return getNodeParamNormalizedValue(this.chain[0].delayTime);
  }

  set feedback(value) {
    this.tweakNode(1, 'gain', value);
  }

  get feedback() {
    return getNodeParamNormalizedValue(this.chain[1].gain);
  }

  set frequency(value) {
    this.tweakNode(2, 'frequency', value);
  }

  get frequency() {
    return getNodeParamNormalizedValue(this.chain[2].frequency);
  }

}

const STRENGTH_MIN = 0;
const STRENGTH_MAX = 1000;
const DEFAULT_STRENGTH = 200;
const DEFAULT_FILTER_FREQUENCY = 138;
const DEFAULT_FILTER_TYPE = 'highpass';
const DEFAULT_FILTER_Q = 1;

const strengthToNode = value => ({
  maxValue: STRENGTH_MAX,
  minValue: STRENGTH_MIN,
  value
});

class Distortion extends FX {
  constructor(context, masterBus) {
    super({
      context,
      masterBus,
      id: 'distortion'
    });
    this._strength = DEFAULT_STRENGTH;
    this.addNode(context.createBiquadFilter(), {
      type: DEFAULT_FILTER_TYPE,
      frequency: DEFAULT_FILTER_FREQUENCY,
      Q: DEFAULT_FILTER_Q
    });
    this.addNode(context.createWaveShaper(), {
      curve: this.getCurve(this._strength),
      oversample: '4x'
    });
  }

  get strength() {
    return getNodeParamNormalizedValue(strengthToNode(this._strength));
  }

  set strength(value) {
    this._strength = value;
    this.tweakNode(1, 'curve', this.getCurve(value));
  }

  set filterType(value) {
    this.tweakNode(0, 'type', value);
  }

  get filterType() {
    return this.chain[0].type;
  }

  set frequency(value) {
    this.tweakNode(0, 'frequency', value);
  }

  get frequency() {
    return getNodeParamNormalizedValue(this.chain[0].frequency);
  }

  getCurve(strength) {
    var k = typeof strength === 'number' ? strength : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;

    for (; i < n_samples; ++i) {
      x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }

    return curve;
  }

}

const RESPONSES = {
  'Versatile': 'assets/impulse-1.mp3',
  'Pattan': 'assets/impulse-2.mp3',
  'Style': 'assets/impulse-3.mp3'
};
class Reverb extends FX {
  constructor(context, masterBus, options = {
    responses: RESPONSES
  }) {
    super({
      context,
      masterBus,
      id: 'reverb'
    });
    this.responses = options.responses;
    this.currentResponseId = ramda.head(ramda.keys(options.responses));
    this.addNode(context.createConvolver());
    this.loadResponse();
  }

  get currentResponse() {
    return this.currentResponseId;
  }

  set currentResponse(responseId) {
    const responseUrl = this.responses[responseId];

    if (responseUrl) {
      this.currentResponseId = responseId;
      this.loadResponse();
    }
  }

  loadResponse() {
    try {
      const _this = this;

      const url = _this.responses[_this.currentResponseId];
      return Promise.resolve(fetchAudioAsArrayBuffer(url).catch(error => console.warn('[ERROR LOADING RESPONSE]', error))).then(function (arrayBuffer) {
        const _temp = function () {
          if (arrayBuffer.byteLength > 0) {
            const decodedDataPromise = new Promise((resolve, reject) => _this.context.decodeAudioData(arrayBuffer, resolve, reject));
            const _tweakNode = _this.tweakNode;
            return Promise.resolve(decodedDataPromise).then(function (_decodedDataPromise) {
              _tweakNode.call(_this, 0, 'buffer', _decodedDataPromise);
            });
          } else {
            console.warn('[ERROR LOADING RESPONSE] arrayBuffer is empty');
          }
        }();

        if (_temp && _temp.then) return _temp.then(function () {});
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

}

(function (UserInputEvents) {
  UserInputEvents["masterVolumeChange"] = "masterVolumeChange";
  UserInputEvents["trackVolumeChange"] = "trackVolumeChange";
  UserInputEvents["panChange"] = "panChange";
  UserInputEvents["playingStateChange"] = "playingStateChange";
  UserInputEvents["onRepeat"] = "onRepeat";
})(exports.UserInputEvents || (exports.UserInputEvents = {}));

const Mixer$1 = ({
  commonTracks,
  tracks = [],
  effects = [Delay, Reverb, Distortion],
  hasMasterTrack = true,
  onLoading = () => {},
  children,
  stopAudio,
  setMixerIsPlaying,
  songKey,
  mixerChanges,
  handleMixerUnsupportedError,
  onUserInput,
  addMixerCountPlay = () => {},
  isRouteChanged
}) => {
  const [isReady, setIsReady] = React.useState(false);
  const mx = useMixer(commonTracks, tracks, effects, hasMasterTrack, onLoading, setIsReady, handleMixerUnsupportedError);
  const [isFirstPlay, setIsFirstPlay] = React.useState(true);
  const [alreadyPlayedKeys, setAlreadyPlayedKeys] = React.useState([]);
  useProgress(mx);
  const status = recoil.useRecoilValue(statusState);

  const onPause = function () {
    try {
      const _temp = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.pause()).then(function () {});
        }
      }();

      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  React.useEffect(() => {
    isRouteChanged && onPause();
  }, [isRouteChanged]);
  React.useEffect(() => {
    setIsFirstPlay(true);
  }, [tracks]);
  React.useEffect(() => {
    if (status === 'PLAYING') {
      if (isFirstPlay && !alreadyPlayedKeys.includes(songKey)) {
        setIsFirstPlay(false);
        setAlreadyPlayedKeys(state => [...state, songKey]);
        addMixerCountPlay();
      }

      setMixerIsPlaying(true);
    } else if (status === 'PAUSED') {
      setMixerIsPlaying(false);
    }
  }, [status]);
  return /*#__PURE__*/React__default.createElement(MxContextProvider, {
    mx: mx,
    isReady: isReady,
    mixerChanges: mixerChanges,
    onUserInput: onUserInput
  }, /*#__PURE__*/React__default.createElement(DeskContainer, {
    stopAudio: stopAudio
  }, children && children));
};

const Mixdesk = props => /*#__PURE__*/React__default.createElement(recoil.RecoilRoot, null, /*#__PURE__*/React__default.createElement(Mixer$1, Object.assign({}, props)));

const DeskContainer = ({
  stopAudio,
  children
}) => {
  const {
    mx,
    isReady,
    mixerChanges,
    onUserInput
  } = useMxContext();
  const setStatus = recoil.useSetRecoilState(statusState);
  const setIsLooped = recoil.useSetRecoilState(isLoopedState);
  const setMasterVolume = recoil.useSetRecoilState(masterVolumeState);

  const onPlay = function () {
    try {
      function _temp2() {
        setStatus('PLAYING');
      }

      const _temp = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.play()).then(function () {});
        }
      }();

      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const onPause = function () {
    try {
      function _temp4() {
        setStatus('PAUSED');
      }

      const _temp3 = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.pause()).then(function () {});
        }
      }();

      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const onLoop = function (value) {
    try {
      function _temp6() {
        setIsLooped(value);
        onUserInput({
          type: exports.UserInputEvents.onRepeat,
          value: value
        });
      }

      const _temp5 = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.loop(value)).then(function () {});
        }
      }();

      return Promise.resolve(_temp5 && _temp5.then ? _temp5.then(_temp6) : _temp6(_temp5));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const onSetMasterVolume = function (value) {
    try {
      if (mx.current) {
        mx.current.volume = value;
      }

      setMasterVolume(value);
      onUserInput({
        type: exports.UserInputEvents.masterVolumeChange,
        value: value
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  React.useEffect(() => {
    if (mixerChanges.masterVolume && isReady) {
      onSetMasterVolume(mixerChanges.masterVolume);
    }
  }, [isReady]);
  React.useEffect(() => {
    if (mixerChanges.repeat && isReady) {
      onLoop(mixerChanges.repeat);
    }
  }, [isReady]);
  React.useEffect(() => {
    if (stopAudio) {
      onPause();
    }
  }, [stopAudio]);
  return /*#__PURE__*/React__default.createElement(Desk, {
    onPlay: onPlay,
    onPause: onPause,
    onLoop: onLoop,
    onMasterVolumeChange: onSetMasterVolume
  }, children);
};

var style$4 = {"radio":"_3DvEK","label":"_2mZqh","control":"_1W6Nw","title":"_2UB_d","isSelected":"_3k2x_"};

const Radio = ({
  name,
  value: currentValue,
  values = [],
  onChange = () => {}
}) => /*#__PURE__*/React__default.createElement("div", {
  className: style$4.radio
}, values && values.map(value => /*#__PURE__*/React__default.createElement("div", {
  key: value,
  className: style$4.label,
  onClick: () => onChange(value)
}, /*#__PURE__*/React__default.createElement("div", {
  className: classnames(style$4.control, value === currentValue && style$4.isSelected)
}), /*#__PURE__*/React__default.createElement("div", {
  className: style$4.title
}, value))));

var style$5 = {"parameter":"_ykfH9","controlContainer":"_3YzIf","title":"_36aDZ"};

const EffectParameterMap = {
  fader: Fader,
  radio: Radio
};

const getControlByType = type => EffectParameterMap[type];

const EffectParameter = ({
  onChange,
  ...props
}) => {
  const {
    id,
    name,
    type = 'fader'
  } = props;
  const Control = getControlByType(type);
  return Control ? /*#__PURE__*/React__default.createElement("div", {
    className: style$5.parameter,
    key: id
  }, /*#__PURE__*/React__default.createElement("span", {
    className: style$5.title
  }, name, ":"), /*#__PURE__*/React__default.createElement("div", {
    className: style$5.controlContainer
  }, /*#__PURE__*/React__default.createElement(Control, Object.assign({}, props, {
    onChange: onChange(id)
  })))) : null;
};

var style$6 = {"effect":"_2qSP4","title":"_Ls5Oz"};

const Effect = ({
  name = 'Untitled',
  parameters,
  onParamChange = () => {}
}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: style$6.effect
  }, /*#__PURE__*/React__default.createElement("div", {
    className: style$6.title
  }, name), parameters && parameters.map(parameter => /*#__PURE__*/React__default.createElement("div", {
    className: style$6.parameterValue,
    key: parameter.id
  }, /*#__PURE__*/React__default.createElement(EffectParameter, Object.assign({}, parameter, {
    onChange: onParamChange
  })))));
};

const EffectContainer = props => {
  const {
    mx
  } = useMxContext();
  const setEffects = recoil.useSetRecoilState(effectsState);

  const setSendParamValue = function (parameterId, value) {
    try {
      function _temp2() {
        setEffects(effects => effects.map(effect => {
          if (props.id === effect.id) {
            return { ...effect,
              parameters: effect.parameters.map(parameter => {
                if (parameter.id === parameterId) {
                  return { ...parameter,
                    value
                  };
                }

                return parameter;
              })
            };
          }

          return effect;
        }));
      }

      const _temp = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.setSendParamValue(props.id, parameterId, value)).then(function () {});
        }
      }();

      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React__default.createElement(Effect, Object.assign({}, props, {
    onParamChange: setSendParamValue
  }));
};

var style$7 = {"knob":"_2IpcY","outer":"_2GJ4A","inner":"_1CWIm","grip":"_2uy_8"};

const Knob = ({
  max,
  min,
  value,
  onChange
}) => {
  const minDeg = 45;
  const maxDeg = 270;
  const radius = 200;
  const notMoveArea = 15;
  const deg = React.useMemo(() => maxDeg / max * value + minDeg, [value]);

  const onDoubleClick = () => {
    onChange(50);
  };

  const startDrag = event => {
    event.preventDefault();
    event.stopPropagation();
    const knob = event.target.getBoundingClientRect();
    const startCoordinate = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };

    const moveHandler = e => {
      generateDeg(e.clientX, e.clientY, startCoordinate);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveHandler);
    });
  };

  const generateDeg = (x, y, startXY) => {
    const distanceToStart = ((x - startXY.x) ** 2 + (y - startXY.y) ** 2) ** 0.5;
    const currentPositionToStart = {
      x: x - startXY.x,
      y: y - startXY.y
    };

    if (distanceToStart > notMoveArea) {
      const step = max / radius;

      if (currentPositionToStart.x > currentPositionToStart.y) {
        const newValue = value + (distanceToStart - notMoveArea) * step;
        onChange(newValue <= max ? newValue : max);
      } else {
        const newValue = value - (distanceToStart - notMoveArea) * step;
        onChange(newValue >= min ? newValue : min);
      }
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: style$7.knob,
    onDoubleClick: onDoubleClick
  }, /*#__PURE__*/React__default.createElement("div", {
    className: `${style$7.knob} ${style$7.outer}`,
    onMouseDown: startDrag
  }, /*#__PURE__*/React__default.createElement("div", {
    className: `${style$7.knob} ${style$7.inner}`,
    style: {
      transform: 'rotate(' + deg + 'deg)'
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: style$7.grip
  }))));
};

const DEFAULT_VOLUME = 70;

const Track$1 = props => {
  const [soloMutePriority, setSoloMutePriority] = React.useState('');

  const setSoloMutePriorityHelper = value => {
    if (soloMutePriority.includes(value)) {
      setSoloMutePriority(soloMutePriority.replace(value, ''));
    } else if (soloMutePriority.length < 2) {
      setSoloMutePriority(soloMutePriority + value);
    } else {
      setSoloMutePriority(value);
    }
  };

  const status = recoil.useRecoilValue(statusState);
  const analyserDiv = React.useRef();
  const height = 176;
  const array = new Uint8Array(props.analyser.frequencyBinCount);
  props.analyser.getByteFrequencyData(array);
  const average = React.useRef(0);
  let frame;

  const drawMeter = () => {
    props.analyser.getByteFrequencyData(array);
    average.current = getAverage(array);

    if (analyserDiv.current && analyserDiv.current.style) {
      const maxValueToCurrentVolume = height * (props.volume / 100);
      const progress = height / 100 * average.current;
      analyserDiv.current.style.height = `${Math.min(progress, maxValueToCurrentVolume)}px`;
    }

    frame = requestAnimationFrame(drawMeter);
  };

  const toZero = () => {
    if (analyserDiv.current && analyserDiv.current.style) {
      if (average.current > 0) {
        average.current -= 2;
        analyserDiv.current.style.height = `${height / 100 * average.current}px`;
        frame = requestAnimationFrame(toZero);
      } else {
        analyserDiv.current.style.height = `${height / 100 * 0}px`;
        cancelAnimationFrame(frame);
      }
    }
  };

  React.useEffect(() => {
    if (status === 'PLAYING') {
      frame = requestAnimationFrame(drawMeter);
    } else {
      toZero();
    }

    return () => cancelAnimationFrame(frame);
  }, [status, props.volume]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: style$3.track
  }, (!props.hasSolo || props.isSolo) && /*#__PURE__*/React__default.createElement("div", {
    className: style$3.meterValue,
    ref: analyserDiv
  }), ramda.keys(props.fx).length > 0 && /*#__PURE__*/React__default.createElement("button", {
    className: classnames(style$3.button, props.isEffectsDisabled && style$3.isPressed),
    onClick: () => props.onBypass(props.id)
  }, "Bypass FX"), /*#__PURE__*/React__default.createElement("div", {
    className: style$3.trackControls
  }, /*#__PURE__*/React__default.createElement("button", {
    className: classnames(style$3.button, style$3.soloButton, props.isSolo && style$3.isPressed),
    onClick: () => {
      setSoloMutePriorityHelper('s');

      if (soloMutePriority === 'm') {
        props.onMute(props.id);
        props.onSolo(props.id);
      } else if (soloMutePriority === 'ms') {
        props.onSolo(props.id);
        props.onMute(props.id);
      } else if (soloMutePriority === 'sm') {
        props.onSolo(props.id);
      } else {
        props.onSolo(props.id);
      }
    }
  }, "S"), /*#__PURE__*/React__default.createElement("div", {
    className: classnames(style$3.buttonSeparator, props.isMuted || props.isSolo ? style$3.isHidden : '')
  }), !props.hasSolo && /*#__PURE__*/React__default.createElement("button", {
    className: classnames(style$3.button, props.isMuted && style$3.isPressed),
    onClick: () => {
      setSoloMutePriorityHelper('m');
      props.onMute(props.id);
    }
  }, "M")), /*#__PURE__*/React__default.createElement(Knob, {
    min: 0,
    max: 100,
    value: props.pan,
    onChange: value => props.onPanChange(props.id, value)
  }), ramda.keys(props.fx).length > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: style$3.sends
  }, ramda.keys(props.fx).map(sendId => /*#__PURE__*/React__default.createElement("div", {
    className: style$3.send,
    key: sendId
  }, /*#__PURE__*/React__default.createElement("span", {
    className: style$3.sendTitle
  }, sendId), /*#__PURE__*/React__default.createElement(Fader, {
    onChange: value => props.onSendLevelChange(props.id, sendId, value),
    value: props.fx[sendId]
  })))), /*#__PURE__*/React__default.createElement(Fader, {
    onChange: value => props.onVolumeChange(props.id, value),
    value: props.volume,
    onDoubleClick: () => props.onVolumeChange(props.id, DEFAULT_VOLUME),
    isVertical: true
  }), /*#__PURE__*/React__default.createElement("div", {
    className: style$3.title
  }, /*#__PURE__*/React__default.createElement("span", {
    className: style$3.titleText
  }, props.title)));
};

Track$1.defaultProps = {
  title: 'Untitled',
  volume: DEFAULT_VOLUME,
  isMuted: false,
  isSolo: false,
  isEffectsDisabled: false,
  fx: null,
  onMute: () => null,
  onSolo: () => null,
  onBypass: () => null,
  onVolumeChange: () => null,
  onSendLevelChange: () => null,
  hasSolo: false
};

const Tracks = () => {
  const [tracks, setTracks] = recoil.useRecoilState(tracksState);
  const hasSolo = recoil.useRecoilValue(isSoloSelector);
  const {
    mx,
    isReady,
    mixerChanges,
    onUserInput
  } = useMxContext();

  const toggleTrackSolo = function (trackId) {
    try {
      function _temp2() {
        setTracks(tracks => tracks.map(track => {
          if (track.id === trackId) {
            onUserInput({
              type: exports.UserInputEvents.playingStateChange,
              value: !track.isSolo ? "solo" : null,
              trackId: track.id
            });
            return { ...track,
              isSolo: !track.isSolo
            };
          }

          return track;
        }));
      }

      const _temp = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.soloTrack(trackId)).then(function () {});
        }
      }();

      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const toggleTrack = function (trackId) {
    try {
      function _temp4() {
        setTracks(tracks => tracks.map(track => {
          if (track.id === trackId) {
            onUserInput({
              type: exports.UserInputEvents.playingStateChange,
              value: !track.isMuted ? "mute" : null,
              trackId: track.id
            });
            return { ...track,
              isMuted: !track.isMuted
            };
          }

          return track;
        }));
      }

      const _temp3 = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.toggleTrack(trackId)).then(function () {});
        }
      }();

      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const toggleTrackFx = function (trackId) {
    try {
      function _temp6() {
        setTracks(tracks => tracks.map(track => {
          if (track.id === trackId) {
            return { ...track,
              isEffectsDisabled: !track.isEffectsDisabled
            };
          }

          return track;
        }));
      }

      const _temp5 = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.toggleTrackFx(trackId)).then(function () {});
        }
      }();

      return Promise.resolve(_temp5 && _temp5.then ? _temp5.then(_temp6) : _temp6(_temp5));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const setTrackVolume = function (trackId, value) {
    try {
      function _temp8() {
        setTracks(tracks => tracks.map(track => {
          if (track.id === trackId) {
            onUserInput({
              type: exports.UserInputEvents.trackVolumeChange,
              value: value,
              trackId: track.id
            });
            return { ...track,
              volume: value
            };
          }

          return track;
        }));
      }

      const _temp7 = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.setTrackVolume(trackId, value)).then(function () {});
        }
      }();

      return Promise.resolve(_temp7 && _temp7.then ? _temp7.then(_temp8) : _temp8(_temp7));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const setTrackSendLevel = function (trackId, fxId, value) {
    try {
      function _temp10() {
        setTracks(tracks => tracks.map(track => {
          if (track.id === trackId) {
            return { ...track,
              send: { ...track.send,
                [fxId]: value
              }
            };
          }

          return track;
        }));
      }

      const _temp9 = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.setTrackSendLevel(trackId, fxId, value)).then(function () {});
        }
      }();

      return Promise.resolve(_temp9 && _temp9.then ? _temp9.then(_temp10) : _temp10(_temp9));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const setTrackPan = function (trackId, value) {
    try {
      function _temp12() {
        setTracks(tracks => tracks.map(track => {
          if (track.id === trackId) {
            onUserInput({
              type: exports.UserInputEvents.panChange,
              value: value,
              trackId: track.id
            });
            return { ...track,
              pan: value
            };
          }

          return track;
        }));
      }

      const _temp11 = function () {
        if (mx.current) {
          return Promise.resolve(mx.current.setTrackPan(trackId, value)).then(function () {});
        }
      }();

      return Promise.resolve(_temp11 && _temp11.then ? _temp11.then(_temp12) : _temp12(_temp11));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  React.useEffect(() => {
    if (mixerChanges.tracks && isReady) {
      for (const [trackId, track] of Object.entries(mixerChanges.tracks)) {
        if (track === null || track === void 0 ? void 0 : track.volume) {
          setTrackVolume(trackId, track.volume);
        }

        if (track === null || track === void 0 ? void 0 : track.pan) {
          setTrackPan(trackId, track.pan);
        }

        switch (track === null || track === void 0 ? void 0 : track.playingState) {
          case "mute":
            toggleTrack(trackId);
            break;

          case "solo":
            toggleTrackSolo(trackId);
            break;
        }
      }
    }
  }, [mixerChanges.songKey, isReady]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: style.tracks
  }, isReady && tracks.map((track, index) => /*#__PURE__*/React__default.createElement(Track$1, Object.assign({
    key: track.id + index
  }, track, {
    hasSolo: hasSolo,
    onSolo: toggleTrackSolo,
    onMute: toggleTrack,
    onBypass: toggleTrackFx,
    onVolumeChange: setTrackVolume,
    onSendLevelChange: setTrackSendLevel,
    onPanChange: setTrackPan
  }))));
};

const MasterTrackContainer = ({
  onMasterVolumeChange,
  analyser
}) => {
  const masterVolume = recoil.useRecoilValue(masterVolumeState);
  return /*#__PURE__*/React__default.createElement(MasterTrack, {
    volume: masterVolume,
    onVolumeChange: onMasterVolumeChange,
    analyser: analyser
  });
};

const Effects = () => {
  const effects = recoil.useRecoilValue(effectsState);
  if (!effects.length) return null;
  return /*#__PURE__*/React__default.createElement("div", {
    className: style.effects
  }, effects.map(effect => /*#__PURE__*/React__default.createElement(EffectContainer, Object.assign({}, effect, {
    key: effect.id
  }))));
};

const Desk = ({
  onPlay = () => {},
  onPause = () => {},
  onMasterVolumeChange = () => {},
  onLoop = () => {},
  children
}) => {
  const analyser = recoil.useRecoilValue(analyserState);
  const status = recoil.useRecoilValue(statusState);
  const isLooped = recoil.useRecoilValue(isLoopedState);
  const {
    isReady
  } = useMxContext();
  const isDisabled = isNotActive(status);

  const loopButtonClassNames = () => classnames(style.controlButton, style.loopButton, isLooped && style.isActive, !isLooped && style.isNotActive);

  const controllerRef = React.useRef();
  const [isControlsContainerFixed, setIsControlsContainerFixed] = React.useState(false);
  const deskDiv = React.useRef();

  const setFixedClass = () => {
    if (!isControlsContainerFixed && controllerRef.current.getBoundingClientRect().top <= 0) {
      setIsControlsContainerFixed(true);
    } else if (!isControlsContainerFixed) {
      setIsControlsContainerFixed(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('scroll', setFixedClass);
    return () => document.removeEventListener('scroll', setFixedClass);
  }, []);
  return /*#__PURE__*/React__default.createElement("div", {
    className: style.desk,
    ref: deskDiv
  }, /*#__PURE__*/React__default.createElement("div", {
    className: style.deskContainer
  }, /*#__PURE__*/React__default.createElement("div", {
    className: style.mixerTitle
  }, /*#__PURE__*/React__default.createElement("h2", null, /*#__PURE__*/React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '30',
    height: '25',
    viewBox: '0 0 30 25'
  }, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M.018 25V7.644h5.729V25z'
  })), /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M8.096 25v-9.704h5.729V25z'
  })), /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M16.176 25V.913h5.729V25z'
  })), /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M24.254 25V11.368h5.729V25z'
  }))))), "Audio Mixer"), /*#__PURE__*/React__default.createElement("p", null, "Create your own mix to practice along with")), /*#__PURE__*/React__default.createElement(Tracks, null), analyser && /*#__PURE__*/React__default.createElement(MasterTrackContainer, {
    onMasterVolumeChange: onMasterVolumeChange,
    analyser: analyser
  })), /*#__PURE__*/React__default.createElement("div", {
    className: style.controlsBlock
  }, !isReady && /*#__PURE__*/React__default.createElement("div", {
    className: style.controlsContainerDisable
  }), /*#__PURE__*/React__default.createElement("div", {
    ref: controllerRef,
    className: style.controlsContainer
  }, /*#__PURE__*/React__default.createElement("div", {
    className: classnames(style.controlsWrapper, {
      [style.isFixed]: isControlsContainerFixed
    })
  }, /*#__PURE__*/React__default.createElement(ProgressBar$1, null), /*#__PURE__*/React__default.createElement("div", {
    className: style.controls
  }, /*#__PURE__*/React__default.createElement(PlayController, {
    isDisabled: isDisabled,
    status: status,
    onPlay: onPlay,
    onPause: onPause
  }), /*#__PURE__*/React__default.createElement("div", {
    className: style.controlsCustom
  }, children), /*#__PURE__*/React__default.createElement("div", {
    className: style.controlsRight
  }, /*#__PURE__*/React__default.createElement(VolumeController, {
    onMasterVolumeChange: onMasterVolumeChange
  }), /*#__PURE__*/React__default.createElement("button", {
    className: loopButtonClassNames(),
    onClick: () => {
      onLoop(!isLooped);
    },
    disabled: isDisabled
  }, /*#__PURE__*/React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '31px',
    viewBox: '0 0 31 28'
  }, /*#__PURE__*/React__default.createElement("defs", null), /*#__PURE__*/React__default.createElement("path", {
    fill: '#fff',
    d: 'M28.3 4.4L24 0v3.4H10.4A10.5 10.5 0 002 19.8l1.4-1.4A8.4 8.4 0 012 13.9c0-4.7 3.8-8.5 8.4-8.5H24V9zM2.7 23.2l4.4 4.4v-3.4h13.5a10.5 10.5 0 008.6-16.4l-1.5 1.4a8.4 8.4 0 011.3 4.6c0 4.6-3.7 8.4-8.4 8.4H7.1v-3.4z'
  })))))))), /*#__PURE__*/React__default.createElement(Effects, null));
};

exports.Context = Context;
exports.Delay = Delay;
exports.DeskContainer = DeskContainer;
exports.Distortion = Distortion;
exports.EffectContainer = EffectContainer;
exports.FX = FX;
exports.Mixdesk = Mixdesk;
exports.Mixer = Mixer;
exports.MxContext = MxContext;
exports.MxContextProvider = MxContextProvider;
exports.Reverb = Reverb;
exports.connectNodes = connectNodes;
exports.connectNodesSingle = connectNodesSingle;
exports.createAnalyser = createAnalyser;
exports.createContext = createContext;
exports.createEffectEntity = createEffectEntity;
exports.createGainNode = createGainNode;
exports.createMasterBus = createMasterBus;
exports.createPanner = createPanner;
exports.createPlaybackEntity = createPlaybackEntity;
exports.createState = createState;
exports.createTrackEntity = createTrackEntity;
exports.fetchAudioAsArrayBuffer = fetchAudioAsArrayBuffer;
exports.generateIdByTitle = generateIdByTitle;
exports.getNodeParamNormalizedValue = getNodeParamNormalizedValue;
exports.isActive = isActive;
exports.isAudioParam = isAudioParam;
exports.isContextRunning = isContextRunning;
exports.isNotActive = isNotActive;
exports.isPaused = isPaused;
exports.isPlaying = isPlaying;
exports.isReady = isReady;
exports.pauseAll = pauseAll;
exports.playAll = playAll;
exports.resumeContext = resumeContext;
exports.rewindAll = rewindAll;
exports.setNodeParamNormalizedValue = setNodeParamNormalizedValue;
exports.setNodeParams = setNodeParams;
exports.stopAll = stopAll;
exports.useMixer = useMixer;
exports.useMxContext = useMxContext;
exports.useProgress = useProgress;
exports.useScrollPosition = useScrollPosition;
//# sourceMappingURL=index.js.map
