import Phaser from 'phaser';
import { store } from 'UIStore';
import { addToScore } from 'UIStore/Score/ScoreAction';

import {
    TEST_POINTERDOWN_EVENT
} from './TestSceneEmitterConfig';

export const TestSceneEmitter = new Phaser.Events.EventEmitter();

TestSceneEmitter.on(TEST_POINTERDOWN_EVENT, () => store.dispatch(addToScore(1)));

export default TestSceneEmitter;
