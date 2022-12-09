import Moves from "./Moves";
import "./Card.css";
import TypeColors from "./TypeColors"
import { useState , useEffect } from "react";
import TypeImg from "./TypeImg";

const Card = (pokemon, pokemonState, index) => {
  const [colors, setColors] = useState(['red', 'blue'])

  useEffect(()=>{
    if (pokemon){
      let color1 = TypeColors[pokemon.types[0].type.name]
      let color2 = color1
      if (pokemon.types[1]){
        color2 = TypeColors[pokemon.types[1].type.name]
      }
      setColors([color1, color2])
    }
  }, [pokemon])

  return (
    <div className="card-score">
    <div className="cards-container" style={
      {
        background: `
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(to right, ${colors[0]} 50%, ${colors[1]} 50%) border-box
        `,
      color: `#313149`,
      padding: `1vh`,
      border: `1vh solid transparent`,
      borderRadius:`2vh`
      }}>
      <div className="card-top">
        <h3 className="card-name">
          {pokemon
            ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            : "loading..."}
        </h3>
        <div className="type-container">
          <div className="type" style={{backgroundColor:`${colors[0]}`}}>
            <p className="type-text">
              {pokemon
                ? pokemon.types[0].type.name.charAt(0).toUpperCase() +
                  pokemon.types[0].type.name.slice(1)
                : "loading..."}{" "}
            </p>
          </div>
          {pokemon ? 
              pokemon.types[1] ?  
                <div className="type" style={{backgroundColor:`${colors[1]}`}}>
                  <p className="type-text">
                    {pokemon.types[1].type.name.charAt(0).toUpperCase() +
                          pokemon.types[1].type.name.slice(1)}
                  </p>
                </div>
        : <p></p>
        : <p></p>}
        </div>
      </div>

      <div className="img-container" style = {pokemon ? {backgroundImage:`url(${TypeImg[pokemon.types[0].type.name]})`}: {backgroundImage:`url(${TypeImg.normal})`}}>
          {pokemon ? (
            <img className="pokemon-img" src={pokemon.sprites.front_default} />
          ) : (
            "loading..."                                 
          )}
      </div>
      <Moves pokemon={pokemon} pokemonState ={pokemonState} index = {index}/>
    </div>
    
    <div className= 'pokemon-score'>
      <h3 className= 'score-text'>Score : {pokemonState.pokemonInBattle[index].pokemonScore}</h3>
    </div>
    </div>
  );
};

export default Card;
