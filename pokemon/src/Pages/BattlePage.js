import Card from "../Components/Card";
import Results from "../Components/Results";
import "./BattlePage.css";
import { useState, useEffect } from "react"

const BattlePage = () => {
    //Setting use state for pokemon 1 and 2
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

    //Calculating random ID for the first 151 pokemon
  const id1 = Math.ceil(Math.random() * 151);
  const id2 = Math.ceil(Math.random() * 151);

    //Fetch the pokemon 1
  const fetchPokemon1 = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id1}`)
      .then((response) => response.json())
      .then((response) => {
        console.log("res JSON", response);
        setPokemon1(response);
      })
      .catch(console.error);
  };

  //Fetch the pokemon 2
  const fetchPokemon2 = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id2}`)
      .then((response) => response.json())
      .then((response) => {
        console.log("res JSON", response);
        setPokemon2(response);
      })
      .catch(console.error);
  };

  //Running the useEffect
  useEffect(() => {
    fetchPokemon1()
    fetchPokemon2()
}, [])

let pokemon1name = {pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)};
let pokemon1image = 

  return (
    

    <>
      <div className="battle-container">

        <h3>{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</h3>
        <h3>{pokemon1 ? <img src={pokemon1.sprites.front_default}/> :"loading..."}</h3>
        <Card />

        <h3>VS.</h3>

        <h3>{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</h3>
        {pokemon2 ? <img src={pokemon2.sprites.front_default}/> :"loading..."}
        <Card />

      </div>
      <Results />
    </>
  );
};

export default BattlePage;
