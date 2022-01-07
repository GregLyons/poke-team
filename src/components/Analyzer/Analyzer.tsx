import { Pokemon } from '../../typeDefs/Pokemon';

import AnalyzerPokemonTeam from './PokemonTeam/AnalyzerPokemonTeam';

type AnalyzerProps = {
  pokemonList: Pokemon[]
  removePokemonFromTeam: (idx: number) => void
}

const Analyzer = ({ pokemonList, removePokemonFromTeam }: AnalyzerProps) => {
  return (
    <AnalyzerPokemonTeam 
      pokemonList={pokemonList}
      removePokemonFromTeam={removePokemonFromTeam}
    />
  );
}
export default Analyzer;