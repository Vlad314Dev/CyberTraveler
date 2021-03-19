import Phaser from 'phaser';
import { store } from 'UIStore';
import {
    SET_GAME_OVER,
    SET_SCENE,
    setGameOver,
    setScene
} from 'UIStore/Game/GameAction';

export const GameEmitter = new Phaser.Events.EventEmitter();

GameEmitter.on(SET_SCENE, (sceneName) => store.dispatch(setScene(sceneName)));
GameEmitter.on(SET_GAME_OVER, (isGameOver) => store.dispatch(setGameOver(isGameOver)));

export default GameEmitter;
