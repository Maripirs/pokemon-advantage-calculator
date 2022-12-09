import './App.css';
import BattlePage from './Pages/BattlePage';
import { Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Main from './Pages/Main';
import PokeDex from './Pages/Pokedex';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Pokémon Advantage Calculator
      <Nav/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/battlepage/" element={<BattlePage/>} />
          <Route path="/pokedex/" element={<PokeDex/>} />
        </Routes>
        
      </main>
    </div>
  );
}

export default App;
