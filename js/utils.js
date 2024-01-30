//make collisions data into 2D array
Array.prototype.parse2D = function() {
    const rows = []
    for (let i = 0; i < this.length; i += 16) { //each row is 16 cells
        rows.push(this.slice(i, i + 16))
    }

    return rows
}

Array.prototype.createObjectsFrom2D = function() {
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 292 || symbol === 250) {
                //push new collision into objects array
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 64, //width of block
                            y: y * 64, //block height
                        },
                    })
                )
            }
        })
    })

    return objects
}