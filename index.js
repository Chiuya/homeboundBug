const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
//16:9 aspect ratio needed
canvas.width = 64 * 16 //1024
canvas.height = 64 * 9 //576

let parsedCollisions
let collisionBlocks
let background
let doors
const player = new Player({
    imageSrc: './img/bug/idle.png', 
    frameRate: 2,
    animations: {
        idleRight: {
            frameRate: 2,
            frameBuffer: 20,
            loop: true,
            imageSrc: './img/bug/idle.png',
        },
        idleLeft: {
            frameRate: 2,
            frameBuffer: 20,
            loop: true,
            imageSrc: './img/bug/idleLeft.png',
        },
        runRight: {
            frameRate: 2,
            frameBuffer: 10,
            loop: true,
            imageSrc: './img/bug/runRight.png',
        },
        runLeft: {
            frameRate: 2,
            frameBuffer: 10,
            loop: true,
            imageSrc: './img/bug/runLeft.png',
        },
        enterDoor: {
            frameRate: 4,
            frameBuffer: 8,
            loop: false,
            imageSrc: './img/bug/enterDoor.png',
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        //TEMPORARY
                        if (level === 5) level = 0
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0,
                        })
                    },
                })
            }
        },
    }
})

let level = 0
let levels = {
    0: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = -100
            player.position.y = -100
            player.preventInput = true

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false
            }
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/startScreen.png'

            })

            doors = []
            let begin = gsap.to(overlay, {
                opacity: 1,
                onComplete: () => {
                    level++
                    //TEMPORARY
                    if (level === 5) level = 0
                    levels[level].init()
                    player.switchSprite('idleRight')
                    player.preventInput = false
                    gsap.to(overlay, {
                        opacity: 0,
                    })
                },
            })
            begin.delay(5)
            begin.play()
        },
    },
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 200
            player.position.y = 200
            player.preventInput = false

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false
            }
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/backgroundLevel1.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 336,
                    },
                    imageSrc: './img/doorOpen.png',
                    //frameRate: 5,
                    //frameBuffer: 5,
                    //loop: false,
                    //autoplay: false,
                }),
            ]
        },
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false
            }
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/backgroundLevel2.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 90,
                        y: 400,
                    },
                    imageSrc: './img/doorOpen.png',
                    //frameRate: 5,
                    //frameBuffer: 5,
                    //loop: false,
                    //autoplay: false,
                }),
            ]
        },
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 750
            player.position.y = 230

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false
            }
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/backgroundLevel3.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 128,
                        y: 144,
                    },
                    imageSrc: './img/doorOpen.png',
                    //frameRate: 5,
                    //frameBuffer: 5,
                    //loop: false,
                    //autoplay: false,
                }),
            ]
        },
    },
    4: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = -100
            player.position.y = -100
            player.preventInput = true

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false
            }
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/winScreen.png'

            })
            doors = []
            let begin = gsap.to(overlay, {
                opacity: 1,
                onComplete: () => {
                    level++
                    //TEMPORARY
                    if (level === 5) level = 0
                    levels[level].init()
                    player.switchSprite('idleRight')
                    player.preventInput = false
                    gsap.to(overlay, {
                        opacity: 0,
                    })
                },
            })
            begin.delay(5)
            begin.play()
        },
    },
}

const keys = {
    up: {
        pressed: false
    },
    left: {
        pressed: false
    },
    right: {
        pressed: false
    }
}

const overlay = {
    opacity: 0,
}

function animate() {
    window.requestAnimationFrame(animate)
    //clear canvas
    background.draw()
    //debug purposes only
    //collisionBlocks.forEach(collisionBlock => {
    //    collisionBlock.draw()
    //})

    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)

    //player anim
    player.draw()
    player.update()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()
}

levels[level].init()
animate()