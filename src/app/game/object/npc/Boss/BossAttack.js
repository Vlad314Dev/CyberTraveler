import WarpedBoltBullet from 'GameObject/Bullet/WarpedBoltBullet';
import WarpedPulseBullet from 'GameObject/Bullet/WarpedPulseBullet';
import Phaser from 'phaser';

class BossAttack
{
    /**
     * @inheritdoc
     */
    constructor(boss)
    {
        this._boss = boss;
        this._type = {
            _bolt: {
                _canAttack: true,
                _attackNum: 0,
                _maxAttacks: 3,
                _attackRate: 10000,
                _nextAttackTime: 0,
                _nextFireTime: 0,
                _fireRate: 1500,
                _bullets: boss._scene.add.group({
                    classType: WarpedBoltBullet,
                    key: 'boss-attack/bolt',
                    frameQuantity: 3,
                    active: false,
                    visible: false
                })
            },
            _bounce: {
                _canAttack: true,
                _attackNum: 0,
                _maxAttacks: 5,
                _attackRate: 3000,
                _nextAttackTime: 0,
                _nextFireTime: 0,
                _fireRate: 500,
                _bullets: boss._scene.add.group({
                    classType: WarpedPulseBullet,
                    key: 'boss-attack/bounce',
                    frameQuantity: 5,
                    active: false,
                    visible: false
                })
            }
        };

        this._init();
        this._bindEvents();
    }

    /**
     * Init options
     */
    _init()
    {
    }

    /**
     * Bind events for this object
     */
    _bindEvents()
    {
    }

    _execute(state)
    {
        if (state == 'default') {
            this._defaultAttack();
        }

        if (state == 'bounce') {
            this._bounceAttack();
        }
    }

    _defaultAttack()
    {
        const timeNow = this._boss._scene.time.now;
        const attack = this._type._bolt;

        if (attack._attackNum == attack._maxAttacks && timeNow > attack._nextAttackTime) {
            attack._attackNum = 0;
            attack._canAttack = true;
        }

        if (attack._canAttack && timeNow > attack._nextFireTime) {
            const bullet = attack._bullets.getFirst();
    
            if (bullet) {
                bullet._fire(this._boss.x, this._boss.y, -20, -10, -1);
            }

            attack._nextFireTime = timeNow + attack._fireRate;
            attack._attackNum++;

            if (attack._attackNum == attack._maxAttacks) {
                attack._nextAttackTime = timeNow + attack._attackRate;
                attack._canAttack = false;
            }
        }
    }

    _bounceAttack()
    {
        const timeNow = this._boss._scene.time.now;
        const attack = this._type._bounce;

        if (attack._attackNum == attack._maxAttacks && timeNow > attack._nextAttackTime) {
            attack._attackNum = 0;
            attack._canAttack = true;
        }

        if (attack._canAttack && timeNow > attack._nextFireTime) {
            const bullet = attack._bullets.getFirst();
    
            if (bullet) {
                const velDirection = Phaser.Math.Between(1, 100) > 50 ? -1 : 1;
                const velocityX = 200;
                const velocityY = Phaser.Math.Between(1, 10) * velDirection * 30;
                bullet._fire(this._boss.x, this._boss.y, -20, -10, -1, -velocityX, velocityY);
            }

            attack._nextFireTime = timeNow + attack._fireRate;
            attack._attackNum++;

            if (attack._attackNum == attack._maxAttacks) {
                attack._nextAttackTime = timeNow + attack._attackRate;
                attack._canAttack = false;
            }
        }
    }
}

export default BossAttack;
