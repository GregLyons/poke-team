import {
  useEffect,
} from 'react';
import {
  Outlet,
  useParams,
} from 'react-router-dom';
import {
  useLazyQuery,
} from '@apollo/client';

import {
  USAGEMETHOD_PAGE_QUERY,
  UsageMethodPageQuery,
  UsageMethodPageQueryVars,
  UsageMethodOnPage,

  USAGEMETHOD_ABILITY_QUERY,
  UsageMethodAbilityQueryVars,

  USAGEMETHOD_ITEM_QUERY,
  UsageMethodItemQueryVars,

  USAGEMETHOD_MOVE_QUERY,
  UsageMethodMoveQueryVars,
} from '../../../types-queries/Planner/UsageMethod';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../types-queries/Planner/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../utils/constants';
import { TierFilter } from "../../../hooks/App/TierFilter";

import { TeamAction } from '../../../hooks/App/Team';
import { CartAction } from '../../../hooks/App/Cart';
import { GenFilter, removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { PokemonFilter } from '../../../hooks/App/PokemonFilter';
import {
  listRenderUsageMethodAbility,
  listRenderUsageMethodItem,
  listRenderUsageMethodMove,
} from './UsageMethodConnections';
import AuxEntityDescription from '../Pages/AuxEntityDescription';

import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import { useRemovalConnectedSearchVars } from '../../../hooks/Planner/MainSearches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';

type UsageMethodPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const UsageMethodPage = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
}: UsageMethodPageProps) => {
  const params = useParams();
  
  const usageMethodName = params.usageMethodId || '';

  // Connection queries
  // #region 
  
  const [abilityQueryVars, setAbilityQueryVars] = useRemovalConnectedSearchVars<UsageMethodAbilityQueryVars>({
    gen: genFilter.gen,
    name: usageMethodName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);
  const [itemQueryVars, setItemQueryVars] = useRemovalConnectedSearchVars<UsageMethodItemQueryVars>({
    gen: genFilter.gen,
    name: usageMethodName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);

  const [moveQueryVars, setMoveQueryVars] = useRemovalConnectedSearchVars<UsageMethodMoveQueryVars>({
    gen: genFilter.gen,
    name: usageMethodName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<UsageMethodPageQuery, UsageMethodPageQueryVars>(
  USAGEMETHOD_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: genFilter.gen,
        name: usageMethodName,
        removedFromSwSh: removedFromSwSh(genFilter),
        removedFromBDSP: removedFromBDSP(genFilter),
      }
    })
  }, [genFilter, usageMethodName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('usageMethodByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: usageMethodName,
      }
    });
  }, [])

  if (loading_introduced) {
    console.log('loading debut');
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (error_introduced) {
    console.log('error debut');
    return (
      <div>
        Error for introduction query! {error_introduced.message}
      </div>
    );
  } 

  if (!data_introduced || !data_introduced.usageMethodByName || (data_introduced.usageMethodByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{usageMethodName}'.
    </div>
    );
  }

  const debutGen = data_introduced.usageMethodByName[0].introduced.edges[0].node.number;

  if (debutGen > genFilter.gen) return (
    <div>
      {usageMethodName} doesn't exist in Generation {genFilter.gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the usageMethod exists in this gen, we check the actual data
  // # region

  if (loading) {
    console.log('loading');
    return (
      <div>
        Loading...
      </div>
    );
  }
  else if (error) {
    console.log('error');
    return (
      <div>
        Error! {error.message}
      </div>
    )
  }
  else if (!data) {
    console.log('data not found');
    return (
      <div>
        Data not found for '{usageMethodName}'.
      </div>
    );
  }
  else if (!data.usageMethodByName) {
    console.log('invalid query');
    return (
      <div>
        'usageMethodByName' is not a valid query for '{usageMethodName}'.
      </div>
    );
  }
  else if (data.usageMethodByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const usageMethodResult = new UsageMethodOnPage(data.usageMethodByName[0]);

  return (
    <div className="planner-page">
      <h1 className="planner-page__header">{usageMethodResult.formattedName}</h1>

      <AuxEntityDescription
        description={usageMethodResult.description}
      />

      <Accordion 
        accordionContext='planner'
        accordionData={[
          {
            title: <ConnectionAccordionTitle
              titleText={`Ability interactions with ${usageMethodResult.formattedName}`}
            />,
            content: usageMethodResult.abilityCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                pokemonFilter={pokemonFilter}
                listRender={listRenderUsageMethodAbility}
                query={USAGEMETHOD_ABILITY_QUERY}
                queryVars={abilityQueryVars}
              />
            </>,
          },
          {
            title: <ConnectionAccordionTitle
              titleText={`Item interactions with ${usageMethodResult.formattedName}`}
            />,
            content: usageMethodResult.itemCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                pokemonFilter={pokemonFilter}
                listRender={listRenderUsageMethodItem}
                query={USAGEMETHOD_ITEM_QUERY}
                queryVars={itemQueryVars}
              />
            </>,
          },
          {
            title: <ConnectionAccordionTitle
              titleText={`Move interactions with ${usageMethodResult.formattedName}`}
            />,
            content: usageMethodResult.moveCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                pokemonFilter={pokemonFilter}
                listRender={listRenderUsageMethodMove}
                query={USAGEMETHOD_MOVE_QUERY}
                queryVars={moveQueryVars}
              />
            </>,
          },
        ]}
      />
      <Outlet />
    </div>
  );
}

export default UsageMethodPage;