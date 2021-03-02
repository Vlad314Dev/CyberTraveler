import DefaultBullet from 'GameObject/Bullet/DefaultBullet'
import Phaser from 'phaser';

class MissileBullet extends DefaultBullet
{
    /**
     * @inheritdoc
     */
    constructor(scene, x, y, key, frame)
    {
        super(scene, x, y, key, frame);

        this._target;
        this._pi = 0;
        this._path = [];
    }

    _init()
    {
        this._damage = 3;

        super._init();
    }

    /**
     * Set animation keys
     */
    _initAnimKeys()
    {
        super._initAnimKeys();

        this._animKey.fire = 'missile/fire';
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this.scene.anims.create({
            key: this._animKey.fire,
            frames: this.scene.anims.generateFrameNames('guns-and-shots-atlas', {
                prefix: 'shot-09-0',
                start: 1,
                end: 2
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
    _fire(x, y, offsetX, offsetY, directionX, velocityX = 0, lifetime = 1000)
    {   
        this._lifeTime = this.scene.time.now + lifetime; // 5 sec
        this._directionX = directionX;

        this.rotation = directionX !== 1 ? Math.PI : 0;
        this.body.reset(x + offsetX, y + offsetY);
        this.body.setVelocity(velocityX, 0);

        if (!this._target) {
            const p1 = this.scene._player1;
            this.scene._enemies.children.each((enemy) => {
                // Search for closest enemy
                if (!this._target || Math.abs(p1.x - this._target.x) > Math.abs(p1.x - enemy.x)) {
                    if (enemy.visible && enemy.active && Math.abs(p1.x - enemy.x) <= 800) {
                        this._target = enemy;
                    }
                }
            });
        }

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
        const hitExplosion = this.scene._misc._hitExplosion.getFirst();
        if (this.active && hitExplosion) {
            hitExplosion._activate(this.body.x, this.body.y);
        }
        
        this._path = [];
        this._target = null;
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
        this._path = [];

        if (this._target && !this._target.visible) {
            this._target = null;
        }

        if (!this._target) {
            return null;
        }

        this._points = {
            x: [this.x, this._target.x + this._target.body.halfWidth / 2],
            y: [this.y, this._target.y]
        };

        const distance = Math.abs(this.x - this._target.x + this._target.body.halfWidth);
        let t = 1 / distance;
        for (let i = 0, ax = 0; i <= 1; i += t, ax++) {
            let px, py;
            
            px = Phaser.Math.Interpolation.Bezier(this._points.x, i);
            py = Phaser.Math.Interpolation.Bezier(this._points.y, i);

            let path = { x: px, y: py, angle: 0 };
            
            if (ax != 0) {
                path.angle = Phaser.Math.Angle.BetweenPoints(this._path[ax - 1], path);
            }

            this._path.push(path);
        }
    }

    /**
     * @inheritdoc
     */
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);
        
        this._interpolateToTarget();
        
        if (this._path.length && this._path[this._pi]) {
            this.x = this._path[this._pi].x;
            this.y = this._path[this._pi].y;
            this.rotation = this._path[this._pi].angle;
            this._pi++;
            if (this._pi >= this._path.length) this._onCollision();
        } else {
            this.x += 15 * this._directionX;
        }
    }
}

export default MissileBullet;
