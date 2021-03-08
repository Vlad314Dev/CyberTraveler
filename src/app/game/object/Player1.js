import FireWeapon from 'GameObject/Weapon/FireWeapon';
import MissileWeapon from 'GameObject/Weapon/MissileWeapon';
import PierceWeapon from 'GameObject/Weapon/PierceWeapon';
import P1Emitter from 'GUIBridgeEmitter/P1Emitter';
import Phaser from 'phaser';
import {
    REDUCE_HEALTH,
    RESTORE_HEALTH
} from 'UIStore/P1Health/P1HealthAction';
import {
    DEFAULT_HEALTH_AMOUNT
} from 'UIStore/P1Health/P1HealthConfig';
import {
    SET_SCORE
} from 'UIStore/Score/ScoreAction';

import AbstractCharacter from './AbstractCharacter';

class Player1 extends AbstractCharacter
{
    /**
     * Player1 constructor
     * 
     * @param {object} config 
     */
    constructor(config)
    {
        super(config);

        // Object states
        this._states = {
            _idle: 'idle',
            _runLeft: 'runLeft',
            _runRight: 'runRight',
            _crouch: 'crouch',
            _jump: 'jump',
            _death: 'death',
        };
        
        // Object default hitbox data
        this._defaultHitbox = {
            _size: {
                _w: 35, 
                _h: 38
            },
            _offset: {
                _x: 20, 
                _y: 10
            }
        };
        
        // Object direction on X axis
        this._directionX = 1;
        
        // Weapon data
        this._weapons = [
            new FireWeapon(this, 300, 10),
            new MissileWeapon(this, 1000, 10),
            new PierceWeapon(this, 500, 10)
        ];
        // Weapons count
        this._weaponsCount = this._weapons.length;
        // Select weapon index
        this._selectedWeaponIdx = 0
        // Selected weapon
        this._selectedWeapon = this._weapons[this._selectedWeaponIdx];

        // Keyboard controls
        this._keyboard = {
            _left: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            _right: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            _crouch: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            _switchWeapon: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q, true, false),
            _jump: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            _fire: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
        };
        
        // Player1 health
        this._initHealth = DEFAULT_HEALTH_AMOUNT;
        this._health = this._initHealth;
        // One hit per ms
        this._hitDelay = 1500;
        // Next hit time
        this._nextHitTime = 0;
        this._maxY = 2000;
        // Total score
        this._score = 0;

        // Checkpoint
        this._checkpoint = [
            { x: config.x, y: config.y }
        ];
        this._currentCheckpoint = 0;

