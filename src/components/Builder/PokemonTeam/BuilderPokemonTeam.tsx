import { Pokemon } from '../../../typeDefs/Pokemon';
import BuilderPokemonTeamMember from './BuilderPokemonTeamMember';

type BuilderPokemonTeamProps = {
  pokemonList: Pokemon[]
  removePokemonFromTeam: (idx: number) => void
}

const BuilderPokemonTeam = ({ pokemonList, removePokemonFromTeam }: BuilderPokemonTeamProps) => {
  return (
    <div className="pokemon-team">
      {[
        // Actual members of the team
        ...pokemonList.map((pokemon: Pokemon, idx: number) => (
        <BuilderPokemonTeamMember
          pokemon={pokemon}
          idx={idx}
          removePokemonFromTeam={removePokemonFromTeam}
        />
        )),
        // Placeholder for missing team members
        ...(new Array(6 - pokemonList.length)
            .fill(0)
            .map(d => (
              <div className="pokemon-team__member">
              </div>
            ))
          ),
      ]}
    </div>
  );
};

export default BuilderPokemonTeam;