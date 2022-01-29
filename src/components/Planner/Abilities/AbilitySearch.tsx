import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgs, MissingDispatchError, MissingGenError, MissingPokemonFilterError, MissingTierFilterError, 
} from '../helpers';
import {
  AbilitySearchQuery,
  AbilitySearchResult,
  AbilitySearchVars,
  AbilityInSearch,

  ABILITY_SEARCH_QUERY,
} from '../../../types-queries/Planner/Ability';

import { TeamAction } from '../../../hooks/App/Team';
import { CartAction } from '../../../hooks/App/Cart';
import { GenFilter, removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { PokemonFilter } from '../../../hooks/App/PokemonFilter';

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/EntitySearchEntry';
import { TierFilter } from '../../../hooks/App/TierFilter';
import { useRemovalConnectedSearchVars } from '../../../hooks/Planner/MainSearches';

const listRender = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<AbilitySearchQuery>) => {
  if (!data || !data.abilities) return (<div>Data not found for the query 'abilities'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntitySearchMain component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntitySearchMain component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed pokemonFilter to the EntitySearchMain component.');
  
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
                pokemonFilter,
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
  pokemonFilter: PokemonFilter
}

const AbilitySearch = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
}: AbilitySearchMainProps) => {
  const [queryVars, setQueryVars] = useRemovalConnectedSearchVars<AbilitySearchVars>(
    {
      gen: genFilter.gen,
      startsWith: '',
      limit: 5,
      removedFromSwSh: removedFromSwSh(genFilter),
      removedFromBDSP: removedFromBDSP(genFilter),
    },
    genFilter,
  );

  const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryVars({
      ...queryVars,
      startsWith: e.target.value,
    });
  }

  return (
    <>
      <EntitySearchMain
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        genFilter={genFilter}
        tierFilter={tierFilter}
        pokemonFilter={pokemonFilter}
        handleSearchBoxChange={handleSearchBoxChange}
        listRender={listRender}
        query={ABILITY_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default AbilitySearch;