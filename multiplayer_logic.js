let scores = {"p1": 0, "p2": 0}
let turn = 1

var game_board = null

class Tile{

    constructor (x, y, value){
        this.x = x
        this.y = y
        this.value = value
    
        this.collapsed = false

    }

    collapse(){
        this.collapsed = true
    }

}

document.addEventListener("DOMContentLoaded", () => {
    
    game_board = read_board()

    document.getElementsByClassName("p1")[0].addEventListener("click", (e) => {
        if(turn % 2 != 0){
            let cords = get_tile_element(e.target).id.split("-").slice(1,3)
            
            show_moves(cords)
        }
    })
    
    document.getElementsByClassName("p2")[0].addEventListener("click", (e) => {
        if(turn % 2 == 0){
            let cords = get_tile_element(e.target).id.split("-").slice(1,3)
        
            show_moves(cords)
        }
    })

})

let read_board = () => {

    let board_array = []

    Array.from(document.getElementsByClassName("tile")).forEach(tile => {
        let tile_cords = tile.id.split("-").slice(1,3)
        let tile_card = tile.textContent
        
        if (!tile_card){
            tile_card = tile.classList[1]
        }

        let tile_obj = new Tile(tile_cords[0], tile_cords[1], tile_card)

        if (!board_array[tile_cords[0]]){
            board_array[tile_cords[0]] = []
        }

        board_array[tile_cords[0]].push(tile_obj)

    })

    return board_array

}

let show_moves = (player_cords) => {

    let player = game_board[player_cords[0]][player_cords[1]]
    let tile = document.getElementById(`tile-${player_cords[0]}-${player_cords[1]}`)

    //Highligths clicked tile    
    tile.classList.toggle("selected")

    if (turn == 0){
        
    }else {

    }

}

let get_tile_element = (element) => {

    let element_parent = element

    while (true){
        if (element_parent.classList.contains("p1") || element_parent.classList.contains("p2")){
            return element_parent
        }

        element_parent = element_parent.parentElement
        
    }

}

let change_turn = () => {

    turn++;

    let elements = []

    elements.push(document.getElementsByClassName("p1")[0])
    elements.push(document.getElementsByClassName("p2")[0])
    
    elements = elements.concat(Array.from(document.getElementsByClassName("player-info")))

    elements.forEach(element => {
        element.classList.toggle("playing")
    })
    
}