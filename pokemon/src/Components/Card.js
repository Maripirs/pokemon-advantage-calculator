import Moves from "./Moves";
import "./Card.css";

const Card = (pokemon, pokemonState, index) => {
  let pokeMoves = Moves(pokemon, pokemonState, index);

  return (
    <div className="cards-container">
      <div className="card-top">
        <h3 className="card-name">
          {pokemon
            ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            : "loading..."}
        </h3>
        <div className="type-container">
          <div className="type">
            <p className="type-text">
              {pokemon
                ? pokemon.types[0].type.name.charAt(0).toUpperCase() +
                  pokemon.types[0].type.name.slice(1)
                : "loading..."}{" "}
            </p>
          </div>
          {pokemon ? 
              pokemon.types[1] ?  
                <div className="type">
                  <p className="type-text">
                    {pokemon.types[1].type.name.charAt(0).toUpperCase() +
                          pokemon.types[1].type.name.slice(1)}
                  </p>
                </div>
        : <p></p>
        : <p></p>}
        </div>
      </div>

      <div className="img-container">
          {pokemon ? (
            <img className="pokemon-img" src={pokemon.sprites.front_default} />
          ) : (
            "loading..."                                 
          )}
      </div>
      {pokeMoves}
    </div>
  );
};

export default Card;
