import WarpedBoltBullet from 'GameObject/Bullet/WarpedBoltBullet';
import WarpedPulseBullet from 'GameObject/Bullet/WarpedPulseBullet';
import WaveformPulseBullet from 'GameObject/Bullet/WaveformPulseBullet';
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
            },
            _rain: {
                _canAttack: true,
                _attackNum: 0,
                _maxAttacks: 10,
                _nextAttackRate: 1000,
                _nextAttackTime: 0,
                _nextFireTime: 0,
                _fireRate: 100,
                _runProjectiles: true,
                _runRain: false,
                _rainSpace: this._boss._scene.game.scale.width - this._boss.width,
                _minX: this._boss.x - this._boss._scene.game.scale.width,
                _currentX: this._boss.x - this._boss._scene.game.scale.width,
                _maxX: this._boss.x - this._boss.width,
                _bullets: boss._scene.add.group({
                    classType: WaveformPulseBullet,
                    key: 'boss-attack/rain',
                    frameQuantity: 10,
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

        if (state == 'rain') {
            this._rainAttack();
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

    _rainAttack()
    {
        const timeNow = this._boss._scene.time.now;
        const attack = this._type._rain;
        const canAttack = attack._canAttack && (timeNow > attack._nextAttackTime);

        if (canAttack) {
            if (attack._runProjectiles) {
                if (attack._canAttack && timeNow > attack._nextFireTime) {
                    const bullet = attack._bullets.getFirst();
            
                    if (bullet) {
                        const velocityX = -300;
                        const velocityY = -500;
                        bullet._fire(this._boss.x, this._boss.y, -20, -10, -1, velocityX, velocityY);
                    }
        
                    attack._nextFireTime = timeNow + attack._fireRate;
                    attack._attackNum++;
        
                    if (attack._attackNum == attack._maxAttacks) {
                        attack._nextAttackTime = timeNow + attack._nextAttackRate;
                        attack._runProjectiles = false;
                        attack._runRain = true;
                        attack._attackNum = 0;
                    }
                }
            } else if (attack._runRain) {
                const bullet = attack._bullets.getFirst();
            
                if (bullet) {
                    const velocityX = 0;
                    const velocityY = 150;
                    const targetY = this._boss.y < this._boss._scene._player1.y ? this._boss.y : this._boss._scene._player1.y;
                    const bulletY = targetY - this._boss.scene.game.scale.height / 2
                    bullet._fire(attack._currentX, bulletY, 0, 0, 1, velocityX, velocityY);
                    
                    const rangeVal = (attack._maxX - attack._currentX) / (attack._maxAttacks - attack._attackNum);
                    attack._currentX += Phaser.Math.Between(100, rangeVal);
                    attack._attackNum++;
                }

                if (attack._attackNum == attack._maxAttacks) {
                    attack._nextAttackTime = timeNow + 5000;
                    attack._runProjectiles = true;
                    attack._runRain = false;
                    attack._attackNum = 0;
                    attack._currentX = attack._minX;
                }
            }
        }
    }
}

export default BossAttack;
