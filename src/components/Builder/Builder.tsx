import {
  useContext,
} from 'react';

import { TeamContext } from '../../contexts';
import { GenerationNum } from '../../types-queries/Generation';

import PokemonSearch from './PokemonSearch';

type BuilderProps = {
  gen: GenerationNum
}

const Builder = ({ gen }: BuilderProps) => {
  const { addToTeam } = useContext(TeamContext);

  return (
    <div className="builder-wrapper">
      <PokemonSearch 
        addToTeam={addToTeam}
        gen={gen}
      />
    </div>
  );
}
export default Builder;