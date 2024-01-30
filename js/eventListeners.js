const jumpVelocity = -21

//start motion
window.addEventListener('keydown', (event) => {
    if (player.preventInput) return
    switch (event.key) {
        case 'w':
            //open whatever door we are standing in front of
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
                if (player.hitbox.position.x  + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height) {
                        //colliding with door
                        player.velocity.x = 0
                        player.velocity.y = 0
                        player.preventInput = true
                        player.switchSprite('enterDoor')
                        //door.play()
                        return //dont jump
                }
            }
            //jump, could potentially double jump if jump at peak
            if (player.velocity.y === 0) player.velocity.y = jumpVelocity
            break
        case ' ':
            //open whatever door we are standing in front of
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
                if (player.hitbox.position.x  + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height) {
                        //colliding with door
                        player.velocity.x = 0
                        player.velocity.y = 0
                        player.preventInput = true
                        player.switchSprite('enterDoor')
                        //door.play()
                        return //dont jump
                }
            }
            //jump, could potentially double jump if jump at peak
            if (player.velocity.y === 0) player.velocity.y = jumpVelocity
            break
        case 'ArrowUp':
            //open whatever door we are standing in front of
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
                if (player.hitbox.position.x  + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height) {
                        //colliding with door
                        player.velocity.x = 0
                        player.velocity.y = 0
                        player.preventInput = true
                        player.switchSprite('enterDoor')
                        //door.play()
                        return //dont jump
                }
            }
            //jump
            if (player.velocity.y === 0) player.velocity.y = jumpVelocity
            break
        case 'a':
            keys.left.pressed = true
            break
        case 'ArrowLeft':
            keys.left.pressed = true
            break
        case 'd':
            keys.right.pressed = true
            break
        case 'ArrowRight':
            keys.right.pressed = true
            break
    }
})

//stopmotion
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.left.pressed = false
            break
        case 'ArrowLeft':
            keys.left.pressed = false
            break
        case 'd':
            keys.right.pressed = false
            break
        case 'ArrowRight':
        keys.right.pressed = false
        break
    }
})