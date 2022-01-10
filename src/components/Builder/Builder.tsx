import {
  useContext,
} from 'react';

import { TeamContext } from '../../contexts';
import { Pokemon } from '../../typeDefs/Pokemon';

import PokemonSearch from './PokemonSearch';


const Builder = () => {
  const { addToTeam } = useContext(TeamContext);

  return (
    <div className="builder-wrapper">
      <PokemonSearch 
        addToTeam={addToTeam}
      />
    </div>
  );
}
export default Builder;