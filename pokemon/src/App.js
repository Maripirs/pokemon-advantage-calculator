import './App.css';
import BattlePage from './Pages/BattlePage';
import { Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Pokémon Advantage Calculator
      <Nav/>
      </header>
      <main>
        <Routes>
          <Route path="/battlepage" element={<BattlePage/>} />
        </Routes>
        
      </main>
    </div>
  );
}

export default App;
