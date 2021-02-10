import Phaser from 'phaser';

class Player1
{
    constructor(config)
    {
        this.scene = config.scene;
        this.player1 = this.scene.add.sprite(config.x, config.y, 'player1'); // Create sprite from scene
        
        this.state = {
            jump: false
        };

        this.init();
        this.bind();
    }

    // Initialize object data
    init()
    {
        this.scene.physics.world.enable(this.player1); // Enable physics for sprite

        this.addAnimations();
        
        this.player1.scale = 2; // Icrease size
        this.player1.body.setSize(35,40); // Change hitbox size
        this.player1.body.setOffset(20, 10); // Change hitbox position
        this.player1.body.setVelocityY(200);
        this.player1.body.setCollideWorldBounds(true); // Make screen borders to collide

        // Keyboard controls
        this.keyboard = {
            left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            jump: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        };
    }

    // Bind custom methods to use outside of the object
    bind()
    {
        this.player1.update = () => {
            const { 
                jump 
            } = this.state;
            const isPlayerOnGroud = this.player1.body.blocked.down;
            
            if (this.keyboard.right.isDown) { // Move right
                this.player1.flipX = false;
                this.player1.play('run', true); // true ignores animation if already playing
                this.player1.x += 3;
            } else if (this.keyboard.left.isDown) { // Move left
                this.player1.flipX = true;
                this.player1.play('run', true);
                this.player1.x -= 3;
            } else {
                this.player1.play('idle', true);
            }
            
            if (this.keyboard.jump.isDown && isPlayerOnGroud && !jump) { // Jump
                this.player1.play('jump', true);
                this.player1.body.setVelocityY(-300);
                this.state.jump = true;
            } else if (!this.keyboard.jump.isDown && isPlayerOnGroud && jump) { // Allow jump
                this.state.jump = false;
            }
        }
    }

    addAnimations()
    {
        // Create animations
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'idle-gun',
                start: 1,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'run-with-gun',
                start: 1,
                end: 10
            }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'jump-with-gun',
                start: 1,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    // Use this method to retrieve the main object
    get()
    {
        return this.player1;
    }
}

export default Player1;
