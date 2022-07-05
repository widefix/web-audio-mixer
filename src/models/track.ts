import { generateIdByTitle } from '../helpers/entities'
import {
  fetchAudioAsArrayBuffer,
  createPanner,
  createAnalyser
} from '../helpers/audio'
import {
  IAudioContext,
  IAnalyserNode,
  IStereoPannerNode,
  IGainNode,
  IAudioBufferSourceNode
} from 'standardized-audio-context';
import {
  connectNodes,
  createGainNode,
  getNodeParamNormalizedValue,
  setNodeParamNormalizedValue
} from '../helpers/node'

import { TRACK_STATE } from '../constants'

class Track {
  source: IAudioBufferSourceNode<IAudioContext> | null
  title: string
  id: string
  analyser: IAnalyserNode<IAudioContext>
  buffer: AudioBuffer = null
  context: IAudioContext
  pausedAt: number = 0
  startedAt: number = 0
  muted: boolean = false
  soloed: boolean = false
  playing: boolean = false
  hasBeenPlayed: boolean = false
  bypassFX: boolean = false
  previousVolume: number
  state: TRACK_STATE = TRACK_STATE.NOT_SET
  bus: IGainNode<IAudioContext>
  soloBus: IGainNode<IAudioContext>
  fx: any
  loadingState: Promise<this>
  panner: IStereoPannerNode<IAudioContext>
  isFinished: boolean
  isLooped = false
  handleMixerUnsupportedError: (message: string) => void

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
    this.id = generateIdByTitle(title)
    this.handleMixerUnsupportedError = handleMixerUnsupportedError

    this.title = title
    this.context = context
    this.isFinished = false

    this.analyser = createAnalyser(this.context)
    this.bus = createGainNode(context)
    this.soloBus = createGainNode(context)
    this.panner = createPanner(context)

    connectNodes(this.bus, this.panner)
    connectNodes(this.panner, this.analyser)
    connectNodes(this.analyser, this.soloBus)
    connectNodes(this.soloBus, masterBus)

    this.fx = {}

    this.volume = volume
    this.pan = pan

    if (sends.length > 0) {
      this.addFx(sends)
    }

