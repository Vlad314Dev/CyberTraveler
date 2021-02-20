import AbstractCharacter from 'GameObject/AbstractCharacter';
import DefaultWeapon from 'GameObject/Weapon/DefaultWeapon';
import Phaser from 'phaser';
import LifeTime from 'phaser3-rex-plugins/plugins/lifetime.js';

class Enemy extends AbstractCharacter
{
    /**
     * @inheritdoc
     */
    constructor(scene, x, y, key)
    {
        super({ scene, x, y, key });
        // Object states
        this._states = {
            _patrol: 'patrol',
            _chase: 'chase',
            _attack: 'attack'
        };
        // Object default hitbox data
        this._defaultHitbox = {
            _size: {
                _w: 30, 
                _h: 40
            },
            _offset: {
                _x: 10, 
                _y: 10
            }
        };
        // Object direction on X axis
        this._directionX = 1;
        // Selected weapon
        this._selectedWeapon = new DefaultWeapon(this, 2000);
        this._selectedWeapon._enabled = true;
        // Health
        this._defaultHealth = 2;
        this._health = this._defaultHealth;
        // Time when an object will dissapear from the world
        this._lifeTime;
        // The distance that is used by npc to chase/attack player
        this._activeDistance = 800;
        this._isDead = true;
    }

    /**
     * Init options
     */
    _init()
    {
        this.setActive(false);
        this.setVisible(false);

        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);

        this._resetHitbox();
        this._setState(this._states._patrol);

        this._addAnimations();
        this.play('enemy/robo-solder-run', true);
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
            const states = this._states;

            switch (state) {
                case states._patrol:
                case states._chase:
                    break;
                case states._attack:
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
            key: 'enemy/robo-solder-run',
            frames: this._scene.anims.generateFrameNames('enemies-atlas', {
                prefix: 'robo-soldier-run',
                start: 1,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    /**
     * Fire bullet
     */
    _fire()
    {
        const offsetX = (this.width / 2 + 10) * this._directionX;
        const offsetY = 10;
        const velocityX = 400;
        this._selectedWeapon._fire(this.x, this.y, offsetX, offsetY, this._directionX, velocityX);
    }

    /**
     * Spawn enemy
     */
    _spawn()
    {
        this._health = this._defaultHealth;
        this._isDead = false;
        
        const spawnSideCoef = Phaser.Math.Between(1, 100);
        const spawnSide = spawnSideCoef >= 50 ? 1 : -1;
        this.setPosition(this._scene._player1.x + window.innerWidth * spawnSide, 1000);
        this.setScale(2);
        this._resetHitbox();
        this.setActive(true);
        this.setVisible(true);
        // @todo
        this.setY(1000);

        this._lifeTime = this._scene.time.now + 20000;
    }

    /**
     * When enemy is hitted
     */
    _onHit(damage = 1)
    {
        this._health -= damage;
        
        if (this._health <= 0) {
            this._deactivate();
        }
    }

    /**
     * Deactivate object from the world
     */
    _deactivate()
    {
        this.setActive(false);
        this.setVisible(false);
        this._dropItem();
        this.body.reset();
        this._isDead = true;
    }

    /**
     * Leave item
     */
    _dropItem()
    {
        if (!this._isDead) {
            const itemsDropChance = [
                { 
                    chance: 25,
                    type: 'weapon',
                    id: 'missile'
                },
                {
                    chance: 60,
                    type: 'weapon',
                    id: 'pierce'
                }
            ];
            const randomChance = Phaser.Math.Between(1, 100);

            itemsDropChance.every((dropData) => {
                if (dropData.chance > randomChance) {
                    if (dropData.type === 'weapon') {
                        if (dropData.id === 'missile') {
                            let itemSprite = this._scene.add.sprite(this.x, this.y, 'guns-and-shots-atlas', 'gun-09');
                            this._scene.physics.world.enable(itemSprite);
                            itemSprite.body.setCollideWorldBounds(true);
                            itemSprite.body.setImmovable(true);
                            new LifeTime(itemSprite, {
                                lifeTime: 15000, 
                                destroy: true 
                            });

                            this._scene.physics.add.overlap(this._scene._player1, itemSprite, this._onItemPick, null, {
                                this: this,
                                dropData: dropData,
                                _scene: this._scene,
                                itemSprite: itemSprite
                            });

                            return false;
                        } else if (dropData.id === 'pierce') {
                            let itemSprite = this._scene.add.sprite(this.x, this.y, 'guns-and-shots-atlas', 'gun-06');
                            this._scene.physics.world.enable(itemSprite);
                            itemSprite.body.setCollideWorldBounds(true);
                            itemSprite.body.setImmovable(true);
                            new LifeTime(itemSprite, {
                                lifeTime: 15000, 
                                destroy: true 
                            });

                            this._scene.physics.add.overlap(this._scene._player1, itemSprite, this._onItemPick, null, {
                                this: this,
                                dropData: dropData,
                                _scene: this._scene,
                                itemSprite: itemSprite
                            });

                            return false;
                        }
                    }
                }

                return true;
            });
        }
    }

    _onItemPick()
    {
        if (this.dropData.type === 'weapon') {
            this._scene._player1._weapons.forEach((weapon) => {
                if (weapon._type === this.dropData.id) {
                    weapon._enabled = true;
                }
            });

            this.itemSprite.destroy();
        }
    }

    /**
     * Getter
     */
    _getBullets()
    {
        return this._selectedWeapon._bullets;
    }

    /**
     * @inheritdoc
     */
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        // if (this._scene.time.now > this._lifeTime) {
        //     this._deactivate();
        // }
        // The code below will not be executed if the object is not active

        const p1DistanceX = this._scene._player1.x - this.x;

        if ((p1DistanceX >= 0 && p1DistanceX <= this._activeDistance && this._directionX === 1) // Player at right and NPC is turned right
            || (p1DistanceX <= 0 && p1DistanceX >= -this._activeDistance && this._directionX === -1) // Player at left and NPC is turned left
        ) {
            this._fire();
        }
        
        if ((p1DistanceX >= 0 && p1DistanceX >= this._activeDistance && this._directionX === -1) // NPC went far away to left
            || (p1DistanceX <= 0 && p1DistanceX <= -this._activeDistance && this._directionX === 1) // NPC went far away to right
            || (this.body.blocked.left || this.body.blocked.right) // World bounds collision
        ) {
            // Turn around
            this.flipX = !this.flipX;
            this._directionX = -this._directionX;
        }

        this.x += 3 * this._directionX;
    }
}

export default Enemy;
