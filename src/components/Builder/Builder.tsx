import { Pokemon } from '../../typeDefs/Pokemon';

import BuilderPokemonTeam from './PokemonTeam/BuilderPokemonTeam';
import PokemonSearch from './PokemonSearch';

type BuilderProps = {
  pokemonList: Pokemon[]
  addPokemonToTeam: (pokemon: Pokemon) => void
  removePokemonFromTeam: (idx: number) => void
}


const Builder = ({ pokemonList, addPokemonToTeam, removePokemonFromTeam }: BuilderProps) => {
  return (
    <div className="builder-wrapper">
      <BuilderPokemonTeam 
        pokemonList={pokemonList}
        removePokemonFromTeam={removePokemonFromTeam}
      />
      
      <PokemonSearch 
        addPokemonToTeam={addPokemonToTeam}
      />
    </div>
  );
}
export default Builder;