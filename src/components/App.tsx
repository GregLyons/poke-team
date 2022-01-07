import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Planner from './Planner/Planner';
import Builder from './Builder/Builder';
import Analyzer from './Analyzer/Analyzer';

import { Pokemon } from '../typeDefs/Pokemon';

import './../styles/App.css';

function App() {
  const [pokemonTeam, setPokemonTeam] = useState<Pokemon[]>([]);

  const addPokemonToTeam = (pokemon: Pokemon) => {
    console.log(pokemonTeam);
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
        <Route path='/planner' element={
          <Planner  
            pokemonList={pokemonTeam}
            addPokemonToTeam={addPokemonToTeam}
            removePokemonFromTeam={removePokemonFromTeam}
          />
        }/>
        <Route path='/builder' element={
          <Builder 
            pokemonList={pokemonTeam}
            addPokemonToTeam={addPokemonToTeam}
            removePokemonFromTeam={removePokemonFromTeam}
          />
        }/>
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
