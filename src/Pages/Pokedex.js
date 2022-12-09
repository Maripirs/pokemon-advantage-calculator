import { useState, useEffect } from "react";
import "./Pokedex.css";
import TypeColors from "../Components/TypeColors";
import TypeImg from "../Components/TypeImg";


const PokeDex = (props) => {
  const [poke, setPoke] = useState([]);
  const pokeData = [];

  //Function that fetches the Pokemon at each 151 URL's
  async function fetchPokemon() {

  //At each URL fetched, push it into a JSON.
    for (let i = 1; i <= 151; i++) {
      const pokeurl = `https://pokeapi.co/api/v2/pokemon/${i}`;
      pokeData.push(fetch(pokeurl).then((response) => response.json()));
    }

  //Wait for all data to be fetched then map through data and store in object.
    Promise.all(pokeData).then((data) => {
      const pokemon = data.map((pokeData) => ({
        name: pokeData.name,
        id: pokeData.id,
        image: pokeData.sprites.front_default,
        type: pokeData.types.map((pokeType) => pokeType.type.name).join(", "),
        types: pokeData.types,
      }));
      setPoke(pokemon);
    });
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (!poke) {
    return <p>Processing the Pokemon...</p>;
  }

  return (
    <div className="pokedex-container">
      {poke.map((eachPokemon) => {
        return (
          <div
            className="pokecard"
            style={{
              borderColor: `${TypeColors[eachPokemon.types[0].type.name]}`,
              backgroundImage: `url(${
                TypeImg[eachPokemon.types[0].type.name]
              })`,
            }}
          >
            <img className="pokemon-image bounce-1" src={eachPokemon.image} />

            <div className="pokedex-text-box">
              <h4 className="pokemon-name">
                {eachPokemon.id}.{" "}
                {eachPokemon.name.charAt(0).toUpperCase() +
                  eachPokemon.name.slice(1)}
              </h4>
              <p className="pokemon-type">
                Type:{" "}
                {eachPokemon.type.charAt(0).toUpperCase() +
                  eachPokemon.type.slice(1)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default PokeDex;
