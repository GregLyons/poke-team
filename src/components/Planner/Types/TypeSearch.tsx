import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgs, MissingDispatchError, MissingGenError, MissingPokemonFilterError, MissingTierFilterError, 
} from '../helpers';
import {
  TypeSearchQuery,
  TypeSearchResult,
  TypeSearchVars,
  TypeInSearch,

  TYPE_SEARCH_QUERY,
} from '../../../types-queries/Planner/Type';

import { TeamAction } from '../../../hooks/App/Team';
import { CartAction } from '../../../hooks/App/Cart';
import { GenFilter, removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { PokemonFilter } from '../../../hooks/App/PokemonFilter';

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/EntitySearchEntry';
import { TierFilter } from '../../../hooks/App/TierFilter';
import { useRemovalConnectedSearchVars } from '../../../hooks/Planner/MainSearches';

const listRender = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<TypeSearchQuery>) => {
  if (!data || !data.types) return (<div>Data not found for the query 'types'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntitySearchMain component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntitySearchMain component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed pokemonFilter to the EntitySearchMain component.');
  
  return (
    <>
      {data.types.map((typeSearchResult: TypeSearchResult) => {
        const type = new TypeInSearch(typeSearchResult);
        
        return (
          <>
            <EntitySearchEntry
              entityClass="Type"
              key={'typeEntry_' + type.id}
              name={type.formattedName}
              linkName={type.name}
              description={type.description}
              icons={{
                pokemonIconData: type.pokemonIconData,
                typeIconDatum: type.typeIconDatum,
                dispatchCart,
                dispatchTeam,
                genFilter,
                tierFilter,
                pokemonFilter,
                cartNote: `Pokemon with the Type '${type.formattedName}'.`
              }}
            />
          </>
        );
      })}
    </>
  );
}

type TypeSearchMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const TypeSearch = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
}: TypeSearchMainProps) => {
  const [queryVars, setQueryVars] = useRemovalConnectedSearchVars<TypeSearchVars>(
    {
      gen: genFilter.gen,
      startsWith: '',
      limit: 5,
      removedFromSwSh: removedFromSwSh(genFilter),
      removedFromBDSP: removedFromBDSP(genFilter),
    },
    genFilter);

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
        query={TYPE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default TypeSearch;