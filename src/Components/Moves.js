import { useState, useEffect } from "react";
import "./Moves.css";
import MovesDetails from "./MovesDetails";
import TypeColors from "./TypeColors";

const Moves = (props) => {
  const [pokemonMoves, setPokemonMoves] = useState([]);
  //fetches 4 random moves from the options that the pokemon has
  function getMoves() {
    const promises = [];
    for (let i = 0; i < 4; i++) {
      const randomMoveIndex = Math.floor(
        Math.random() * props.pokemon.moves.length
      );

      let movesURL = props.pokemon.moves[randomMoveIndex].move.url;
      let promise = fetch(movesURL);
      promises.push(promise);
    }
    let responsesPromise = Promise.all(promises);
    responsesPromise.then((reponses) => {
      Promise.all(reponses.map((response) => response.json())).then(
        (movesData) => {
          const prettyMoves = movesData.map((data, index) => {
            props.pokemonState.updatePokemonMoveTypes(props.index, data.type.name, index);
            return {
              moveName: data.name,
              moveType: data.type.name,
              moveID: data.id,
            };
          });
        setPokemonMoves(prettyMoves)
        }
      );
    });
  }

  useEffect(() => {
    if (props.pokemon && props.pokemon) {
      getMoves();
    }
  }, [props.pokemon]);

  const { GetDetails } = MovesDetails();

  //Calling a function inside of the MovesDetails component to display details about the clicked move
  const handleClick = (e) => {
    GetDetails(e.target.closest(".move-row").id, props.pokemonState);
  };

  const allMovesFunction = () => {
    let movesArray = [];
    for (let i = 0; i < 4; i++) {
      movesArray[i] = pokemonMoves[i] ? (
        <div
          className="move-row"
          onClick={handleClick}
          id={pokemonMoves[i].moveID}
        >
          <div className="move-name">
            {pokemonMoves[i].moveName.charAt(0).toUpperCase() +
              pokemonMoves[i].moveName.slice(1)}
          </div>
          <div
            className="type"
            style={{
              backgroundColor: `${TypeColors[pokemonMoves[i].moveType]}`,
            }}
          >
            {pokemonMoves[i].moveType.charAt(0).toUpperCase() +
              pokemonMoves[i].moveType.slice(1)}
          </div>
        </div>
      ) : (
        <>{i === 2 ? "loading" : ""}</>
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
