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

        this._states = {
            init: 'init',
            runLeft: 'runLeft',
            runRight: 'runRight',
            idle: 'idle',
            crouch: 'crouch',
            jump: 'jump'
        };
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

        this._init();
        this._bindEvents();
    }

    /**
     * Initialize object data
     */
    _init()
    {
        this._addAnimations();
        this.play('idle', true);

        this._scene.physics.world.enable(this); // Enable physics for sprite
        this._resetHitbox();

        this.scale = 3; // Icrease size
        this.body.setCollideWorldBounds(true); // Make screen borders to collide

        // Keyboard controls
        this._keyboard = {
            left: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            crouch: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            jump: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            fire: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        };

        this.bullets = this._scene.add.group();
        this.bullets.createMultiple({
            frameQuantity: 50,
            key: 'guns-and-shots-atlas',
            frame: ['shot-10-01'],
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    /**
     * Bind events to use outside of the object
     */
    _bindEvents()
    {
        /**
         * Actions triggered on state change
         * State is changed once per setState call if not forced
         */
        this.on('changedata-state', (obj, state) => {
            const isPlayerOnGroud = this.body.blocked.down;

            switch (state) {
                case this._states.runLeft:
                    this._resetHitbox();
                    this.flipX = true;
                    if (isPlayerOnGroud) {
                        this.play('run', true);
                    }
                    break;
                case this._states.runRight:
                    this._resetHitbox();
                    this.flipX = false;
                    if (isPlayerOnGroud) {
                        this.play('run', true);
                    }
                    break;
                case this._states.crouch:
                    this.play('crouch', true);
                    this._setHitbox({
                        size: { w: 35, h: 30 },
                        offset: { x: 20, y: 20 }
                    });
                    break;
                case this._states.idle:
                    this._resetHitbox();
                    this.play('idle', true);
                    break;
                case this._states.jump:
                    this._resetHitbox();
                    this.play('jump', true);
                    this.body.setVelocityY(-300);
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
            key: 'idle',
            frames: this._scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'idle-gun',
                start: 1,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        });
        this._scene.anims.create({
            key: 'run',
            frames: this._scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'run-with-gun',
                start: 1,
                end: 10
            }),
            frameRate: 10,
            repeat: -1
        });
        this._scene.anims.create({
            key: 'jump',
            frames: this._scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'jump-with-gun',
                start: 1,
                end: 5
            }),
            frameRate: 10,
            repeat: 0
        });
        this._scene.anims.create({
            key: 'crouch',
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
        const bullet = this.bullets.getFirst();
        const side = this.getData('state') === 'runLeft' ? -1 : 1;
        
        if (bullet) {
            bullet.fire(this.x, this.y, side);
        }
    }

    update()
    {
        const state = this.getData('state');
        const isPlayerOnGroud = this.body.blocked.down;

        if (this._keyboard.right.isDown) { // Move right
            this._setState('runRight', true);
            this.x += 3;
        } else if (this._keyboard.left.isDown) { // Move left
            this._setState('runLeft', true);
            this.x -= 3;
        } else if (this._keyboard.crouch.isDown && state != this._states.crouch && isPlayerOnGroud) { // Crouch
            this._setState('crouch');
        } else if (!this._keyboard.crouch.isDown && state == this._states.crouch) {
            this._setState('idle');
        } else if (state != this._states.idle && isPlayerOnGroud && (state != this._states.crouch || state == this._states.jump)) { // Idle
            this._setState('idle');
        }

        if (this._keyboard.jump.isDown && isPlayerOnGroud && state != this._states.jump) { // Jump
            this._setState('jump');
        } else if (isPlayerOnGroud && state == this._states.jump) {
            this._setState('idle');
        }

        if (Phaser.Input.Keyboard.JustDown(this._keyboard.fire)) {
            this._fire();
        }
    }
}

export default Player1;
