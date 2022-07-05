import {keys} from 'ramda';
import { IAudioContext, IGainNode } from 'standardized-audio-context';
import {isAudioParam} from './audio';


export const getNodeParamNormalizedValue = node => {
    const {value, maxValue, defaultValue} = node;

    let resultValue = value;

    // @TODO: fix it in normal way
    if (defaultValue === 1) {
        resultValue = value / (1 / 100);
    } else {
        resultValue = value / (maxValue / 100);
    }

    return resultValue;
}

export const setNodeParamNormalizedValue = (node, value): AudioParam => {
    const {maxValue, minValue, defaultValue} = node;
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
}

export const setNodeParams = (node, params) => keys(params).forEach(key => {
    if (isAudioParam(node, key)) {
        setNodeParamNormalizedValue(node[key], params[key]);
    } else {
        node[key] = params[key];
    }

    return node;
});

export const connectNodes = (source, destination) =>
    source.connect(destination);

export const connectNodesSingle = (source, destination) => {
    source.disconnect();
    connectNodes(source, destination);
};

export const createGainNode = (context: IAudioContext, defaultVolume = 1): IGainNode<IAudioContext> => {
    const gain = context.createGain();
    gain.gain.value = defaultVolume;

    return gain;
};
