import { Pokemon } from '../../typeDefs/Pokemon';

import PlannerPokemonTeam from './PlannerPokemonTeam/PlannerPokemonTeam';

import './Planner.css';

type PlannerProps = {
  pokemonList: Pokemon[]
  addPokemonToTeam: (pokemon: Pokemon) => void
  removePokemonFromTeam: (idx: number) => void
}

const Planner = ({ pokemonList, addPokemonToTeam, removePokemonFromTeam }: PlannerProps) => {
  return (
    <div className="planner-container">
      <PlannerPokemonTeam
        pokemonList={pokemonList}
        removePokemonFromTeam={removePokemonFromTeam}
      />
    </div>
  );
}
export default Planner;