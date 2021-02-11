import Phaser from 'phaser';

import Abstract from './Abstract';

class Player1 extends Abstract
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
        }
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
        this._bindMethods();
    }

    /**
     * Initialize object data
     */
    _init()
    {
        this._addAnimations();
        this._object.play('idle', true);

        this._scene.physics.world.enable(this._object); // Enable physics for sprite
        this._resetHitbox();
        
        this._object.scale = 3; // Icrease size
        this._object.body.setVelocityY(200);
        this._object.body.setCollideWorldBounds(true); // Make screen borders to collide

        // Keyboard controls
        this._keyboard = {
            left: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            crouch: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            jump: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        };
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
        this._object.on('changedata-state', (obj, state) => {
            const isPlayerOnGroud = this._object.body.blocked.down;

            switch (state) {
                case this._states.runLeft:
                    this._resetHitbox();
                    this._object.flipX = true;
                    if (isPlayerOnGroud) {
                        this._object.play('run', true);
                    }
                    break;
                case this._states.runRight:
                    this._resetHitbox();
                    this._object.flipX = false;
                    if (isPlayerOnGroud) {
                        this._object.play('run', true);
                    }
                    break;
                case this._states.crouch:
                    this._object.play('crouch', true);
                    this._setHitbox({
                        size: { w: 35, h: 30 },
                        offset: { x: 20, y: 20 }
                    });
                    break;
                case this._states.idle:
                    this._resetHitbox();
                    this._object.play('idle', true);
                    break;
                case this._states.jump:
                    this._resetHitbox();
                    this._object.play('jump', true);
                    this._object.body.setVelocityY(-300);
                    break;
                default:
                    break;
            }
        });
    }

    /**
     * Bind methods to use outside of the object
     */
    _bindMethods()
    {
        this._object.update = () => {
            const state = this._object.getData('state');
            const isPlayerOnGroud = this._object.body.blocked.down;

            if (this._keyboard.right.isDown) { // Move right
                this._setState('runRight', true);
                this._object.x += 3;
            } else if (this._keyboard.left.isDown) { // Move left
                this._setState('runLeft', true);
                this._object.x -= 3;
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
        }
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
}

export default Player1;
