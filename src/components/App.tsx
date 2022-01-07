import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Planner from './Planner/Planner';
import PlannerPage from './Planner/EntityLists/PlannerPage';
import MoveList from './Planner/EntityLists/MoveList';

import Builder from './Builder/Builder';
import Analyzer from './Analyzer/Analyzer';

import { Pokemon } from '../typeDefs/Pokemon';

import './../styles/App.css';

function App() {
  const [pokemonTeam, setPokemonTeam] = useState<Pokemon[]>([]);

  const addPokemonToTeam = (pokemon: Pokemon) => {
    if (pokemonTeam.length < 6) setPokemonTeam(
      pokemonTeam.concat(pokemon)
    );
  }

  const removePokemonFromTeam = (idx: number) => {
    setPokemonTeam(
      pokemonTeam.filter((_: Pokemon, i: number) => idx !== i)
    );
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        {/* */}
        <Route path='/planner' element={
          <Planner  
            pokemonList={pokemonTeam}
            addPokemonToTeam={addPokemonToTeam}
            removePokemonFromTeam={removePokemonFromTeam}
          />
        }>
          {/* */}
          <Route path='abilities' element={<PlannerPage />}/>
          <Route path='items' element={<PlannerPage />}/>
          <Route path='moves' element={<MoveList />}/>

          {/* */}
          <Route path='effects' element={<PlannerPage />}/>
          <Route path='field-states' element={<PlannerPage />}/>
          <Route path='stats' element={<PlannerPage />}/>
          <Route path='statuses' element={<PlannerPage />}/>
          <Route path='types' element={<PlannerPage />}/>
          <Route path='usage-methods' element={<PlannerPage />}/>
        </Route>

        {/* */}
        <Route path='/builder' element={
          <Builder 
            pokemonList={pokemonTeam}
            addPokemonToTeam={addPokemonToTeam}
            removePokemonFromTeam={removePokemonFromTeam}
          />
        }/>

        {/* */}
        <Route path='/analyzer' element={
          <Analyzer 
            pokemonList={pokemonTeam}
            removePokemonFromTeam={removePokemonFromTeam}
          />
        }/>
      </Routes>
    </Router>
  );
}

export default App;
