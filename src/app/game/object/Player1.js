import TestSceneEmitter from 'GUIBridgeEmitter/TestSceneEmitter';
import Phaser from 'phaser';

import AbstractObject from './AbstractObject';
import Bullet from './Bullet';

class Player1 extends AbstractObject
{
    /**
     * Player1 constructor
     * 
     * @param {object} config 
     */
    constructor(config)
    {
        super(config);
    }

    /**
     * @inheritdoc
     */
    _setProperties()
    {
        // Object states
        this._states = {
            idle: 'idle',
            runLeft: 'runLeft',
            runRight: 'runRight',
            crouch: 'crouch',
            jump: 'jump'
        };

        // Object default hitbox data
        this._defaultHitbox = {
            size: {
                w: 35, 
                h: 40
            },
            offset: {
                x: 20, 
                y: 10
            }
        };

        // Object direction on X axis
        this._directionX = 1;

        // Weapon data
        this._weapons = {
            default: {
                bullet: {
                    classType: Bullet,
                    key: 'guns-and-shots-atlas',
                    frame: 'shot-00-01',
                    frameQuantity: 50,
                    active: false,
                    visible: false
                },
                fireRate: 300, // ms
                nextFireTime: 0
            }
        };

        // Selected weapon
        this._selectedWeapon = this._weapons.default;
        this._selectedWeapon.bullets = this._scene.add.group({ ...this._selectedWeapon.bullet });

        // Keyboard controls
        this._keyboard = {
            left: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            crouch: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            jump: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            fire: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
        };
    }

    /**
     * @inheritdoc
     */
    _init()
    {
        this.body.setCollideWorldBounds(true); // Make screen borders to collide
        this.body.setGravityY(400);
        
        this.setScale(3); // Icrease size
        // @todo
        this.setY(1000);

        this._resetHitbox();
        this._setState(this._states.idle);

        this._addAnimations();
        this.play('player1/idle', true);
    }

    /**
     * @inheritdoc
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
                case states.runLeft:
                    this._resetHitbox();
                    this.flipX = true;
                    this._directionX = -1;
                    if (isPlayerOnGroud) {
                        this.play('player1/run', true);
                    }
                    break;
                case states.runRight:
                    this._resetHitbox();
                    this.flipX = false;
                    this._directionX = 1;
                    if (isPlayerOnGroud) {
                        this.play('player1/run', true);
                    }
                    break;
                case states.crouch:
                    this.play('player1/crouch', true);
                    this._setHitbox({
                        size: { w: 35, h: 30 },
                        offset: { x: 20, y: 20 }
                    });
                    break;
                case states.idle:
                    this._resetHitbox();
                    this.play('player1/idle', true);
                    break;
                case states.jump:
                    this._resetHitbox();
                    this.play('player1/jump', true);
                    this.body.setVelocityY(-500);
                    break;
                default:
                    break;
            }
        });
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
    }

    _fire()
    {
        const timeNow = this._scene.time.now;

        if (timeNow > this._selectedWeapon.nextFireTime) {
            const bullet = this._selectedWeapon.bullets.getFirst();
        
            if (bullet) {
                const state = this.getData('state');
                const isCrouch = state === this._states.crouch;
                const isRunning = state === this._states.runLeft || state === this._states.runRight;
                const offsetX = (this.width / 2 + 10) * this._directionX;
                const offsetY = isCrouch ? this.height / 2 : 5 + (isRunning ? 10 : 0);

                bullet._fire(this.x, this.y, offsetX, offsetY, this._directionX);
            }

            this._selectedWeapon.nextFireTime = timeNow + this._selectedWeapon.fireRate;
            
            // Testing GUIBrigde
            TestSceneEmitter.emit('TEST_POINTERDOWN_EVENT');
        }
    }

    /**
     * @inheritdoc
     */
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        const states = this._states
        const stateDataKey = 'state';
        const state = this.getData(stateDataKey);
        const isPlayerOnGroud = this.body.blocked.down;

        if (this._keyboard.right.isDown) { // Move right
            this._setData(stateDataKey, states.runRight, true);
            this.x += 3;
        } else if (this._keyboard.left.isDown) { // Move left
            this._setData(stateDataKey, states.runLeft, true);
            this.x -= 3;
        } else if (this._keyboard.crouch.isDown && state != states.crouch && isPlayerOnGroud) { // Crouch
            this._setData(stateDataKey, states.crouch);
        } else if (!this._keyboard.crouch.isDown && state == states.crouch) {
            this._setData(stateDataKey, states.idle);
        } else if (state != states.idle && isPlayerOnGroud && (state != states.crouch || state == states.jump)) { // Idle
            this._setData(stateDataKey, states.idle);
        }

        if (this._keyboard.jump.isDown && isPlayerOnGroud && state != states.jump) { // Jump
            this._setData(stateDataKey, states.jump);
        } else if (isPlayerOnGroud && state == states.jump) {
            this._setData(stateDataKey, states.idle);
        }

        if (this._keyboard.fire.isDown) {
            this._fire();
        }
    }

    /**
     * Getter
     */
    _getBullets()
    {
        return this._selectedWeapon.bullets;
    }
}

export default Player1;
