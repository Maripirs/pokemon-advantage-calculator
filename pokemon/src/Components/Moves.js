import { useState, useEffect } from "react";
import BattlePage from "../Pages/BattlePage";
import "./Moves.css";

const Moves = (pokemon) => {

  //setting useState to empty array
  const [pokemonMoves, setPokemonMoves] = useState([]);

  //writing a function for getMoves
  function getMoves() {
    //if pokemon is true
    if (pokemon) {
      //let newPokemonMoves = the contents of pokemonMoves
      let newPokemonMoves = [...pokemonMoves];

      //for loop for 4 random moves
      for (let i = 0; i < 4; i++) {
        const randomMoveIndex = Math.floor(
          Math.random() * pokemon.moves.length
        );

        //setting the URL 
        let movesURL = pokemon.moves[randomMoveIndex].move.url;
        //fetching the URL with the variable
        fetch(movesURL)
          .then((response) => response.json())
          //response is each of the index at the loop
          .then((response) => {
            newPokemonMoves[i] = {
              moveName: response.name,
              moveType: response.type.name,
            };
          })
          .catch(console.error);
      }

      //delays setting newPokemonMoves to setPokemonMoves to let data generate
      setTimeout(() => {
        setPokemonMoves(newPokemonMoves);
      }, 500);
      return newPokemonMoves;
    } else {
      console.log("loading");
      return [];
    }
  }


//prevents the function from an infinite loop. only runs when the value/data pokemon changes
  useEffect(() => {
    getMoves();
  }, [pokemon]);






// const [allPokemonMoves, setAllPokemonMoves] = useState([])

// const arr = () => {
//   setAllPokemonMoves(pokemonMoves)
//   console.log("pokemonMoves", allPokemonMoves[0])
// }

// useEffect(() => {
//   arr()
// }, [])










  const allMovesFunction = () => {
    return (
      <>
        <div className="moveLine">
          {pokemonMoves[0] ? (
            <p>
              {pokemonMoves[0].moveName.charAt(0).toUpperCase() + pokemonMoves[0].moveName.slice(1)}, {pokemonMoves[0].moveType.charAt(0).toUpperCase() + pokemonMoves[0].moveType.slice(1)}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[1] ? (
            <p>
              {pokemonMoves[1].moveName.charAt(1).toUpperCase() + pokemonMoves[1].moveName.slice(1)}, {pokemonMoves[1].moveType.charAt(0).toUpperCase() + pokemonMoves[1].moveType.slice(1)}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[2] ? (
            <p>
              {pokemonMoves[2].moveName.charAt(0).toUpperCase() + pokemonMoves[2].moveName.slice(1)}, {pokemonMoves[2].moveType.charAt(0).toUpperCase() + pokemonMoves[2].moveType.slice(1)}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[3] ? (
            <p>
              {pokemonMoves[3].moveName.charAt(0).toUpperCase() + pokemonMoves[3].moveName.slice(1)}, {pokemonMoves[3].moveType.charAt(0).toUpperCase() + pokemonMoves[3].moveType.slice(1)}
            </p>
          ) : (
            "loading..."
          )}
        </div>
      </>
    );
  };

  const [allMoves, setAllMoves] = useState("");




  useEffect(() => {
    console.log("function", pokemonMoves);
    if (pokemonMoves) {
      setAllMoves(allMovesFunction());
    }
  }, [pokemonMoves]);






  return (
  <div className="moves-container">
    {allMoves}
  </div>)
};

export default Moves;
