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
} from '../../../../types-queries/Planner/Ability';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';

import { 
  CartAction,
  GenFilter,
  removedFromBDSP,
  removedFromSwSh,
  TeamAction,
} from '../../../../hooks/app-hooks';

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';
import { TierFilter } from '../../../../utils/smogonLogic';

const listRender = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, }: ListRenderArgs<AbilitySearchQuery>) => {
  if (!data || !data.abilities) return (<div>Data not found for the query 'abilities'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntitySearchMain component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed gen to the EntitySearchMain component.');
  
  return (
    <>
      {data.abilities.map((abilitySearchResult: AbilitySearchResult) => {
        const ability = new AbilityInSearch(abilitySearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="Ability"
              key={'abilityEntry_' + ability.id}
              name={ability.formattedName}
              linkName={ability.name}
              description={ability.description}
              icons={{
                pokemonIconData: ability.pokemonIconData,
                dispatchCart,
                dispatchTeam,
                genFilter,
                tierFilter,
                cartNote: `Pokemon who have '${ability.formattedName}'.`
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
  genFilter: GenFilter
  tierFilter: TierFilter
}

const AbilitySearch = ({
  dispatchCart,
  dispatchTeam,
  genFilter: genFilter,
  tierFilter,
}: AbilitySearchMainProps) => {

  const [queryVars, setQueryVars] = useState<AbilitySearchVars>({
    gen: genFilter.gen,
    startsWith: '',
    limit: 5,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
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
        genFilter={genFilter}
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