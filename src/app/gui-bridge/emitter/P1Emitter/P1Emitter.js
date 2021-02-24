import Phaser from 'phaser';
import { store } from 'UIStore';
import { 
    DEBUG,
    debug,
} from 'UIStore/Debug/DebugAction';
import { 
    REDUCE_HEALTH,
    reduceHealth
} from 'UIStore/P1Health/P1HealthAction';

export const P1Emitter = new Phaser.Events.EventEmitter();

P1Emitter.on(REDUCE_HEALTH, (damage) => store.dispatch(reduceHealth(damage)));
P1Emitter.on(DEBUG, (data) => store.dispatch(debug(data)));

export default P1Emitter;
