Components:

App:
Import Battle Page
Import Routes, Route
Write the function for App{
    Return(
        <Header> 
            Pokemon Advantage Calculator
        <Header> 
        <Main>
            <Routes />
                <Route "/" of Battle Page/>

            <Routes />
        <Main>

    )
}
export default App;



Results Component:
Import useState, useEffect
Write function for calculating results{
    Pokemon1Score = 0
    Pokemon2Score = 0
    For loop 4 times for moves for Pokemon 1{
        if (Pokemon2.doubledamage.includes(Pokemon1.move[i].type){
            Pokemon1Score += 2
        } else if (Pokemon2.halfdamage.includes(Pokemon1.move[i].type){
            Pokemon1Score += 0.5
        } else if ( Pokemon2.nodamage.includes(Pokemon1.move[i].type) {
            Pokemon1Score += 0
        } else {
            Pokemon1Score += 1
        }
    } 

    For loop 4 times for moves for Pokemon 2{
        if (Pokemon1.doubledamage.includes(Pokemon2.move[i].type){
            Pokemon1Score += 2
        } else if (Pokemon1.halfdamage.includes(Pokemon2.move[i].type){
            Pokemon2Score += 0.5
        } else if ( Pokemon1.nodamage.includes(Pokemon2.move[i].type) {
            Pokemon2Score += 0
        } else {
            Pokemon2Score += 1
        }
    }

    if( Pokemon1Score > Pokemon2Score){
        return <p>"Pokemon1.name has type advantage over Pokemon2.name"<p>
    } else if ( Pokemon2Score > Pokemon1Score){
        return <p>"Pokemon2.name has type advantage over Pokemon1.name"<p>
    } else {
        return <p>"No advantage."<p>
    }


Write the function for Results (props) {
    if(button click === false){
        return button
    } else {
        return results
    }

}







Pokemon Cards Component:
Import Moves Component
Write the function for Cards (props){
    const PokemonMoves = Moves(pokemon)
    Return( 
        <div className="card">
            <div className="cardTop">
                <div className="name">{props.pokemon.name}</div>
                <div className="type">{props.pokemon.type}</div>
            </div>
            <div className="img">
                <img src="{prop.pokemon.img}"/>
            </div>
            {PokemonMoves}
        </div>
    )
}
export default Cards;


Moves Component:
Import
Write function for moves (pokemon) {
    
    const [selectedMoves, setSelectedMoves] = useState([])
    let randomMovesID = []
    
    function pickRandomMoves(){
        For loop 4 times{
            At the end of each loop, randomMovesID.push() into array
        }
    }
    
    function fetchRandomMoves(){
        for loop 4 times{
            fetch(https://pokeapi.co/api/v2/move/${randomMovesId[i]})
            update selectedMoves[i] to match with object fetched
            setSelectedMoves(something)
        }
    }

    useEffect(){
        fetchRandomMoves()
    }

    Return(
        <div className="moves">
            <div className="moveLine" id="move1">
                <div className="move">{SelectedMoves[0].name}</div>
                <div className="type">{SelectedMoves[0].type}</div>
            </div>
            <div className="moveLine" id="move2">
                <div className="move">{SelectedMoves[1].name}</div>
                <div className="type">{SelectedMoves[1].type}</div>
            </div>
            <div className="moveLine" id="move3">
                <div className="move">{SelectedMoves[2].name}</div>
                <div className="type">{SelectedMoves[2].type}</div>
            </div>
            <div className="moveLine" id="move4">
                <div className="move">{SelectedMoves[3].name}</div>
                <div className="type">{SelectedMoves[3].type}</div>
            </div>
        </div>
    )
}


Battle Page:
Import Routes
Import the Pokemon Card and Results Components
Write the function of the battle{
    Setting useState for Pokemon 1
    Setting useState for Pokemon 2
    Calculate random ID for pokemon
    Fetch random pokemon 1 from API with random ID
         Update states for Pokemon 1
    Fetch random pokemon 2 from API with random ID
        Update states for Pokemon 2
    Run useEffect once
    Return what the page looks like within HTML(
        Pokemon 1
        vs text
        Pokemon 2
    )
}
Export default Battle