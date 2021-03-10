import Phaser from 'phaser';
import { store } from 'UIStore';
import {
    SET_SCENE,
    setScene
} from 'UIStore/Game/GameAction';

export const GameEmitter = new Phaser.Events.EventEmitter();

GameEmitter.on(SET_SCENE, (sceneName) => store.dispatch(setScene(sceneName)));

export default GameEmitter;