    this.loadingState = this.load(url)
  }

  get volume() {
    return getNodeParamNormalizedValue(this.bus.gain)
  }

  set volume(value) {
    if (this.muted) {
      this.previousVolume = value
    } else {
      setNodeParamNormalizedValue(this.bus.gain, value)
    }
  }

  get pan() {
    const countAbsoluteValue = (val: number): number => {
      return (val + 100) / 2
    }
    return countAbsoluteValue(getNodeParamNormalizedValue(this.panner.pan))
  }

  set pan(value) {
    const countAbsoluteValue = (val: number): number => {
      return -100 + val * 2
    }
    setNodeParamNormalizedValue(this.panner.pan, countAbsoluteValue(value))
  }

  get looped() {
    return this.source.loop
  }

  set looped(value) {
    this.isLooped = value
    !this.source && this.createSource()
    this.source.loop = value
  }

  get currentTime() {
    if (this.buffer) {
      return (this.context.currentTime - this.startedAt) % this.buffer.duration
    }

    return 0
  }

  toStartPosition(volume = 70, pan = 50) {
    if (this.muted) {
      this.unmute()
    }
    setNodeParamNormalizedValue(this.soloBus.gain, 100)
    this.soloed = false
    this.volume = volume
    this.pan = pan
  }

  load(url): Promise<this> {
    return fetchAudioAsArrayBuffer(url)
      .catch((e) => {
        throw {
          error: e,
          message: 'Mixer unavailable at this time. Please reach out to support if the issue persists'
        }
      })
      .then((audioBuffer) => {
        return new Promise((resolve, reject) =>
          this.context.decodeAudioData(audioBuffer, resolve, reject)
        )
        .then((decodedAudioData: AudioBuffer) => {
          this.buffer = decodedAudioData
          this.state = TRACK_STATE.READY
          this.createSource()
          return this
        })
        .catch((e) => {
          throw {
            error: e,
            message: "Unfortunately, your browser doesn't support mixer!"
          }
        })
      })

      .catch((error) => {
        this.handleMixerUnsupportedError(error.message)
        this.state = TRACK_STATE.FAILED
        console.log('[ERROR LOADING TRACK]', error, `URL: ${url}`)
        return this
      })
  }

  createSource() {
    this.source = this.context.createBufferSource()
    this.source.buffer = this.buffer
    this.source.connect(this.bus)

    // Get back loop when created again
    if (this.isLooped) {
      this.looped = true
    } else {
      this.source.addEventListener('ended', this.onSourceEnded)
    }
  }

  onSourceEnded = () => {
    this.stop()
  }

  removeSource() {
    if (this.source) {
      this.source.removeEventListener('ended', this.onSourceEnded)
      this.source.disconnect()
      this.hasBeenPlayed && this.source.stop(0)
      this.source = null
    }
  }

  play(playPosition) {
    this.hasBeenPlayed = true
    this.isFinished = false
    if (!this.playing) {
      !this.source && this.createSource()
      this.source.start(0, playPosition || this.pausedAt)
      this.startedAt = playPosition
        ? (this.context.currentTime - playPosition) % this.buffer.duration
        : (this.context.currentTime - this.pausedAt) % this.buffer.duration
      this.pausedAt = 0
      this.playing = true
    }
  }

  playWithOffset(offset = 0) {
    this.play(this.pausedAt + offset > 0 ? this.pausedAt + offset : 0)
  }

  pause() {
    if (this.playing) {
      const elapsed = (this.context.currentTime - this.startedAt) % this.buffer.duration
      this.removeSource()
      this.playing = false
      this.pausedAt = elapsed
    }
  }

  setCurrentPosition(requestedSecond) {
    if (this.playing) {
      this.pause()
      this.play(requestedSecond)
    } else {
      this.pausedAt = requestedSecond < 0 ? 0 : requestedSecond
    }
  }

  fastForward(value = 15) {
    if (this.playing) {
      this.pause()
      this.playWithOffset(value)
    } else {
      this.pausedAt = this.pausedAt + value > 0 ? this.pausedAt + value : 0
    }
  }

  stop() {
    this.isFinished = true
    this.pause()
  }

  mute() {
    this.previousVolume = this.volume
    this.volume = 0
    this.muted = true
  }

  unmute() {
    this.muted = false
    this.volume = this.previousVolume
  }

  toggleMute() {
    this.muted ? this.unmute() : this.mute()
  }

  solo() {
    this.soloed = true
    setNodeParamNormalizedValue(this.soloBus.gain, 100)
  }

  unsolo() {
    this.soloed = false
    setNodeParamNormalizedValue(this.soloBus.gain, 0)
  }

  resetSolo() {
    setNodeParamNormalizedValue(this.soloBus.gain, 100)
  }

  toggleSolo() {
    this.soloed ? this.unsolo() : this.solo()
  }

  addFx(effects) {
    return effects.map((fx) => {
      const { id, signalIn } = fx
      const bus = createGainNode(this.context, 0)

      if (this.fx[id]) {
        return false
      }

      connectNodes(this.bus, bus)
      connectNodes(bus, signalIn)

      this.fx[id] = bus

      return bus
    })
  }

  removeFx(id) {
    this.fx[id].disconnect()
  }

  toggleFX() {
    const keys = Object.keys(this.fx)

    this.bypassFX
      ? keys.map(
          (fxId) => (this.fx[fxId].gain.value = this.fx[fxId].previousVolume)
        )
      : keys.map((fxId) => {
          this.fx[fxId].previousVolume = this.fx[fxId].gain.value
          this.fx[fxId].gain.value = 0
        })

    this.bypassFX = !this.bypassFX

    return this.bypassFX
  }
}

export default Track
