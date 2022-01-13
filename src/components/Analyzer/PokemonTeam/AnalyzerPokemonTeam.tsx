import { Pokemon } from '../../../types-queries/Pokemon';
import AnalyzerPokemonTeamMember from './AnalyzerPokemonTeamMember';

type AnalyzerPokemonTeamProps = {
  pokemonList: Pokemon[]
  removePokemonFromTeam: (idx: number) => void
}

const AnalyzerPokemonTeam = ({ pokemonList, removePokemonFromTeam }: AnalyzerPokemonTeamProps) => {
  return (
    <div className="pokemon-team">
      {[
        // Actual members of the team
        ...pokemonList.map((pokemon: Pokemon, idx: number) => (
        <AnalyzerPokemonTeamMember
          pokemon={pokemon}
          idx={idx}
          removePokemonFromTeam={removePokemonFromTeam}
        />
        )),
        // Placeholder for missing team members
        ...(new Array(6 - pokemonList.length)
            .fill(0)
            .map(d => {
              return (
                <div className="pokemon-team__member">
                </div>
              );
            })
          ),
      ]}
    </div>
  );
};

export default AnalyzerPokemonTeam;