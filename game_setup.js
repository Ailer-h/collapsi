const board_size = {"width": 4, "height": 4}
const deck = {"1": 4, "2": 4, "3": 4, "4": 2}

document.addEventListener("DOMContentLoaded", () => {
    const board = generate_board(board_size)
    load_board(board)
})

let load_board = (board) => {
    let board_elm = document.getElementById("board");
    board_elm.innerHTML = ""

    board.forEach(row => {
        row.forEach(tile =>{
            board_elm.innerHTML += tile
        })
    })

}

let generate_board = (dimensions) => {

    let board = []
    let deck_arr = generate_shuffled_deck(deck)

    for (let w = 0; w < dimensions.width; w++){
        let row = []
        for (let h = 0; h < dimensions.height; h++){

            let card = deck_arr[w+ dimensions.width*h]
            let tile = `<div><div class="tile" id='tile-${w}-${h}'><p>${card}</p></div></div>`

            if (card == "start-1"){
                tile = `<div><div class="tile p1" id='tile-${w}-${h}'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M420-80v-280H320v-240q0-33 23.5-56.5T400-680h160q33 0 56.5 23.5T640-600v240H540v280H420Zm60-640q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720Z"/></svg></div></div>`
            
            }else if (card == "start-2"){
                tile = `<div><div class="tile p2" id='tile-${w}-${h}'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M420-80v-280H320v-240q0-33 23.5-56.5T400-680h160q33 0 56.5 23.5T640-600v240H540v280H420Zm60-640q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720Z"/></svg></div></div>`
            
            }

            row.push(tile)
        }

        board.push(row)
    }

    return board
}

let generate_shuffled_deck = (cards) =>{
    let deck = []

    Object.keys(cards).forEach(card_key =>{
        for (let i = 0; i < cards[card_key]; i++){
            deck.push(card_key)
        }
    })

    deck.push("start-1", "start-2")

    return shuffle_deck(deck)
}

let shuffle_deck = (deck) => {
    
    let deck_length = deck.length
    let shuffled_deck = []

    for (let i = 0; i < deck_length; i++){
        let random_index = Math.floor(Math.random() * deck.length)
        shuffled_deck.push(deck.splice(random_index, 1)[0])
    }

    return shuffled_deck

}