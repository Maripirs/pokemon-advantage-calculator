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
    console.log(e.target.closest(".move-row"))
    setClicked(true);
    GetDetails(e.target.closest(".move-row").id, pokemonState);
  };

  const allMovesFunction = () => {
    let movesArray = [];
    for (let i = 0; i < 4; i++) {
      movesArray[i] = pokemonMoves[i] ? (
        <div className="move-row" onClick={handleClick} id={pokemonMoves[i].moveID}>
          <div className="move-name">
            {pokemonMoves[i].moveName.charAt(0).toUpperCase() +
              pokemonMoves[i].moveName.slice(1)}
          </div>
          <div className="type">
            {pokemonMoves[i].moveType.charAt(0).toUpperCase() +
              pokemonMoves[i].moveType.slice(1)}
          </div>
        </div>
      ) : (
        "loading..."
      );
    }

    return (
      <>
          {movesArray[0]}
          {movesArray[1]}
          {movesArray[2]}
          {movesArray[3]}
      </>
    );
  };

  const [allMoves, setAllMoves] = useState("");

  useEffect(() => {
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
