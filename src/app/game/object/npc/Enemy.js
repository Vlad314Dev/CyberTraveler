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
        // The distance that is used by npc to chase/attack player
        this._activeDistance = 800;
        this._isDead = true;
        this._canJump = false;

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
        this.setActive(false);
        this.setVisible(false);

        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);

        this._resetHitbox();

        this._addAnimations();
        this.play('enemy/robo-solder-run', true);
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
        
        const spawnCoef = Phaser.Math.Between(1, 100);
        const spawnSide = spawnCoef <= 65 || this._scene._player1.x < 1600 ? 1 : -1;
        const maxY = 1692;
        const floorSize = 112;
        let spawnY;

        if (spawnCoef <= 50) {
            spawnY = this._scene._player1.y - 20; // Make sure that sprite do not fall
        } else if (spawnCoef <= 75) {
            spawnY = maxY - floorSize;
        } else {
            spawnY = maxY - floorSize * 2;
        }

        // Set spawn direction based on the player1 position
        this._directionX = this._scene._player1.x > this.x ? 1 : -1;
        this.flipX = this._directionX !== 1;

        this.setPosition(this._scene._player1.x + window.innerWidth / 2 * spawnSide, spawnY);
        this.setScale(2);
        this._resetHitbox();
        this.setActive(true);
        this.setVisible(true);
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
                            itemSprite.body.setCollideWorldBounds(true)
                                .setImmovable(true)
                                .setAllowGravity(false);
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
                            itemSprite.body.setCollideWorldBounds(true)
                                .setImmovable(true)
                                .setAllowGravity(false);
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

        // Deactivate if fall or too far away
        if (this.y >= 2000
            || (p1DistanceX >= 0 && p1DistanceX >= this._activeDistance * 1.5) // NPC went far away to left
            || (p1DistanceX <= 0 && p1DistanceX <= -this._activeDistance * 1.5) // NPC went far away to right
        ) {
            this._deactivate();
        }

        // Fire if distance allows
        const p1DistanceX = this._scene._player1.x - this.x;
        if ((p1DistanceX >= 0 && p1DistanceX <= this._activeDistance && this._directionX === 1) // Player at right and NPC is turned right
            || (p1DistanceX <= 0 && p1DistanceX >= -this._activeDistance && this._directionX === -1) // Player at left and NPC is turned left
        ) {
            this._fire();
        }
        
        // World bounds collision
        if (this.body.blocked.left || this.body.blocked.right) {
            // Turn around
            this.flipX = !this.flipX;
            this._directionX = -this._directionX;
        }

        // Jump is allowed if on ground
        if (!this._canJump) {
            this._canJump = this.body.blocked.down;
        }
        
        // If can jump and not on a ground then jump once
        if (this._canJump && !this.body.blocked.down) {
            this.body.setVelocityY(-400);
            this._canJump = false;
        }

        this.x += 3 * this._directionX;
    }
}

export default Enemy;
