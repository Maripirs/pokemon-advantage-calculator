import { useState, useEffect } from "react";
import "./Results.css";
import TypeColors from "./TypeColors";

const Results = (pokemonInBattle, pokemonState) => {
  let pokemon1Score = 0;
  let pokemon2Score = 0;
  // console.log(pokemonInBattle)
  const [pokemonTypes, setPokemonTypes] = useState([[], []]);
  const [buttonClicked, setButtonClicked] = useState(false);

  //Will collect the pokemon types for both pokemon
  //Nothe that some pokemon have dual types
  let fetchPokemonTypes = () => {
    if (pokemonInBattle[0].pokemonObject && pokemonInBattle[1].pokemonObject) {
      console.log("fetching pokemon types");
      let newPokemonTypes = [...pokemonTypes];
      for (let i = 0; i < 2; i++) {
        for (
          let j = 0;
          j < pokemonInBattle[i].pokemonObject.types.length;
          j++
        ) {
          fetch(`${pokemonInBattle[i].pokemonObject.types[j].type.url}`)
            .then((res) => res.json())
            .then((res) => {
              newPokemonTypes[i][j] = res;
              setPokemonTypes(newPokemonTypes);
            })
            .catch(console.error);
        }
      }
    }
  };

  //Unsure if timeout is needed
  //fetching pokemon types only when pokemonInBattle value is updated
  useEffect(() => {
    if (pokemonInBattle[0].pokemonObject && pokemonInBattle[1].pokemonObject) {
      fetchPokemonTypes();
    }
    setTimeout(() => {}, 200);
  }, [pokemonInBattle]);

  const calculatePokemonScore = (att, def) => {
    let pokemonScore = 0;
    //Looping 4 times, one for each move
    for (let j = 0; j < 4; j++) {
      //setting up modifiers in case pokemon has dual type. In which case each move will be calculated twice and then multiplied. both start with a default value of 1
      let modifiers = [1, 1];
      //looping once per type in the pokemon (most cases will only run once)
      for (let i = 0; i < pokemonTypes[def].length; i++) {
        //If the pokemon we are attacking recieves double damage from this move type, set modifier to 2
        if (
          pokemonTypes[def][i].damage_relations.double_damage_from.some(
            (e) => e.name === pokemonInBattle[att].pokemonMovesTypes[j]
          )
        ){
          modifiers[i] = 2;
          //If the pokemon we are attacking recieves half damage from this move type, set modifier to 0.5
        } else if (
          pokemonTypes[def][i].damage_relations.half_damage_from.some(
            (e) => e.name === pokemonInBattle[att].pokemonMovesTypes[j]
          )
        ) {
          modifiers[i] = 0.5;
          //If the pokemon we are attacking recieves no damage from this move type, set modifier to 0
        } else if (
          pokemonTypes[def][i].damage_relations.no_damage_from.some(
            (e) => e.name === pokemonInBattle[att].pokemonMovesTypes[j]
          )
        ) {
          modifiers[i] = 0;
        }
      }

      //Will add this move's value to the pokemon score
      pokemonScore += modifiers[0] * modifiers[1];
    }

    return pokemonScore;
  };

  const calculateAdvantage = () => {
    if (pokemon1Score > pokemon2Score) {
      pokemonState.updateWinner(pokemonInBattle[0].pokemonObject);
      return `${
        pokemonInBattle[0].pokemonObject.name.charAt(0).toUpperCase() +
        pokemonInBattle[0].pokemonObject.name.slice(1)
      } is at a type advantage`;
    } else if (pokemon1Score < pokemon2Score) {
      pokemonState.updateWinner(pokemonInBattle[1].pokemonObject);
      return `${
        pokemonInBattle[1].pokemonObject.name.charAt(0).toUpperCase() +
        pokemonInBattle[1].pokemonObject.name.slice(1)
      } is at a type advantage`;
    } else {
      return `No pokemon has a type advantage`;
    }
  };
  let [resultText, setResultText] = useState("");

  const RevealResults = () => {
    setButtonClicked(true);
    if (pokemonInBattle[0].pokemonObject) {
      pokemon1Score = calculatePokemonScore(0, 1);
      pokemon2Score = calculatePokemonScore(1, 0);
      console.log(pokemonState);
      pokemonState.updateScore(pokemon1Score, 0);
      pokemonState.updateScore(pokemon2Score, 1);
      setResultText(calculateAdvantage());
    }
  };

  if (buttonClicked) {
    return (
      <>
        {pokemonInBattle[2].pokemonAtAdvantage ? (
          <div className="winner-div">
            <img
              className="sparkles1"
              src="https://i.pinimg.com/originals/68/8e/9e/688e9eb45c2f5cc82361d5c305ccc0ca.gif"
            />
            <div
              className="winner-img-div"
              style={{
                backgroundImage: `url( ${pokemonInBattle[2].pokemonAtAdvantage.sprites.front_default})`,
              }}
            ></div>
            <img
              className="sparkles2"
              src="https://i.pinimg.com/originals/68/8e/9e/688e9eb45c2f5cc82361d5c305ccc0ca.gif"
            />
          </div>
        ) : (
          <></>
        )}
        <h3
          className="text-result"
          style={
            pokemonInBattle[2].pokemonAtAdvantage
              ? {
                  color: `${
                    TypeColors[
                      pokemonInBattle[2].pokemonAtAdvantage.types[0].type.name
                    ]
                  }`,
                }
              : { visibility: "show" }
          }
        >
          {resultText}
        </h3>
      </>
    );
  } else {
    return <button onClick={RevealResults}>Reveal Results</button>;
  }
};

export default Results;
