import AbstractCharacter from 'GameObject/AbstractCharacter';
import BossAttack from 'GameObject/Npc/Boss/BossAttack';
import Phaser from 'phaser';
import { isMobile } from 'react-device-detect';

class Boss extends AbstractCharacter
{
    constructor(scene, x, y, key)
    {
        super({ scene, x, y, key });

        this._defaultHitbox = {
            _size: {
                _w: 310, 
                _h: 290
            },
            _offset: {
                _x: -155, 
                _y: -70
            }
        };

        this._bodyParts = {
            'torso': {},
            'arm-back-part-1': {},
            'forearm-back': {},
            'arm-part-1': {},
            'arm-part-2': {},
            'forearm-front': {},
            'lower-torso-1': {},
            'lower-torso-2': {},
            'lower-torso-3': {},
        };
        this._torso = { _x: x, _y: y, _active: 1 };
        this._states = {
            _idle: 'idle',
            _phase1: 'phase1',
            _phase2: 'phase2',
            _phase3: 'phase3'
        };
        this._maxHealth = 1000;
        this._health = this._maxHealth;
        this._animations = {
            _arms: {
                _speed: 80,
                _nextAnimTime: 0,
                _x: 0,
                _y: 0,
                _xMax: 20,
                _yMax: 10,
                _forward: true
            },
            _torso: {
                _speed: 75,
                _nextAnimTime: 0,
                _x: 0,
                _y: 0,
                _xMax: 20,
                _yMax: 10,
                _forward: true
            },
            _lowerTorso: {
                _speed: 75,
                _nextAnimTime: 0,
                _x: 0,
                _y: 0,
                _xMax: 20,
                _yMax: 10,
                _forward: true
            }
        };
        this._attack = new BossAttack(this);
        this._isDead = false;
        this._score = 10000;

        this._scale = isMobile ? 1.5 : 2;

        this._bindEvents();
        this._init();
    }

    /**
     * Bind events to the object
     */
    _bindEvents()
    {
        
    }

    /**
     * Init options
     */
    _init()
    {
        // Body parts based on the torso position
        if (!isMobile) {
            this._bodyParts['arm-back-part-1'] = this.scene.add.sprite(this._torso._x - 65, this._torso._y + 25, 'boss-atlas', 'arm-back-part').setDepth(4);
            this._bodyParts['forearm-back'] = this.scene.add.sprite(this._torso._x - 120, this._torso._y + 65, 'boss-atlas', 'forearm-back').setDepth(5);
            this._bodyParts['torso'] = this.scene.add.sprite(this._torso._x, this._torso._y, 'boss-atlas', 'torso1').setDepth(4);
            this._bodyParts['arm-part-1'] = this.scene.add.sprite(this._torso._x + 70, this._torso._y + 25, 'boss-atlas', 'arm-part').setDepth(5);
            this._bodyParts['arm-part-2'] = this.scene.add.sprite(this._torso._x + 80, this._torso._y + 45, 'boss-atlas', 'arm-part').setDepth(5);
            this._bodyParts['forearm-front'] = this.scene.add.sprite(this._torso._x + 65, this._torso._y + 80, 'boss-atlas', 'forearm-front').setDepth(5);
            this._bodyParts['lower-torso-1'] = this.scene.add.sprite(this._torso._x + 45, this._torso._y + 92, 'boss-atlas', 'lower-torso-1').setDepth(3);
            this._bodyParts['lower-torso-2'] = this.scene.add.sprite(this._torso._x + 50, this._torso._y + 135, 'boss-atlas', 'lower-torso-2').setDepth(2);
            this._bodyParts['lower-torso-3'] = this.scene.add.sprite(this._torso._x + 55, this._torso._y + 160, 'boss-atlas', 'lower-torso-3').setDepth(1);
            Object.keys(this._bodyParts).forEach((bossPartKey) => this._bodyParts[bossPartKey].setScale(this._scale));
        } else {
            this._bodyParts['arm-back-part-1'] = this.scene.add.sprite(this._torso._x - 55, this._torso._y + 25, 'boss-atlas', 'arm-back-part').setDepth(4);
            this._bodyParts['forearm-back'] = this.scene.add.sprite(this._torso._x - 98, this._torso._y + 60, 'boss-atlas', 'forearm-back').setDepth(5);
            this._bodyParts['torso'] = this.scene.add.sprite(this._torso._x, this._torso._y, 'boss-atlas', 'torso1').setDepth(4);
            this._bodyParts['arm-part-1'] = this.scene.add.sprite(this._torso._x + 53, this._torso._y + 25, 'boss-atlas', 'arm-part').setDepth(5);
            this._bodyParts['arm-part-2'] = this.scene.add.sprite(this._torso._x + 63, this._torso._y + 45, 'boss-atlas', 'arm-part').setDepth(5);
            this._bodyParts['forearm-front'] = this.scene.add.sprite(this._torso._x + 48, this._torso._y + 75, 'boss-atlas', 'forearm-front').setDepth(5);
            this._bodyParts['lower-torso-1'] = this.scene.add.sprite(this._torso._x + 28, this._torso._y + 67, 'boss-atlas', 'lower-torso-1').setDepth(3);
            this._bodyParts['lower-torso-2'] = this.scene.add.sprite(this._torso._x + 38, this._torso._y + 105, 'boss-atlas', 'lower-torso-2').setDepth(2);
            this._bodyParts['lower-torso-3'] = this.scene.add.sprite(this._torso._x + 43, this._torso._y + 130, 'boss-atlas', 'lower-torso-3').setDepth(1);
            Object.keys(this._bodyParts).forEach((bossPartKey) => this._bodyParts[bossPartKey].setScale(this._scale));
        }
        
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);

