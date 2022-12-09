import { useState, useEffect } from "react";
import { json, Link } from "react-router-dom";
import PokedexCard from "./PokedexCard";
import BattlePage from "./BattlePage";
import "./Pokedex.css";

const PokeDex = (props) => {
  const [poke, setPoke] = useState([]);
  const pokeData = [];

  async function fetchPokemon() {
    for (let i = 1; i <= 151; i++) {
      const pokeurl = `https://pokeapi.co/api/v2/pokemon/${i}`;
      pokeData.push(fetch(pokeurl).then((response) => response.json()));
    }
    Promise.all(pokeData).then((data) => {
      const pokemon = data.map((pokeData) => ({
        name: pokeData.name,
        id: pokeData.id,
        image: pokeData.sprites.front_default,
        type: pokeData.types.map((pokeType) => pokeType.type.name).join(", "),
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
          <div className="pokecard">
            <img className="pokemon-image bounce-1" src={eachPokemon.image} />
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
        );
      })}
    </div>
  );
};
export default PokeDex;

// const [pokeDex, setPokeDex] = useState([]);
// // const [pokeURLArr, setPokeURLArr] = useState([])

// async function getPoke() {
//   for (let i = 1; i < 152; i++) {
//     await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
//       .then((response) => response.json())
//       .then((response) => {
//         setPokeDex(response.name);
//         let pokemonArr = [pokeDex]
//         console.log(poke)
//       });
//   }
// }

// useEffect(() => {
//   getPoke();
// }, []);

// return <>Hello</>;

// if(isLoading){
//   return (
//     <div className="container">
//       {pokeDex.map((poke) => {
//         <Link to={`/pokedex/${poke.name}`} key={poke.id}>
//           <div className="card">
//             <div className="card-image">
//               <img src={poke.sprites.front_default} alt={poke.name} />
//             </div>
//             <div className="card-title">
//               <h3>{poke.name}</h3>
//             </div>
//           </div>
//         </Link>;
//       })}
//       ;
//     </div>
//   )} else {
//     <p>Loading...</p>
//   }
// };
