import AbstractCharacter from 'GameObject/AbstractCharacter';
import BossAttack from 'GameObject/Npc/Boss/BossAttack';

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
            'torso-1': {},
            'arm-back-part-1': {},
            'forearm-back': {},
            'arm-part-1': {},
            'arm-part-2': {},
            'forearm-front': {},
            'lower-torso-1': {},
            'lower-torso-2': {},
            'lower-torso-3': {},
        };
        this._torso = { _x: x, _y: y };
        this._states = {
            _idle: 'idle'
        };
        this._health = 3000;
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
        this._bodyParts['arm-back-part-1'] = this.scene.add.sprite(this._torso._x - 65, this._torso._y + 25, 'boss-atlas', 'arm-back-part').setDepth(4);
        this._bodyParts['forearm-back'] = this.scene.add.sprite(this._torso._x - 120, this._torso._y + 65, 'boss-atlas', 'forearm-back').setDepth(5);
        this._bodyParts['torso-1'] = this.scene.add.sprite(this._torso._x, this._torso._y, 'boss-atlas', 'torso1').setDepth(4);
        this._bodyParts['arm-part-1'] = this.scene.add.sprite(this._torso._x + 70, this._torso._y + 25, 'boss-atlas', 'arm-part').setDepth(5);
        this._bodyParts['arm-part-2'] = this.scene.add.sprite(this._torso._x + 80, this._torso._y + 45, 'boss-atlas', 'arm-part').setDepth(5);
        this._bodyParts['forearm-front'] = this.scene.add.sprite(this._torso._x + 65, this._torso._y + 80, 'boss-atlas', 'forearm-front').setDepth(5);
        this._bodyParts['lower-torso-1'] = this.scene.add.sprite(this._torso._x + 45, this._torso._y + 92, 'boss-atlas', 'lower-torso-1').setDepth(3);
        this._bodyParts['lower-torso-2'] = this.scene.add.sprite(this._torso._x + 50, this._torso._y + 135, 'boss-atlas', 'lower-torso-2').setDepth(2);
        this._bodyParts['lower-torso-3'] = this.scene.add.sprite(this._torso._x + 55, this._torso._y + 160, 'boss-atlas', 'lower-torso-3').setDepth(1);
        Object.keys(this._bodyParts).forEach((bossPartKey) => this._bodyParts[bossPartKey].setScale(2));

        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);

        this._resetHitbox();
        this._addAnimations();
        this._setState(this._states._idle);
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
    }

    /**
     * @inheritdoc
     */
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        if (this.getData('state') === this._states._idle) {
            // @todo
        }

        if (time > this._animations._torso._nextAnimTime) {
            this._animations._torso._nextAnimTime = this._scene.time.now + this._animations._torso._speed;

            if (this._animations._torso._forward) {
                this._animations._torso._y += 1;
                this._bodyParts['torso-1'].y += 1;
                
                if (this._animations._torso._y == this._animations._torso._yMax) {
                    this._animations._torso._forward = false;
                }
            } else {
                this._animations._torso._y -= 1;
                this._bodyParts['torso-1'].y -= 1;
    
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

        this._attack._execute('bounce');
    }
}

export default Boss;
