import { useState, useEffect } from "react"
import "./Results.css"


const Results = (pokemonInBattle) => {
    let pokemon1Score = 0
    let pokemon2Score = 0
    // console.log(pokemonInBattle)
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
            console.log('fetching pokemon types')
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
        if(pokemonInBattle[0].pokemonObject && pokemonInBattle[1].pokemonObject){
            fetchPokemonTypes()

        }
        setTimeout(()=>{

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

            //Will add this move's value to the pokemon score
            pokemon1Score += (modifiers[0]*modifiers[1])
        }

        return pokemon1Score
    }

    const calculatePokemon2Score = () =>{

        pokemon2Score = 0
        for (let j = 0; j < 4; j++){
            let modifiers = [1,1]
            for (let i = 0 ; i < pokemonTypes[0].length; i++){
                if (pokemonTypes[0][i].damage_relations.double_damage_from.some(e=> e.name === pokemonInBattle[1].pokemonMovesTypes[j])){
                    modifiers[i] = 2
                } else if (pokemonTypes[0][i].damage_relations.half_damage_from.some(e=> e.name === pokemonInBattle[1].pokemonMovesTypes[j])){
                    modifiers[i] = 0.5

                } else if (pokemonTypes[0][i].damage_relations.no_damage_from.some(e=> e.name === pokemonInBattle[1].pokemonMovesTypes[j])){
                    modifiers[i] = 0
                }

            }

            pokemon2Score += (modifiers[0]*modifiers[1])
        }

        return pokemon2Score
    }



    const calculateAdvantage = () =>{
        if (pokemon1Score > pokemon2Score){
            return `${pokemonInBattle[0].pokemonObject.name.charAt(0).toUpperCase() + pokemonInBattle[0].pokemonObject.name.slice(1)} is at a type advantage`
        }else if (pokemon1Score < pokemon2Score){
            return `${pokemonInBattle[1].pokemonObject.name.charAt(0).toUpperCase() + pokemonInBattle[1].pokemonObject.name.slice(1)} is at a type advantage`
        } else{
            return `No pokemon has a type advantage`
        }
    }
    let [resultText, setResultText] = useState('')

    const RevealResults =() =>{
        setButtonClicked(true)
        if (pokemonInBattle[0].pokemonObject){
            pokemon1Score = calculatePokemon1Score()
            pokemon2Score = calculatePokemon2Score()
            setPokemonScores([pokemon1Score, pokemon2Score])


            setResultText(calculateAdvantage())

        }
    }

    if(buttonClicked){
        return(
                <>
                    <h3>{pokemonInBattle[0].pokemonObject.name.charAt(0).toUpperCase() + pokemonInBattle[0].pokemonObject.name.slice(1)} score is = {pokemonScores[0]}</h3>
                    <h3>{pokemonInBattle[1].pokemonObject.name.charAt(0).toUpperCase() + pokemonInBattle[1].pokemonObject.name.slice(1)} score is = {pokemonScores[1]}</h3>
                    <h1>{resultText}</h1>
                </>
        )
    } else{    
        return(
                <button onClick={RevealResults} >Reveal Results</button>

        )
    }
}

export default Results;