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
        let directions = [
            { x: -1, y: 1 },
            { x: 1, y: -1 },
        ]

        for (let x = 0; x <= moves; x++) {
            let remaining_moves = moves - x

            directions.forEach(direction => {
                let { x: dx, y: dy } = direction;

                let new_pos = this.game.game_board.normalizeCords({
                    x: this.x + (dx * x),
                    y: this.y + (dy * remaining_moves)
                })

                destinations.push(new_pos)

            })

        }

        return destinations

    }

    showDestinations(destinations) {
        if (this.game) {
            destinations.forEach(destination => {
                let tile = this.game.game_board.board[destination.x][destination.y]

                if (!tile.collapsed && !tile.value.includes("p")) {
                    document.getElementById(`tile-${destination.x}-${destination.y}`)
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
            this.findAllDestinations(2)
            this.findAllDestinations(3)
            this.findAllDestinations(4)

        } else {
            let moves = tile.value
            this.findAllDestinations(moves)

        }
    }
}