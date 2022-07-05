'use strict'

import { keys } from 'ramda'
import { AudioContext, IAnalyserNode, IGainNode, IAudioContext } from 'standardized-audio-context';
import { CONTEXT_STATE } from '../constants'

export const createContext = () => {
  return new AudioContext();
}

// TODO
export const createMasterBus = (
  context: AudioContext,
  connections: any[] = []
): IGainNode<IAudioContext> => {
  const gain = context.createGain()

  gain.connect(context.destination)
  connections.map((connection) => gain.connect(connection))

  return gain
}

export const createAnalyser = (
  context: AudioContext,
  parameters = { fftSize: 64 }
): IAnalyserNode<IAudioContext> => {
  const analyser = context.createAnalyser()

  keys(parameters).map((key) => (analyser[key] = parameters[key]))
  return analyser
}

export const createPanner = (context: IAudioContext) =>
  context.createStereoPanner()

export const isAudioParam = (node, parameter) =>
  node[parameter] instanceof AudioParam

export const fetchAudioAsArrayBuffer = (url): Promise<ArrayBuffer> =>
  fetch(url, {credentials: 'include'}).then((response) => response.arrayBuffer())

export const isContextRunning = (context) =>
  context.state === CONTEXT_STATE.RUNNING

/**
 * @returns {Promise}
 */
export const resumeContext = (context) => context.resume()
