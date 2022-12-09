import { Link } from "react-router-dom";
import BattlePage from "../Pages/BattlePage";
import PokeDex from "../Pages/Pokedex";
import "./Nav.css"

const Nav = (props) => {
    return(
        <div className="nav-container">
            <Link className="link" to="/battlepage"><p>Battle Page</p></Link>
            <Link className="link" to="/pokedex"><p>PokeDex</p></Link>
        </div>
    )  
}

export default Nav;