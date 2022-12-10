
import "./MovesDetails.css";
import TypeColors from "./TypeColors";

const MovesDetails = () => {
  const GetDetails = (clicked, pokemonState) => {

    let allListDetails = null
    pokemonState.updateDetails(<p>loading...</p>)
    debugger
    const fetchID = () => {
      const id = clicked;
      fetch(`https://pokeapi.co/api/v2/move/${id}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          allListDetails = 
            <div className='detail-wrap' style={{backgroundColor:  `${TypeColors[response.type.name]}`}}>  
                <h2 className="selected-move">{response.name.charAt(0).toUpperCase() + response.name.slice(1)}</h2>
                <div className="info-row">
                    <p className="key-title">Move Accuracy:</p> 
                    <p className="key-value">{response.accuracy ? response.accuracy:"N/A"}</p>
                </div>
                <div className="info-row">
                    <p className="key-title">Move Power:</p> 
                    <p className="key-value">{response.power ? response.power:"N/A"}</p>
                </div>
                <div className="info-row">
                    <p className="key-title">Move PP:</p> 
                    <p className="key-value">{response.pp ? response.pp:"N/A"}</p>
                </div>
            </div>
          pokemonState.updateDetails(allListDetails)
                
        })
        .catch(console.error);
    };

    fetchID();

  };
  return { GetDetails };
};
export default MovesDetails;
