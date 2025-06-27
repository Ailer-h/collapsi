var turn = 1
var player_moving = false

var game_board = null

var p1 = new Player({x: 0, y: 0}, "p1")
var p2 = new Player({x: 0, y: 0}, "p2")

document.addEventListener("DOMContentLoaded", () => {
    
    new_match();

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
    let player_position = {"x": player_cords[0], "y": player_cords[1]}

    //Highligths clicked tile    
    tile.classList.toggle("selected")
    player_moving = !player_moving
    
    if(!player_moving){
        clear_selections();
        return
    }

    if (turn <= 2){
        find_all_destinations(1, player_position)
        find_all_destinations(2, player_position)
        find_all_destinations(3, player_position)
        find_all_destinations(4, player_position)
        
    }else {
        let moves = tile.value
        find_all_destinations(moves, player_position)

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
    player_moving = false

    let elements = []

    elements.push(document.getElementsByClassName("p1")[0])
    elements.push(document.getElementsByClassName("p2")[0])
    
    elements = elements.concat(Array.from(document.getElementsByClassName("player-info")))

    elements.forEach(element => {
        element.classList.toggle("playing")
    })

    elements[0].classList.remove("selected")
    elements[1].classList.remove("selected")
    
}

let clear_selections = () => {
    let elements = Array.from(document.getElementsByClassName("valid-destination"))
    
    elements.forEach(element => {
        element.classList.remove("valid-destination")
    })

}

let get_valid_destinations = (moves, start_pos) => {

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

    return destinations

}

let find_all_destinations = (moves, start_pos) => {

    let destinations = get_valid_destinations(moves, start_pos)
    show_destinations(destinations)

}

let show_destinations = (destinations) => {
    
    destinations.forEach(destination => {

        let normalized = normalize_cords(destination)
        let tile = game_board[normalized.x][normalized.y]

        if(!tile.collapsed && !tile.value.includes("p")){
            document.getElementById(`tile-${normalized.x}-${normalized.y}`)
            .classList.add("valid-destination")
            
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

let get_player_cords = (player) => {
    let cords = document.getElementsByClassName("p1")[0].id.split("-").slice(1,3)

    return {
        x: Number(cords[0]),
        y: Number(cords[1])
    }

}

let handle_tiles = (e) => {
    let cords = get_tile_element(e.target).id.split("-").slice(1,3)
    let tile = game_board[cords[0]][cords[1]]

    if(!tile.value.includes('p') && !player_moving){
        tile.collapse()
    }

    if(!tile.value.includes('p') && player_moving) {
        
        if(turn % 2 != 0){
            p1.setCords({
                x: Number(cords[0]),
                y: Number(cords[1])
            })

        }else {
            p2.setCords({
                x: Number(cords[0]),
                y: Number(cords[1])
            })

        }

        clear_selections()
        change_turn()

    }
}

let new_match = () => {
 
    new_game();

    player_moving = false
    turn = 1

    game_board = read_board()
    
    p1.setCords(get_player_cords("p1"))
    p2.setCords(get_player_cords("p2"))

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
        tile.addEventListener("click", handle_tiles)
    })
    
}