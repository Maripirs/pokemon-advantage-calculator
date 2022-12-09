import { useState, useEffect } from "react";
import "./Moves.css";
import MovesDetails from "./MovesDetails";
import TypeColors from "./TypeColors";

const Moves = (props) => {
  const [pokemonMoves, setPokemonMoves] = useState([]);

  function getMoves() {
      let newPokemonMoves = [...pokemonMoves];
      for (let i = 0; i < 4; i++) {
        const randomMoveIndex = Math.floor(
          Math.random() * props.pokemon.moves.length
          );

          let movesURL = props.pokemon.moves[randomMoveIndex].move.url;
          fetch(movesURL)
          .then((response) => response.json())
          .then((response) => {
            newPokemonMoves[i] = {
              moveName: response.name,
              moveType: response.type.name,
              moveID: response.id,
            };
            props.pokemonState.updatePokemonMoveTypes(props.index, response.type.name, i);
          })
          .catch(console.error);
        }
        setTimeout(()=>{
          setPokemonMoves(newPokemonMoves)
        }, 900)

  }

  useEffect(() => {
    if (props.pokemon && props.pokemon){
      getMoves();
    }
  }, [props.pokemon]);


  const { GetDetails } = MovesDetails();

  const handleClick = (e) => {
    GetDetails(e.target.closest(".move-row").id, props.pokemonState);
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
          <div className="type" style={{backgroundColor: `${TypeColors[pokemonMoves[i].moveType]}`}} >
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
