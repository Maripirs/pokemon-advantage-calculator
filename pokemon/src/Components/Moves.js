import { useState, useEffect } from "react";
import BattlePage from "../Pages/BattlePage";
import "./Moves.css";
import MovesDetails from "./MovesDetails";

const Moves = (pokemon, pokemonState, index) => {

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
              moveID: response.id
            }
            let pokemonInBattle = pokemonState[0]
            pokemonState[1](index, response.type.name, i)

          })
          .catch(console.error);
      }

      //delays setting newPokemonMoves to setPokemonMoves to let data generate
      setTimeout(() => {
        setPokemonMoves(newPokemonMoves);
        console.log("newpokemonMoves", newPokemonMoves)
        console.log("pokemonmoves", pokemonMoves)
      }, 1000);
    } else {
      console.log("loading");
    }
  }


//prevents the function from an infinite loop. only runs when the value/data pokemon changes
  useEffect(() => {
    getMoves();
  }, [pokemon]);



const [clicked, setClicked] = useState(false)
const [something, setSomething] = useState(null)
const { GetDetails } = MovesDetails()


const updateSomething = (details) => {
    let newSomething = details
    setSomething(newSomething)

}

const handleClick = (e) => {
  setClicked(true)
  GetDetails(e.target.id, updateSomething)
}


  const allMovesFunction = () => {
    return (
      <>
        <div className="moveLine">
          {pokemonMoves[0] ? (
            <p onClick={handleClick} id={pokemonMoves[0].moveID}>
              {pokemonMoves[0].moveName.charAt(0).toUpperCase() + pokemonMoves[0].moveName.slice(1)}, {pokemonMoves[0].moveType.charAt(0).toUpperCase() + pokemonMoves[0].moveType.slice(1)}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[1] ? (
            <p onClick={handleClick} id={pokemonMoves[1].moveID}>
              {pokemonMoves[1].moveName.charAt(0).toUpperCase() + pokemonMoves[1].moveName.slice(1)}, {pokemonMoves[1].moveType.charAt(0).toUpperCase() + pokemonMoves[1].moveType.slice(1)}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[2] ? (
            <p onClick={handleClick} id={pokemonMoves[2].moveID}>
              {pokemonMoves[2].moveName.charAt(0).toUpperCase() + pokemonMoves[2].moveName.slice(1)}, {pokemonMoves[2].moveType.charAt(0).toUpperCase() + pokemonMoves[2].moveType.slice(1)}
            </p>
          ) : (
            "loading..."
          )}
        </div>
        <div className="moveLine">
          {pokemonMoves[3] ? (
            <p onClick={handleClick} id={pokemonMoves[3].moveID}>
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
  <>
    <div className="moves-container">
      {allMoves}
    </div>
    
    <div className="moves-details"> 
    {something ? something[0] : "hello.."}
    {something ? something[1] : "hello.."}
    {something ? something[2] : "hello.."}
    </div>  
  </>
  
  )
};

export default Moves;
