import {
  createContext,
  createAnalyser,
  createMasterBus,
  isContextRunning,
  resumeContext
} from '../helpers/audio'
import {
  setNodeParams,
  setNodeParamNormalizedValue,
  getNodeParamNormalizedValue
} from '../helpers/node'
import { playAll, pauseAll, rewindAll, stopAll } from '../helpers/playback'
import Track from './track'
import { FX } from './fx'
import { IAudioContext, IAnalyserNode, IGainNode } from 'standardized-audio-context';

export class Mixer {
  context: IAudioContext
  analyser: IAnalyserNode<IAudioContext>
  tracks: Track[]
  commonTracks: Track[]
  // TODO: rename fx to sends?
  fx: FX[]
  masterBus: IGainNode<IAudioContext>
  handleMixerUnsupportedError: () => void

  constructor(sources = [], effects = [], handleMixerUnsupportedError) {
    if (typeof window !== 'undefined') {
      this.context = createContext()
      this.analyser = createAnalyser(this.context)
      this.masterBus = createMasterBus(this.context, [this.analyser])
      this.tracks = []
      this.handleMixerUnsupportedError = handleMixerUnsupportedError

      // TODO it proper
      this.volume = 100

      this.fx = effects.map(
        (Effect) => new Effect(this.context, this.masterBus)
      )

      this.loadCommonTrack(sources)
    }
  }

  getFirstTrackProperty(propName, defaultValue) {
    return this.tracks[0] ? this.tracks[0][propName] : defaultValue;
  }

  get volume(): number {
    return getNodeParamNormalizedValue(this.masterBus.gain)
  }

  set volume(value) {
    setNodeParamNormalizedValue(this.masterBus.gain, value)
  }

  get duration(): number {
    return Math.max(...this.tracks.map(track => track.buffer?.duration))
  }

  get currentTime(): number {
    return this.getFirstTrackProperty("currentTime", 0)
  }

  get isFinished(): boolean {
    return this.getFirstTrackProperty("isFinished", false)
  }

  get isLooped(): boolean {
    return this.getFirstTrackProperty("isLooped", false)
  }

  async setCurrentPosition(value) {
    return this.tracks.map((track: Track) => {
      track.setCurrentPosition(value)

      return track
    })
  }

  async fastForward(value = 15) {
    return this.tracks.map((track: Track) => {
      track.fastForward(value)

      return track
    })
  }

  async fastRewind(value = 15) {
    return this.fastForward(-value)
  }

  /**
   * @returns {Promise<Mixer>}
   */
  async play() {
    const { context } = this

    if (isContextRunning(context) === false) {
      await resumeContext(context)
    }

    playAll(this.tracks)
    await context.resume()

    return this
  }

  /**
   * @returns {Promise<Mixer>}
   */
  async pause() {
    pauseAll(this.tracks)

    await this.context.suspend()

    return this
  }

  /**
   * @returns {Promise<Mixer>}
   */
  async rewind() {
    rewindAll(this.tracks)

    return this
  }

  /**
   * @returns {Promise<Mixer>}
   */
  async stop() {
    pauseAll(this.tracks)
    stopAll(this.tracks)

    return this
  }

  /**
   * @param {TrackId} trackId
   * @param {number} volume
   * @returns {Promise<Track[]>}
   */
  async setTrackVolume(trackId, volume) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.volume = volume
      }

      return track
    })
  }

  /**
   * @param {TrackId} trackId
   * @param {number} volume
   * @returns {Promise<Track[]>}
   */
  async setTrackPan(trackId, pan) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.pan = pan
      }

      return track
    })
  }
  /**
   *
   * @param {TrackId} trackId
   * @param {SendId} sendId
   * @param {number} level
   * @returns {Promise<Track[]>}
   */
  async setTrackSendLevel(trackId, sendId, level) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        setNodeParamNormalizedValue(track.fx[sendId].gain, level)
      }

      return track
    })
  }

  /**
   * @param {TrackId} trackId
   * @param {number} value
   * @returns {Promise<Track[]>}
   */
  async setTrackPanLevel(trackId, value) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.pan = value
      }

      return track
    })
  }

  /**
   * @param {TrackId} trackId
   * @returns {Promise<Track[]>}
   */
  async soloTrack(trackId) {
    const newTracks = this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.toggleSolo()
        if (track.muted) {
          track.unmute()
        }
      } else {
        if (!track.soloed) {
          track.unsolo()
        }
      }
      return track
    })

    if (newTracks.every((track: Track) => !track.soloed)) {
      newTracks.forEach((track: Track) => track.resetSolo())
    }

    return newTracks
  }

  /**
   * @param {TrackId} trackId
   * @returns {Promise<Track[]>}
   */
  async toggleTrack(trackId) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.toggleMute()
      }

      return track
    })
  }

  /**
   * @param {TrackId} trackId
   * @returns {Promise<Track[]>}
   */
  async toggleTrackFx(trackId) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.toggleFX()
      }

      return track
    })
  }

  /**
   *
   * @param {SendId} sendId
   * @param {number|string} value
   * @retruns {Promise<Send[]>}
   */
  async setSendParamValue(sendId, parameterId, value) {
    return this.fx.map((fx) => {
      if (fx.id === sendId) {
        setNodeParams(fx, { [parameterId]: value })
      }

      return fx
    })
  }

  async loop(value) {
    return this.tracks.map((track: Track) => {
      track.looped = value
      return track
    })
  }

  async loadCommonTrack(sources) {
    this.commonTracks = sources.map(
      ({ url, title }) =>
        new Track({
          url,
          title,
          context: this.context,
          masterBus: this.masterBus,
          sends: this.fx,
          handleMixerUnsupportedError: this.handleMixerUnsupportedError
        })
    )
  }

  async load(sources, callback?) {
    this.commonTracks.forEach((track) => track.toStartPosition())
    this.tracks = [ ...(this.commonTracks || []), ...sources.map(
      ({ url, title }) =>
        new Track({
          url,
          title,
          context: this.context,
          masterBus: this.masterBus,
          sends: this.fx,
          handleMixerUnsupportedError: this.handleMixerUnsupportedError
        })
    )]


    const tracksLength = this.tracks.length
    let trackCounter = 1;
    return Promise.all(
      this.tracks.map((track: Track) =>
        track.loadingState.then((chunk) => {
          const current = trackCounter++
          callback({
            length: tracksLength,
            current: current,
            progress: Math.floor(current / tracksLength * 100),
            isLoading: true
          })
          return chunk
        })
      )
    )
  }
}
