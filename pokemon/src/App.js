import './App.css';
import BattlePage from './Pages/BattlePage';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Pokémon Advantage Calculator
      </header>
      <main>
        <BattlePage/>
      </main>
    </div>
  );
}

export default App;