        this._resetHitbox();
        this._addAnimations();
        this._setState(this._states._idle);
        this.setAlpha(0);
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
    }

    /**
     * When enemy is hitted
     */
    _onHit(damage = 1)
    {
        this._health -= damage;
        
        if (this._health <= 0) {
            this._scene._sfx._bossDead.play();
            
            const cameraShakeDuration = 2000;
            this._scene.cameras.main.shake(cameraShakeDuration, 0.01);
            this._deactivate();
            this._scene.time.addEvent({
                delay: cameraShakeDuration,
                callback: () => {
                    this._scene._gameOver();
                }
            });
            return;
        }

        if (this._torso._active == 1 && this._health <= (this._maxHealth * 0.66) && this._health >= (this._maxHealth * 0.33)) {
            this._torso._active = 2;
            this._bodyParts['torso'].destroy();
            this._bodyParts['torso'] = this.scene.add.sprite(this._torso._x, this._torso._y, 'boss-atlas', 'torso2').setDepth(4).setScale(this._scale);
        }

        if (this._torso._active == 2 && this._health <= (this._maxHealth * 0.33)) {
            this._torso._active = 3;
            this._bodyParts['torso'].destroy();
            this._bodyParts['torso'] = this.scene.add.sprite(this._torso._x, this._torso._y, 'boss-atlas', 'torso3').setDepth(4).setScale(this._scale);
        }

        if (this._health >= this._maxHealth * 0.66) {
            this._setData('state', this._states._phase1);
        } else if (this._health >= this._maxHealth * 0.33) {
            this._setData('state', this._states._phase2);
        } else {
            this._setData('state', this._states._phase3);
        }
    }

    /**
     * Activate boss
     */
    _activate()
    {
        this._isActivated = true;
        this._setData('state', this._states._phase1);
    }

    /**
     * Check if activated
     */
    _getIsActivated()
    {
        return this._isActivated;
    }

    /**
     * Deactivate object from the world
     */
    _deactivate()
    {
        this._isDead = true;
        this.body.setSize(0);

        Object.keys(this._bodyParts).forEach((bossPartKey) => {
            this.scene.time.addEvent({
                delay: Phaser.Math.Between(1, 3) * 200,
                callback: () => {
                    const bodyPart = this._bodyParts[bossPartKey];
                    this.scene.physics.world.enable(bodyPart);
                },
                callbackScope: this,
                repeat: 0
            });
        });
    }

    /**
     * @inheritdoc
     */
    preUpdate(time, delta)
    {
        if (this._isDead) {
            return;
        }

        super.preUpdate(time, delta);

        const state = this.getData('state');
        if (state === this._states._phase1) {
            this._attack._execute('default');
            this._attack._execute('rain');
        } else if (state === this._states._phase2) {
            this._attack._execute('default');
            this._attack._execute('bounce');
        } else if (state === this._states._phase3) {
            this._attack._execute('default');
            this._attack._execute('bounce');
            this._attack._execute('rain');
        }

        if (time > this._animations._torso._nextAnimTime) {
            this._animations._torso._nextAnimTime = this._scene.time.now + this._animations._torso._speed;

            if (this._animations._torso._forward) {
                this._animations._torso._y += 1;
                this._bodyParts['torso'].y += 1;
                
                if (this._animations._torso._y == this._animations._torso._yMax) {
                    this._animations._torso._forward = false;
                }
            } else {
                this._animations._torso._y -= 1;
                this._bodyParts['torso'].y -= 1;
    
                if (this._animations._torso._y == 0) {
                    this._animations._torso._forward = true;
                }
            }
        }

        if (time > this._animations._arms._nextAnimTime) {
            this._animations._arms._nextAnimTime = this._scene.time.now + this._animations._arms._speed;

            if (this._animations._arms._forward) {
                this._animations._arms._y += 1;
                this._bodyParts['forearm-front'].y += 1;
                this._bodyParts['forearm-back'].y += 1;
                this._bodyParts['arm-back-part-1'].y += 1;
                this._bodyParts['arm-part-1'].y += 1;
                this._bodyParts['arm-part-2'].y += 1;

                this._bodyParts['forearm-front'].x += 1;
                this._bodyParts['forearm-back'].x += 1;
                
                if (this._animations._arms._y == this._animations._arms._yMax) {
                    this._animations._arms._forward = false;
                }
            } else {
                this._animations._arms._y -= 1;
                this._bodyParts['forearm-front'].y -= 1;
                this._bodyParts['forearm-back'].y -= 1;
                this._bodyParts['arm-back-part-1'].y -= 1;
                this._bodyParts['arm-part-1'].y -= 1;
                this._bodyParts['arm-part-2'].y -= 1;

                this._bodyParts['forearm-front'].x -= 1;
                this._bodyParts['forearm-back'].x -= 1;
    
                if (this._animations._arms._y == 0) {
                    this._animations._arms._forward = true;
                }
            }
        }

        if (time > this._animations._lowerTorso._nextAnimTime) {
            this._animations._lowerTorso._nextAnimTime = this._scene.time.now + this._animations._lowerTorso._speed;

            if (this._animations._lowerTorso._forward) {
                this._animations._lowerTorso._y += 1;
                this._bodyParts['lower-torso-1'].y += 1;
                this._bodyParts['lower-torso-2'].y += 1;
                this._bodyParts['lower-torso-3'].y += 1;
                
                if (this._animations._lowerTorso._y == this._animations._lowerTorso._yMax) {
                    this._animations._lowerTorso._forward = false;
                }
            } else {
                this._animations._lowerTorso._y -= 1;
                this._bodyParts['lower-torso-1'].y -= 1;
                this._bodyParts['lower-torso-2'].y -= 1;
                this._bodyParts['lower-torso-3'].y -= 1;
    
                if (this._animations._lowerTorso._y == 0) {
                    this._animations._lowerTorso._forward = true;
                }
            }
        }
    }
}

export default Boss;
