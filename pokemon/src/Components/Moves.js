import { useState, useEffect } from "react";
import BattlePage from "../Pages/BattlePage";
import "./Moves.css";
import MovesDetails from "./MovesDetails";

const Moves = (pokemon, pokemonState, index) => {

  const [pokemonMoves, setPokemonMoves] = useState([]);


  function getMoves() {

    if (pokemon) {
      let newPokemonMoves = [...pokemonMoves];

      for (let i = 0; i < 4; i++) {
        const randomMoveIndex = Math.floor(
          Math.random() * pokemon.moves.length
        );

        let movesURL = pokemon.moves[randomMoveIndex].move.url;
        fetch(movesURL)
          .then((response) => response.json())
          .then((response) => {
            newPokemonMoves[i] = {
              moveName: response.name,
              moveType: response.type.name,
              moveID: response.id,
            };
            pokemonState[1](index, response.type.name, i);
          })
          .catch(console.error);
      }

      setTimeout(() => {
        setPokemonMoves(newPokemonMoves);
      }, 1000);
    } else {
      console.log("loading");
    }
  }


  useEffect(() => {
    getMoves();
  }, [pokemon]);

  const [clicked, setClicked] = useState(false);


  const { GetDetails } = MovesDetails();


  const handleClick = (e) => {
    setClicked(true);
    GetDetails(e.target.id, pokemonState);
  };

  const allMovesFunction = () => {
    return (
      <>
        <div className="moveLine">
          {pokemonMoves[0] ? (
            <p onClick={handleClick} id={pokemonMoves[0].moveID}>
              {pokemonMoves[0].moveName.charAt(0).toUpperCase() +
                pokemonMoves[0].moveName.slice(1)}
              ,{" "}
              {pokemonMoves[0].moveType.charAt(0).toUpperCase() +
                pokemonMoves[0].moveType.slice(1)}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[1] ? (
            <p onClick={handleClick} id={pokemonMoves[1].moveID}>
              {pokemonMoves[1].moveName.charAt(0).toUpperCase() +
                pokemonMoves[1].moveName.slice(1)}
              ,{" "}
              {pokemonMoves[1].moveType.charAt(0).toUpperCase() +
                pokemonMoves[1].moveType.slice(1)}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[2] ? (
            <p onClick={handleClick} id={pokemonMoves[2].moveID}>
              {pokemonMoves[2].moveName.charAt(0).toUpperCase() +
                pokemonMoves[2].moveName.slice(1)}
              ,{" "}
              {pokemonMoves[2].moveType.charAt(0).toUpperCase() +
                pokemonMoves[2].moveType.slice(1)}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[3] ? (
            <p onClick={handleClick} id={pokemonMoves[3].moveID}>
              {pokemonMoves[3].moveName.charAt(0).toUpperCase() +
                pokemonMoves[3].moveName.slice(1)}
              ,{" "}
              {pokemonMoves[3].moveType.charAt(0).toUpperCase() +
                pokemonMoves[3].moveType.slice(1)}
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
    <>
      <div className="moves-container">{allMoves}</div>
    </>
  );
};

export default Moves;
