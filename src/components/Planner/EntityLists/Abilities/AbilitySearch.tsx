import {
  useState,
} from 'react';
import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgs, MissingDispatchError, MissingGenError, MissingTierFilterError, 
} from '../helpers';
import {
  AbilitySearchQuery,
  AbilitySearchResult,
  AbilitySearchVars,
  AbilityInSearch,

  ABILITY_SEARCH_QUERY,
} from '../../../../types-queries/Ability';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';
import { TierFilter } from '../../../../utils/constants';

const listRender = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<AbilitySearchQuery>) => {
  if (!data || !data.abilities) return (<div>Data not found for the query 'abilities'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the EntitySearchMain component.');
  
  return (
    <>
      {data.abilities.map((abilitySearchResult: AbilitySearchResult) => {
        const ability = new AbilityInSearch(abilitySearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="abilities"
              key={'abilityEntry_' + ability.id}
              name={ability.formattedName}
              linkName={ability.name}
              description={ability.description}
              icons={{
                iconData: ability.pokemonIconData,
                dispatchCart,
                dispatchTeam,
                gen,
                tierFilter,
              }}
            />
          </>
        );
      })}
    </>
  );
}

type AbilitySearchMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const AbilitySearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: AbilitySearchMainProps) => {

  const [queryVars, setQueryVars] = useState<AbilitySearchVars>({
    gen: gen,
    startsWith: '',
    limit: 5,
  });

  const handleSubmit: (newQueryVars: AbilitySearchVars) => void = (newQueryVars) => {
    setQueryVars({
      ...newQueryVars,
    });
  }

  return (
    <>
      <EntitySearchMain
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        gen={gen}
        tierFilter={tierFilter}
        handleSubmit={handleSubmit}
        listRender={listRender}
        query={ABILITY_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default AbilitySearch;