import "./App.css";
import BattlePage from "./Pages/BattlePage";
import { Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Main from "./Pages/Main";
import PokeDex from "./Pages/Pokedex";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" id="title-link">
          <div className="page-title">Pokémon Advantage Calculator</div>
        </Link>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/battlepage/" element={<BattlePage />} />
          <Route path="/pokedex/" element={<PokeDex />} />
        </Routes>
      </main>
      <footer>
            <p>No copyright infringement intended. This site may contain content not authorized use by it's owner.</p>
            <p>All data and imagery provided by <a href="https://pokeapi.co/">PokeAPI</a> and <a href="https://www.deviantart.com/phoenixoflight92">PhoenixOfLight92 Deviant Art</a>
            </p>
        </footer>
      
    </div>
  );
}

export default App;
