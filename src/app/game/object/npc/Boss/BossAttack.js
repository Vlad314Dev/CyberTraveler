import WarpedBoltBullet from 'GameObject/Bullet/WarpedBoltBullet';

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
                _nextFireTime: 0,
                _fireRate: 1500,
                _bullets: boss._scene.add.group({
                    classType: WarpedBoltBullet,
                    key: 'boss-attack/bolt',
                    frameQuantity: 3,
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

    _execute(state = 'default')
    {
        const timeNow = this._boss._scene.time.now;

        if (state == 'default') {
            const attack = this._type._bolt;

            if (timeNow > attack._nextFireTime) {
                const bullet = attack._bullets.getFirst();
        
                if (bullet) {
                    bullet._fire(this._boss.x, this._boss.y, 0, 0, -1);
                }

                attack._nextFireTime = timeNow + attack._fireRate;
            }
        }
    }
}

export default BossAttack;
