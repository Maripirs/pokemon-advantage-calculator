import Moves from "./Moves";
import BattlePage from "../Pages/BattlePage";
import "./Card.css"



const Card = (pokemon) => {

const pokeMoves = Moves(pokemon)

    return (
        <div className="cards-container">
            
            <div className="card-top">
                <h3>{pokemon ? `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}` :"loading..."}</h3>
            </div>

            <div className="img">
                <h3>{pokemon ? <img src={pokemon.sprites.front_default}/> :"loading..."}</h3>
            </div>

            {pokeMoves}

        </div>
    )
}

export default Card;