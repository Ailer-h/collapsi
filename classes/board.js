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
            cords.y = board_size + cords.y
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