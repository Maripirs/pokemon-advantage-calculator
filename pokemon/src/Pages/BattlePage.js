import Card from "../Components/Card";
import Results from "../Components/Results";
import "./BattlePage.css";
import { useState, useEffect } from "react"

    //Setting use state for pokemon 1 and 2
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

    //set initialState for 2 empty pokemon 
  const initialState = [
    {
      pokemonObject: null, //Pokemon Obj
      pokemonMovesTypes: [null, null, null, null] //4 type strings
    },
    {
      pokemonObject: null,
      pokemonMovesTypes: [null, null, null, null]
    },
    {
      details: null
    }
  ]


  const [pokemonInBattle, setPokemonInBattle] = useState(initialState)

  const updatePokemonMoveTypes = (pokemonInd, moveToAdd, moveInd) =>{
    let newPokemonInBattle = [...pokemonInBattle]
    newPokemonInBattle[pokemonInd].pokemonMovesTypes[moveInd] = moveToAdd
    setPokemonInBattle(newPokemonInBattle)
  }
  
  const pokemonState = [pokemonInBattle, updatePokemonMoveTypes]

  
  //Calculating 2 random ID for the first 151 pokemon
  const id1 = Math.ceil(Math.random() * 151);
  const id2 = Math.ceil(Math.random() * 151);
  
  //Fetch the pokemon 1
  const fetchPokemon1 = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id1}`)
    .then((response) => response.json())
    .then((response) => {
      // console.log("res JSON", response);
      setPokemon1(response);
      let newPokemonInBattle = [...pokemonInBattle]
      newPokemonInBattle[0].pokemonObject = response
      setPokemonInBattle(newPokemonInBattle)
      })
      .catch(console.error);
  };

  //Fetch the pokemon 2
  const fetchPokemon2 = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id2}`)
      .then((response) => response.json())
      .then((response) => {
        // console.log("res JSON", response);
        setPokemon2(response);
        let newPokemonInBattle = [...pokemonInBattle]
        newPokemonInBattle[1].pokemonObject = response
        setPokemonInBattle(newPokemonInBattle)
      })
      .catch(console.error);
  };

  //Running the useEffect
  useEffect(() => {
    fetchPokemon1()
    fetchPokemon2()
}, [])

const card1 = Card(pokemon1, pokemonState, 0)
const card2 = Card(pokemon2, pokemonState, 1)

const resultsDiv = Results(pokemonInBattle) 

  return (
    <>
      <div className="battle-container">
        {card1}
        <h3>VS.</h3>
        {card2}
      </div>
      {resultsDiv}
    </>
  );;

export default BattlePage;
