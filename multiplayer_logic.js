let scores = {"p1": 0, "p2": 0}
let turn = 1

var game_board = null

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

        this.tile.style.backgroundColor = "blue"
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

    Array.from(document.getElementsByClassName("tile")).forEach(tile => {

        tile.addEventListener("click", (e) => {
                let cords = get_tile_element(e.target).id.split("-").slice(1,3)
                if(!game_board[cords[0]][cords[1]].value.includes('p')){
                    game_board[cords[0]][cords[1]].collapse()

                }

                
        })
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

    find_all_destinations(1, player_cords)

    if (turn == 0){
        
    }else {

    }

}

let get_tile_element = (element) => {

    let element_parent = element

    while (true){
        if (element_parent.classList.contains("tile")){
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

let find_all_destinations = (moves, start_pos) => {

    //Poisitve
    for (let x = -moves; x <= moves; x++){
        let max_y = Math.abs(moves) - x;
        for (let y = -max_y; y <= max_y; y++){
            let normalized = normalize_cords(
                {
                    x: x,
                    y: y
                }
            )
            
            let tile = document.getElementById(`tile-${normalized.x}-${normalized.y}`)
            
            if(game_board[normalized.x][normalized.y].collapsed) continue

            tile
            .style.backgroundColor = "red"
        }
    }

}

let normalize_cords = (cords) => {
    let board_size = game_board.length
    
    if (cords.x < 0){
        cords.x = board_size + cords.x
    }

    if (cords.y < 0){
        cords.y = board_size - cords.y
    }
    
    if (cords.x >= board_size){
        cords.x = cords.x % board_size
    }

    if (cords.y >= board_size){
        cords.y = cords.y % board_size
    }

    return cords

}