        this._bindEvents();
        this._init();
    }

    /**
     * Init options
     */
    _init()
    {
        this.body.setImmovable(true);
        this.body.setGravityY(350);
        
        this.setScale(2); // Icrease size

        this._resetHitbox();
        this._setState(this._states._idle);

        this._addAnimations();
        this.play('player1/idle', true);
    }

    /**
     * Bind events to the object
     */
    _bindEvents()
    {
        /**
         * Actions triggered on state change
         * State is changed once per setState call if not forced
         */
        this.on('changedata-state', (obj, state) => {
            const isPlayerOnGroud = this.body.blocked.down;
            const states = this._states;

            switch (state) {
                case states._runLeft:
                    this._resetHitbox();
                    this.flipX = true;
                    this._directionX = -1;
                    if (isPlayerOnGroud) {
                        this.play('player1/run', true);
                    }
                    break;
                case states._runRight:
                    this._resetHitbox();
                    this.flipX = false;
                    this._directionX = 1;
                    if (isPlayerOnGroud) {
                        this.play('player1/run', true);
                    }
                    break;
                case states._crouch:
                    this.play('player1/crouch', true);
                    this._setHitbox({
                        _size: { _w: 35, _h: 28 },
                        _offset: { _x: 20, _y: 20 }
                    });
                    break;
                case states._idle:
                    this._resetHitbox();
                    this.play('player1/idle', true);
                    break;
                case states._jump:
                    this._resetHitbox();
                    this.play('player1/jump', true);
                    this.body.setVelocityY(-500);
                    break;
                case states._death:
                    this.play('player1/death', true);
                    P1Emitter.emit(REDUCE_HEALTH, this._health);
                    this._health = 0;
                    // this._lives--;
                    break;
                default:
                    break;
            }
        });

        // Switch weapon
        this._keyboard._switchWeapon.on('down', () => {
            for (let i = 0, nextWeaponidx = this._selectedWeaponIdx; i < this._weaponsCount; i++) {
                nextWeaponidx = nextWeaponidx < (this._weaponsCount - 1) ? nextWeaponidx + 1 : 0;

                if (this._weapons[nextWeaponidx]._enabled) {
                    this._selectedWeaponIdx = nextWeaponidx;
                    break;
                }
            }

            this._selectedWeapon = this._weapons[this._selectedWeaponIdx];
        });

        // Reset player to active checkpoint
        this.on('animationcomplete-player1/death', () => {
            if (this._lives < 1) {
                // @todo death screen with options
                this._resurrect();
            } else {
                this._resurrect();
            }
        }, this);
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this._scene.anims.create({
            key: 'player1/idle',
            frames: this._scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'idle-gun',
                start: 1,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        });
        this._scene.anims.create({
            key: 'player1/run',
            frames: this._scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'run-with-gun',
                start: 1,
                end: 10
            }),
            frameRate: 10,
            repeat: -1
        });
        this._scene.anims.create({
            key: 'player1/jump',
            frames: this._scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'jump-with-gun',
                start: 1,
                end: 5
            }),
            frameRate: 10,
            repeat: 0
        });
        this._scene.anims.create({
            key: 'player1/crouch',
            frames: this._scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'crouch-gun',
                start: 1,
                end: 3
            }),
            frameRate: 15,
            repeat: 0
        });
        this._scene.anims.create({
            key: 'player1/death',
            frames: this._scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'die',
                start: 1,
                end: 3
            }),
            frameRate: 5,
            repeat: 0
        });
    }

    _fire()
    {
        const state = this.getData('state');
        const isCrouch = state === this._states._crouch;
        const isRunning = state === this._states._runLeft || state === this._states._runRight;
        const offsetX = (this.width / 2 + 10) * this._directionX;
        const offsetY = isCrouch ? this.height / 2 : 5 + (isRunning ? 10 : 0);

        this._selectedWeapon._fire(this.x, this.y, offsetX, offsetY, this._directionX);
    }

    /**
     * Resurrect character on active checkpoint
     */
    _resurrect()
    {
        if (this.getData('state') === this._states._death) {
            const checkpoint = this._checkpoint[this._currentCheckpoint];
            
            this._health = this._initHealth;
            P1Emitter.emit(RESTORE_HEALTH, this._health);
            this.clearTint();
            this.body.reset(checkpoint.x, checkpoint.y);
            this._setData('state', this._states._idle);
        }
    }

    /**
     * Add score
     */
    _addScore(score)
    {
        this._score += score;
        P1Emitter.emit(SET_SCORE, this._score);
    }

    /**
     * @inheritdoc
     */
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);
        
        const stateDataKey = 'state';
        const state = this.getData(stateDataKey);
        const states = this._states

        if (state !== states._death) {
            const isPlayerOnGroud = this.body.blocked.down;
            const timeNow = this._scene.time.now;
    
            if (this._keyboard._right.isDown) { // Move right
                this._setData(stateDataKey, states._runRight, true);
                this.x += 3;
            } else if (this._keyboard._left.isDown) { // Move left
                this._setData(stateDataKey, states._runLeft, true);
                this.x -= 3;
            } else if (this._keyboard._crouch.isDown && state != states._crouch && isPlayerOnGroud) { // Crouch
                this._setData(stateDataKey, states._crouch);
            } else if (!this._keyboard._crouch.isDown && state == states._crouch) {
                this._setData(stateDataKey, states._idle);
            } else if (state != states._idle && isPlayerOnGroud && (state != states._crouch || state == states._jump)) { // Idle
                this._setData(stateDataKey, states._idle);
            }
    
            if (this._keyboard._jump.isDown && isPlayerOnGroud && state != states._jump) { // Jump
                this._setData(stateDataKey, states._jump);
            } else if (isPlayerOnGroud && state == states._jump) {
                this._setData(stateDataKey, states._idle);
            }
    
            if (this._keyboard._fire.isDown) {
                this._fire();
            }
    
            if (this.y > this._maxY) {
                this._setData(stateDataKey, this._states._death);
            }
    
            if (Math.round((this._nextHitTime - timeNow) < 0)) { // Reset hit timer
                this.clearTint();
                this._nextHitTime = 0;
            } else if (Math.round((this._nextHitTime - timeNow) / 500) % 2 == 0) { // Blink in red color every 500ms after hit
                this.setTint(0xff0000, 0xff0000, 0xff0000, 0xff0000); // Red tint
            } else {
                this.clearTint(); // Blink
            }
        }

        // P1Emitter.emit(DEBUG, {
        //     x: this.x,
        //     y: this.y,
        //     body_x: this.body.x,
        //     body_y: this.body.y
        // });
    }

    /**
     * Getter
     */
    _getBullets()
    {
        return this._selectedWeapon._bullets;
    }

    /**
     * On player1 hit
     */
    _onHit(damage = 1)
    {
        if (this._health > 0) {
            const timeNow = this._scene.time.now;
            if (timeNow > this._nextHitTime) {
                this._nextHitTime = timeNow + this._hitDelay;
                this.clearTint();
                this._health -= damage;
    
                P1Emitter.emit(REDUCE_HEALTH, damage);

                if (this._health <= 0) {
                    this._setData('state', this._states._death);
                }
            }
        }
    }
}

export default Player1;
