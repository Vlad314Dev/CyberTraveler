import Phaser from 'phaser';
import { store } from 'UIStore';
import { 
    DEBUG,
    debug,
} from 'UIStore/Debug/DebugAction';
import { 
    REDUCE_HEALTH,
    reduceHealth,
    RESTORE_HEALTH,
    restoreHealth
} from 'UIStore/P1Health/P1HealthAction';
import {
    SET_SCORE,
    setScore
} from 'UIStore/Score/ScoreAction';

export const P1Emitter = new Phaser.Events.EventEmitter();

P1Emitter.on(REDUCE_HEALTH, (damage) => store.dispatch(reduceHealth(damage)));
P1Emitter.on(RESTORE_HEALTH, (amount) => store.dispatch(restoreHealth(amount)));
P1Emitter.on(DEBUG, (data) => store.dispatch(debug(data)));
P1Emitter.on(SET_SCORE, (score) => store.dispatch(setScore(score)));

export default P1Emitter;
