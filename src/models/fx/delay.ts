'use strict';

import {
    getNodeParamNormalizedValue,
} from '../../helpers/node';

import {FX} from './fx-base';


const DEFAULT_FEEDBACK = 80;
const DEFAULT_TIME = 25;
const DEFAULT_FREQUENCY = 5; // 1120 of 20000 in percents

export class Delay extends FX {

    // TODO
    chain: any;

    constructor(context, masterBus) {
        super({
            context,
            masterBus,
            id: 'delay',
        });

        this.addNode(context.createDelay(), {
            delayTime: DEFAULT_TIME,
        });

        this.addNode(context.createGain(), {
            gain: DEFAULT_FEEDBACK,
        });

        this.addNode(context.createBiquadFilter(), {
            frequency: DEFAULT_FREQUENCY,
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
