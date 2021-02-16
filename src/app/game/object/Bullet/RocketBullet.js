import DefaultBullet from 'GameObject/Bullet/DefaultBullet'
import Phaser from 'phaser';

class RocketBullet extends DefaultBullet
{
    /**
     * Projectile execution
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} offsetX 
     * @param {number} offsetY 
     * @param {number 1 or -1} directionX 
     * @param {number} velocityX 
     */
    _fire(x, y, offsetX, offsetY, directionX, velocityX = 800)
    {   
        this._lifeTime = this.scene.time.now + 5000; // 5 sec

        this.body.reset(x, y);
        this.body.setVelocity(velocityX * directionX, 0);

        this.setScale(2);
        this.setActive(true);
        this.setVisible(true);
    }

    /**
     * Hide object from scene on collide
     */
    _onCollision()
    {
        this.setActive(false);
        this.setVisible(false);
        this.body.reset(); // Without reset the body will be still in scene
        this._path = [];
        this._pi = 0;
    }

    /**
     * @inheritdoc
     */
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        // Trigger collision if object is alive for too long
        if (time > this._lifeTime) {
            this._onCollision();
        }

        const p1 = this.scene._player1;
        let closestEnemy;
        this.scene._enemies.children.each((enemy) => {
            if (!closestEnemy || enemy.visible && Math.abs(p1.x - closestEnemy.x) > Math.abs(p1.x - enemy.x)) {
                closestEnemy = enemy;
            }
        });
        // const closestEnemy = this.scene.physics.closest(p1, visibleEnemies);
        if (closestEnemy && Math.abs(p1.x - closestEnemy.x) <= 800) {
            if (!this._path || !this._path.length) {
                this._path = [];
                this._points = {
                    x: [p1.x, closestEnemy.x],
                    y: [p1.y, closestEnemy.y]
                };
                
                this._pi = 0;
    
                let t = 1 / 150;
                for (let i = 0, ax = 0; i <= 1; i += t, ax++) {
                    let px = Phaser.Math.Interpolation.Bezier(this._points.x, i);
                    let py = Phaser.Math.Interpolation.Bezier(this._points.y, i);
                    let path = { x: px, y: py, angle: 0 };
                    
                    if (ax != 0) {
                        path.angle = Phaser.Math.Angle.BetweenPoints(this._path[ax - 1], path);
                    }

                    this._path.push(path);
                }
            }

            this.x = this._path[this._pi].x;
            this.y = this._path[this._pi].y;
            this.rotation = this._path[this._pi].angle;
            this._pi++;
            if (this._pi >= this._path.length) this._onCollision();
        }
    }
}

export default RocketBullet;
