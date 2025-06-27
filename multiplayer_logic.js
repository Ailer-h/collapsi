var p1 = new Player({ x: 0, y: 0 }, "p1")
var p2 = new Player({ x: 0, y: 0 }, "p2")

class MultiplayerGame {

    constructor() {
        this.turn = 1
        this.player_moving = false

        this.game_board = new Board()
        this.game_board.loadBoard()

        this.p1 = new Player({ x: 0, y: 0 }, "p1", this)
        this.p2 = new Player({ x: 0, y: 0 }, "p2", this)

        this.p1.setCords(this.game_board.getPlayerPosition(this.p1.name))
        this.p2.setCords(this.game_board.getPlayerPosition(this.p2.name))

    }

    handleTiles(e) {
        if (this.game_board) {


            let cords = this.game_board.getTileElement(e.target).id.split("-").slice(1, 3)
            let tile = this.game_board.board[cords[0]][cords[1]]

            if (!tile.value.includes('p') && !this.player_moving) {
                tile.collapse()
            }

            if (!tile.value.includes('p') && this.player_moving) {

                if (this.turn % 2 != 0) {
                    p1.setCords({
                        x: Number(cords[0]),
                        y: Number(cords[1])
                    })

                } else {
                    p2.setCords({
                        x: Number(cords[0]),
                        y: Number(cords[1])
                    })

                }

                this.game_board.clearDestinations();
                this.changeTurn();

            }
        }
    }

    changeTurn() {
        this.turn++;
        this.player_moving = false;
    }

    newMatch() {

        new_game();

        this.player_moving = false
        this.turn = 1

        this.game_board.loadBoard();

        this.p1.setCords(this.game_board.getPlayerPosition(this.p1.name))
        this.p2.setCords(this.game_board.getPlayerPosition(this.p2.name))

        // this.handleTiles = this.handleTiles.bind(this)

        document.getElementsByClassName("p1")[0].addEventListener("click", () => {
            if (this.turn % 2 != 0) {
                this.p1.showMoves()
            }
        })

        document.getElementsByClassName("p2")[0].addEventListener("click", () => {
            if (this.turn % 2 == 0) {
                this.p2.showMoves()
            }
        })

        Array.from(document.getElementsByClassName("tile")).forEach(tile => {
            tile.addEventListener("click", this.handleTiles)
        })

    }

}

document.addEventListener("DOMContentLoaded", () => {

    var game = new MultiplayerGame();
    game.newMatch();

})