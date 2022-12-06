import Card from "../Components/Card";
import Results from "../Components/Results";
import "./BattlePage.css"

const BattlePage = () => {



    
 return(
    <>
        <div className="battle-container">
            <Card/>
            <h3>VS.</h3>
            <Card/>
        </div>
        <Results/>
    </>
 )

}

export default BattlePage;