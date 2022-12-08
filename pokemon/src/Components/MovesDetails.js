import Moves from "./Moves";
import "./MovesDetails.css";
import { useEffect, useState } from "react";

const MovesDetails = () => {

  const GetDetails = (clicked, updateSomething) => {

        let moveAccuracy = "";
        let movePower = "";
        let movePP = "";

      const fetchID = () => {
        const id = clicked;
        fetch(`https://pokeapi.co/api/v2/move/${id}`)
          .then((response) => response.json())
          .then((response) => {
            console.log("setMoveId", response);
          moveAccuracy = (response.accuracy);
          movePower = (response.power);
          movePP = (response.pp)
          })
          .catch(console.error);
      };

        fetchID();
 
        setTimeout(() => {
          console.log("clicked", clicked)
            updateSomething([moveAccuracy + ", " + movePP + ", " + movePower])
        }, 500)
    //   return (
    //     <>
    //   <p>{moveAccuracy}</p>
    //   <p>{movePower}</p>
    //   <p>{movePP}</p>
    //   <p>"We passed"</p>
    //     </>
    //   );
  };
  return { GetDetails };
};
export default MovesDetails;
