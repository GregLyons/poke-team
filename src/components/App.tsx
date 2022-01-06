import { useState } from 'react';
import PokemonSearch from './PokemonSearch';
import PokemonTeam from './PokemonTeam/PokemonTeam';
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
    <>
      <PokemonSearch 
        addPokemonToTeam={addPokemonToTeam}
      />
      <PokemonTeam 
        pokemonList={pokemonTeam}
        removePokemonFromTeam={removePokemonFromTeam}
      />
    </>
  );
}

export default App;
