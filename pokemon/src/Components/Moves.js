import { useState, useEffect } from "react";
import BattlePage from "../Pages/BattlePage";
import "./Moves.css";

const Moves = (pokemon) => {
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
            };
          })
          .catch(console.error);
      }

      setTimeout(() => {
        setPokemonMoves(newPokemonMoves);
      }, 500);
      return newPokemonMoves;
    } else {
      console.log("loading");
      return [];
    }
  }

  useEffect(() => {
    getMoves();
  }, [pokemon]);

  const allMovesFunction = () => {
    return (
      <>
        <div className="moveLine">
          {pokemonMoves[0] ? (
            <p>
              {pokemonMoves[0].moveName} {pokemonMoves[0].moveType}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[1] ? (
            <p>
              {pokemonMoves[1].moveName} {pokemonMoves[1].moveType}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[2] ? (
            <p>
              {pokemonMoves[2].moveName} {pokemonMoves[2].moveType}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[3] ? (
            <p>
              {pokemonMoves[3].moveName} {pokemonMoves[3].moveType}
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

  return <div className="moves-container">{allMoves}</div>;
};

export default Moves;
