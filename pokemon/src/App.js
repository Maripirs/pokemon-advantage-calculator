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
    </div>
  );
}

export default App;
