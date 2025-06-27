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

    find_all_destinations(3, {"x": player_cords[0], "y": player_cords[1]})

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

    start_pos.x = Number(start_pos.x)
    start_pos.y = Number(start_pos.y)
    let destinations = []

    for (let x = 0; x <= moves; x++){
        let remaining_moves = moves - x

        destinations.push({
            x: start_pos.x + x,
            y: start_pos.y + remaining_moves
        })
        
        destinations.push({
            x: start_pos.x + x,
            y: start_pos.y - remaining_moves
        })
        
        destinations.push({
            x: start_pos.x - x,
            y: start_pos.y + remaining_moves
        })
        
        destinations.push({
            x: start_pos.x - x,
            y: start_pos.y - remaining_moves
        })

    }
    console.log(destinations)
    
    destinations.forEach(destination => {

        let normalized = normalize_cords(destination)

        if(!game_board[normalized.x][normalized.y].collapsed){
            document.getElementById(`tile-${normalized.x}-${normalized.y}`)
            .style.backgroundColor = "red"
        }

    })


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