let scores = {"p1": 0, "p2": 0}
let turn = 1

document.addEventListener("DOMContentLoaded", () => {
    
    const game_board = read_board()

    document.getElementsByClassName("p1")[0].addEventListener("click", () => {
        show_moves("p1")
    })
    
    document.getElementsByClassName("p2")[0].addEventListener("click", () => {
        show_moves("p2")
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

        if (!board_array[tile_cords[0]]){
            board_array[tile_cords[0]] = []
        }

        board_array[tile_cords[0]].push(tile_card)

    })

    return board_array

}

let show_moves = (player) => {

    let player_cords = search_2d_array(game_board, player)

    alert("Cords: " + player_cords[0] + " : " + player_cords[1])
}

let search_2d_array = (array, element) => {

    let cords = []

    console.log(array)

    cords.push(array.indexOf(row => row.includes(element)))
    cords.push(array[cords[0]].indexOf(search))

    return cords

}