import { useState, useEffect } from "react"
import "./Results.css"


const Results = (pokemonInBattle) => {
    let pokemon1Score = 0
    let pokemon2Score = 0

    const [pokemonTypes, setPokemonTypes] = useState([[],[]])
    const [pokemonScores, setPokemonScores] = useState(null)
    //Might be usefull if we have async problems. Lets us know if we have all the information we need to proceed with calculations
    const [doneWithPokemon, setDoneWithPokemon] = useState(false)
    //Used to display results
    const [buttonClicked, setButtonClicked] = useState(false)

    //Will collect the pokemon types for both pokemon
    //Nothe that some pokemon have dual types
    let fetchPokemonTypes = () =>{
        if(pokemonInBattle[0].pokemonObject && pokemonInBattle[1].pokemonObject){
            let newPokemonTypes = [...pokemonTypes]
            for (let i = 0; i < 2 ; i++){   
                for (let j = 0; j < pokemonInBattle[i].pokemonObject.types.length; j++){
                    fetch(`${pokemonInBattle[i].pokemonObject.types[j].type.url}`)
                    .then((res) => res.json())
                    .then((res) => {
                        newPokemonTypes[i][j] = res
                        setPokemonTypes(newPokemonTypes)
                    })
                    .catch(console.error);
                }
            }  
        }
    }

    //Unsure if timeout is needed
    //fetching pokemon types only when pokemonInBattle value is updated
    useEffect(() =>{
        setTimeout(()=>{
            if(pokemonInBattle[0].pokemonObject && pokemonInBattle[1].pokemonObject){
                fetchPokemonTypes()
            }
        }, 200)
    }, [pokemonInBattle])

    

    const calculatePokemon1Score = () =>{
        pokemon1Score = 0
        //Looping 4 times, one for each move
        for (let j = 0; j < 4; j++){
            //setting up modifiers in case pokemon has dual type. In which case each move will be calculated twice and then multiplied. both start with a default value of 1
            let modifiers = [1 , 1] 
            //looping once per type in the pokemon (most cases will only run once)
            for (let i = 0 ; i < pokemonTypes[1].length; i++){
                //If the pokemon we are attacking recieves double damage from this move type, set modifier to 2
                if (pokemonTypes[1][i].damage_relations.double_damage_from.some(e=> e.name === pokemonInBattle[0].pokemonMovesTypes[j])){
                    modifiers[i] = 2
                //If the pokemon we are attacking recieves half damage from this move type, set modifier to 0.5
                } else if (pokemonTypes[1][i].damage_relations.half_damage_from.some(e=> e.name === pokemonInBattle[0].pokemonMovesTypes[j])){
                    modifiers[i] = 0.5
                //If the pokemon we are attacking recieves no damage from this move type, set modifier to 0
                } else if (pokemonTypes[1][i].damage_relations.no_damage_from.some(e=> e.name === pokemonInBattle[0].pokemonMovesTypes[j])){
                    modifiers[i] = 0
                }
            }
            console.log('move', j+1 , ": score ", modifiers[0]*modifiers[1])
            //Will add this move's value to the pokemon score
            pokemon1Score += (modifiers[0]*modifiers[1])
        }
        console.log("pokemon1 Score", pokemon1Score)
        return pokemon1Score
    }

    const calculatePokemon2Score = () =>{
        pokemon2Score = 0
        for (let j = 0; j < 4; j++){
            let modifiers = [1,1]
            for (let i = 0 ; i < pokemonTypes[1].length; i++){
                if (pokemonTypes[0][i].damage_relations.double_damage_from.some(e=> e.name === pokemonInBattle[1].pokemonMovesTypes[j])){
                    modifiers[i] = 2
                } else if (pokemonTypes[0][i].damage_relations.half_damage_from.some(e=> e.name === pokemonInBattle[1].pokemonMovesTypes[j])){
                    modifiers[i] = 0.5

                } else if (pokemonTypes[0][i].damage_relations.no_damage_from.some(e=> e.name === pokemonInBattle[1].pokemonMovesTypes[j])){
                    modifiers[i] = 0
                }

            }
            console.log('move', j+1 , ": score ", modifiers[0]*modifiers[1])
            pokemon2Score += (modifiers[0]*modifiers[1])
        }
        console.log("pokemon2 Score", pokemon2Score)
        return pokemon2Score
    }


    useEffect(() =>{
        setTimeout(()=>{

            if (pokemonInBattle[0].pokemonObject){
                pokemon1Score = calculatePokemon1Score()
                pokemon2Score = calculatePokemon2Score()
                setPokemonScores([pokemon1Score, pokemon2Score])
            }
        }, 200)
    }, [doneWithPokemon])

    const calculateAdvantage = () =>{
        if (pokemonScores[0] > pokemonScores[1]){
            return `${pokemonInBattle[0].pokemonObject.name} is at a type advantage`
        }else if (pokemonScores[0] < pokemonScores[1]){
            return `${pokemonInBattle[1].pokemonObject.name} is at a type advantage`
        } else{
            return `No pokemon has a type advantage`
        }
    }

    const RevealResults =() =>{
        setButtonClicked(true)
    }

    if(buttonClicked){
        return(
            <div className="results-container">
                <h3>Results will be here. We are working for you</h3>
                {/* <h3>Pokemon1 score is = {pokemonScores[0]}</h3>
                <h3>Pokemon2 score is = {pokemonScores[1]}</h3>
                <h3>{calculateAdvantage}</h3> */}
            </div>
        )
    } else{    
        return(
            <div className="results-container">
                <button onClick={RevealResults} >Reveal Results</button>
             </div>
        )
    }
}

export default Results;