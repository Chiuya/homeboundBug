class Player extends Sprite {
    constructor({
        collisionBlocks = [], imageSrc, frameRate, animations, loop
    }) {
        super({imageSrc, frameRate, animations, loop})
        this.position = {
            x: 200,
            y: 200
        }
        //gravity
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1

        this.sides = {
            bottom: this.position.y + this.height
        }

        this.collisionBlocks = collisionBlocks
    }

    update() {
        //blue box for debug purposes
        //c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.position.x += this.velocity.x

        this.updateHitbox()
        //1) check for horizontal collisions
        this.checkForHorizontalCollisions()
        //2) apply gravity
        this.applyGravity()
        
        this.updateHitbox()

        //hitbox debug purposes
        //c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        //3) check for vertical collisions
        this.checkForVerticalCollisions()
    }

    handleInput(keys) {
            //key control
    if (this.preventInput) return
    this.velocity.x = 0
    if (keys.right.pressed) {
        this.switchSprite('runRight')
        this.velocity.x = 5
        this.lastDirection = 'right'
    } else if (keys.left.pressed) {
        this.switchSprite('runLeft')
        this.velocity.x = -5
        this.lastDirection = 'left'
    } else {
        //idle
        if (this.lastDirection === 'left') {
            this.switchSprite('idleLeft')
        } else {
            this.switchSprite('idleRight')
        }
    }
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 58, //with offset
                y: this.position.y + 34, //offset
            },
            width: 50, //temporary
            height: 53,
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            //if collision exists
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {
                    //moving to left, collision on x axis
                    if (this.velocity.x < 0) {
                        const offset = this.hitbox.position.x - this.position.x
                        this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                        break
                    }
                    //moving to right, collision on x axis
                    if (this.velocity.x > 0) {
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                        this.position.x = collisionBlock.position.x - offset - 0.01
                        break
                    }
                }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity //gravity
        this.position.y += this.velocity.y
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            //if collision exists
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {
                    //moving up, collision on y axis
                    if (this.velocity.y < 0) {
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y
                        this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                        break
                    }
                    //moving down, collision on y axis
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                        this.position.y = collisionBlock.position.y - offset - 0.01
                        break
                    }
                }
        }
    }
}