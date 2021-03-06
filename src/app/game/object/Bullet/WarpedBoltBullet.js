import DefaultBullet from 'GameObject/Bullet/DefaultBullet';
import Phaser from 'phaser';

class WarpedBoltBullet extends DefaultBullet
{
    /**
     * Init options
     */
    _init()
    {
        this._damage = 1;

        super._init();

        this._path = [];
        this._pi = 0;
        this._points = {};
        this._angle = 0;
        this.flipX = true;

        this.body.setAllowGravity(false);
    }

    /**
     * Set animation keys
     */
    _initAnimKeys()
    {
        super._initAnimKeys();
        
        this._animKey.fire = 'warped/bolt';
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this.scene.anims.create({
            key: this._animKey.fire,
            frames: this.scene.anims.generateFrameNames('warped-shots-and-hits-atlas', {
                prefix: 'bolt',
                start: 1,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    /**
     * Missile execution
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} offsetX 
     * @param {number} offsetY 
     * @param {number 1 or -1} directionX 
     * @param {number} velocityX 
     */
    _fire(x, y, offsetX, offsetY, directionX)
    {   
        this._pi = 0;

        this._directionX = directionX;

        this.body.reset(x + offsetX, y + offsetY);
        this._interpolateToTarget();

        this.setScale(1.5);
        this.setActive(true);
        this.setVisible(true);
        this.play(this._animKey.fire, true);
    }

    /**
     * Hide object from scene on collide
     */
    _onCollision()
    {
        const bossHit = this.scene._misc._bossHit.getFirst();
        if (this.active && bossHit) {
            // Centrate hit appearance
            bossHit._activate(this.body.x, this.body.y + this.height / 2);
        }
        
        this._path = [];
        this._pi = 0;
        this.setActive(false);
        this.setVisible(false);
        this.body.reset(); // Without reset the body will be still in scene
    }

    /**
     * Interpolation logic to a target
     */
    _interpolateToTarget()
    {   
        this._target = this.scene._player1;
        this._path = [];

        this._points = {
            x: [this.x, this._target.x],
            y: [this.y, this._target.y]
        };

        // Ratio for same points amount to make projectiles speed equal for any distance
        const pointsRatio = 3; // 1 point per 3px, lower number = more points = lower movement speed
        const pointsCount = Math.abs(this.x - this._target.x) / pointsRatio;
        const t = 1 / pointsCount; // Interpolation percentage
        for (let i = 0, ax = 0; i <= 1; i += t, ax++) {
            let px, py;
            
            px = Phaser.Math.Interpolation.Linear(this._points.x, i);
            py = Phaser.Math.Interpolation.Linear(this._points.y, i);

            let path = { x: px, y: py};

            this._path.push(path);
        }

        this._angle = Phaser.Math.Angle.BetweenPoints({ x: this.x, y: this.y }, { x: this._target.x, y: this._target.y });
    }

    /**
     * @inheritdoc
     */
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);
        
        if (this._path.length && this._path[this._pi]) {
            this.x = this._path[this._pi].x;
            this.y = this._path[this._pi].y;
            this.rotation = this._angle;
            this._pi++;
            if (this._pi >= this._path.length) this._onCollision();
        } else {
            this.x += 15 * this._directionX;
        }
    }
}

export default WarpedBoltBullet;
