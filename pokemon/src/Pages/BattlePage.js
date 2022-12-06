import Card from "../Components/Card";
import Results from "../Components/Results";
import "./BattlePage.css";
import { useState, useEffect } from "react"

const BattlePage = () => {
    //Setting use state for pokemon 1 and 2
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

    //Calculating 2 random ID for the first 151 pokemon
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

const card1 = Card(pokemon1)
const card2 = Card(pokemon2)


  return (
    <>
      <div className="battle-container">
        {card1}
        <h3>VS.</h3>
        {card2}
      </div>
      <Results />
    </>
  );
};

export default BattlePage;
