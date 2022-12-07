import Moves from "./Moves";
import { useEffect, useState } from "react"
import BattlePage from "../Pages/BattlePage";
import "./Card.css";

//Writing a function called Card that takes in the pokemon
const Card = (pokemon) => {

    // if(!pokemon){
    //     console.log("loading")
    // } else {
    //     console.log(pokemon.moves)
    // }

    let pokeMoves = Moves(pokemon)
    


  return (
    <div className="cards-container">
      <div className="card-top">
        <h3>
{/*  this is the pokemon name */}
          {pokemon
            ? `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`
            : "loading..."}
        </h3>
      </div>

      <div className="img">
        <h3>
{/* this is the pokemon image */}
          {pokemon ? <img src={pokemon.sprites.front_default} /> : "loading..."}
        </h3>
      </div>
{/* if pokeMoves exists, then run pokeMoves */}
      {pokeMoves}
    </div>
  );
};

export default Card;
