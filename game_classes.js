class Tile {

    constructor(x, y, value) {
        this.x = x
        this.y = y
        this.tile = document.getElementById(`tile-${this.x}-${this.y}`)
        this.value = value

        this.collapsed = false

    }

    collapse() {
        this.collapsed = true

        this.tile.classList.add("collapsed")
    }

}

class Player {
    constructor(cords, name, game_instance) {
        this.x = Number(cords.x)
        this.y = Number(cords.y)
        this.name = name

        this.game = game_instance

        this.score = 0

    }

    setCords(cords) {
        this.x = Number(cords.x)
        this.y = Number(cords.y)
    }

    getValidDestinations(moves) {
        let destinations = []
        for (let x = 0; x <= moves; x++) {
            let remaining_moves = moves - x

            destinations.push({
                x: this.x + x,
                y: this.y + remaining_moves
            })

            destinations.push({
                x: this.x + x,
                y: this.y - remaining_moves
            })

            destinations.push({
                x: this.x - x,
                y: this.y + remaining_moves
            })

            destinations.push({
                x: this.x - x,
                y: this.y - remaining_moves
            })
        }

        return destinations

    }

    showDestinations(destinations) {
        if (this.game) {
            destinations.forEach(destination => {
                let normalized = this.game.game_board.normalizeCords(destination)
                let tile = this.game.game_board.board[normalized.x][normalized.y]

                if (!tile.collapsed && !tile.value.includes("p")) {
                    document.getElementById(`tile-${normalized.x}-${normalized.y}`)
                    .classList.add("valid-destination")

                }

            })
        }
    }

    findAllDestinations(moves) {

        let destinations = this.getValidDestinations(moves)
        this.showDestinations(destinations)

    }

    showMoves() {
        let player = this.game.game_board.board[this.x][this.y]
        let tile = document.getElementById(`tile-${this.x}-${this.y}`)

        //Highligths clicked tile    
        tile.classList.toggle("selected")
        this.game.player_moving = !this.game.player_moving

        if (!this.game.player_moving) {
            this.game.game_board.clearDestinations();
            return
        }

        if (this.game.turn <= 2) {
            this.findAllDestinations(1)
            // this.findAllDestinations(2)
            // this.findAllDestinations(3)
            // this.findAllDestinations(4)

        } else {
            let moves = tile.value
            this.findAllDestinations(moves)

        }
    }
}

class Board {
    constructor() {
        this.board = []
    }

    loadBoard() {

        Array.from(document.getElementsByClassName("tile")).forEach(tile => {
            let tile_cords = tile.id.split("-").slice(1, 3)
            let tile_card = tile.textContent

            if (!tile_card) {
                tile_card = tile.classList[1]
            }

            let tile_obj = new Tile(tile_cords[0], tile_cords[1], tile_card)

            if (!this.board[tile_cords[0]]) {
                this.board[tile_cords[0]] = []
            }

            this.board[tile_cords[0]].push(tile_obj)

        })
    }

    normalizeCords(cords) {
        let board_size = this.board.length

        if (cords.x < 0) {
            cords.x = board_size + cords.x
        }

        if (cords.y < 0) {
            cords.y = board_size - cords.y
        }

        if (cords.x >= board_size) {
            cords.x = cords.x % board_size
        }

        if (cords.y >= board_size) {
            cords.y = cords.y % board_size
        }

        return cords
    }

    clearDestinations() {
        let elements = Array.from(document.getElementsByClassName("valid-destination"))

        elements.forEach(element => {
            element.classList.remove("valid-destination")
        })
    }

    getTileElement(element) {
        let element_parent = element

        while (true) {
            if (element_parent.classList.contains("tile")) {
                return element_parent
            }

            element_parent = element_parent.parentElement

        }
    }

    getPlayerPosition(player_name) {
        let cords = document.getElementsByClassName(player_name)[0].id.split("-").slice(1, 3)

        return {
            x: Number(cords[0]),
            y: Number(cords[1])
        }
    }
}