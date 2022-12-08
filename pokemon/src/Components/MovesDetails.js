import Moves from "./Moves";
import "./MovesDetails.css";
import { useEffect, useState } from "react";

const MovesDetails = () => {

  const GetDetails = (clicked, updateListDetails) => {

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
            updateListDetails([moveAccuracy + "/" + movePower + "/" +  movePP])
        }, 500)

  };
  return { GetDetails };
};
export default MovesDetails;
