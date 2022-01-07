import {
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import { Pokemon } from '../../typeDefs/Pokemon';


import PlannerPokemonTeam from './PokemonTeam/PlannerPokemonTeam';
import PlannerNavBar from './PlannerNavBar';

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
      <PlannerNavBar />
      <Outlet />
    </div>
  );
}
export default Planner;