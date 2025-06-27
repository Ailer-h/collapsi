class Tile{

    constructor (x, y, value){
        this.x = x
        this.y = y
        this.tile = document.getElementById(`tile-${this.x}-${this.y}`)
        this.value = value
    
        this.collapsed = false

    }

    collapse(){
        this.collapsed = true

        this.tile.classList.add("collapsed")
    }

}

class Player{
    constructor (cords, name){
        this.x = cords.x
        this.y = cords.y
        this.name = name

        this.score = 0
    }

    setCords(cords){
        this.x = cords.x
        this.y = cords.y
    }
}