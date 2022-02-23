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
  TYPE_PAGE_QUERY,
  TypePageQuery,
  TypePageQueryVars,
  TypeOnPage,

  TYPE_ABILITY_QUERY,
  TypeAbilityQueryVars,

  TYPE_FIELDSTATE_QUERY,
  TypeFieldStateQueryVars,

  TYPE_ITEM_QUERY,
  TypeItemQueryVars,

  TYPE_MOVE_QUERY,
  TypeMoveQueryVars,
} from '../../../types-queries/Planner/Type';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../types-queries/Planner/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../utils/constants';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import {
  listRenderTypeAbility,
  listRenderTypeFieldState,
  listRenderTypeItem,
  listRenderTypeMove,
} from './TypeConnections';

import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../hooks/Searches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { Dispatches, Filters } from '../../App';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';

type TypePageProps = {
  dispatches: Dispatches
  filters: Filters
}

const TypePage = ({
  dispatches,
  filters,
}: TypePageProps) => {
  const params = useParams();
  
  const typeName = params.typeId || '';

  // Connection queries
  // #region 
  
  const { queryVars: abilityQueryVars, setQueryVars: setAbilityQueryVars, } = useRemovalConnectedSearchVars<TypeAbilityQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: typeName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: fieldStateQueryVars, setQueryVars: setFieldStateQueryVars, } = useGenConnectedSearchVars<TypeFieldStateQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: typeName,
  }, genFilter: filters.genFilter});

  const { queryVars: itemQueryVars, setQueryVars: setItemQueryVars, } = useRemovalConnectedSearchVars<TypeItemQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: typeName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: moveQueryVars, setQueryVars: setMoveQueryVars, } = useRemovalConnectedSearchVars<TypeMoveQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: typeName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<TypePageQuery, TypePageQueryVars>(
  TYPE_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: filters.genFilter.gen,
        name: typeName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      }
    })
  }, [filters.genFilter, typeName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('typeByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: typeName,
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

  if (!data_introduced || !data_introduced.typeByName || (data_introduced.typeByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{typeName}'.
    </div>
    );
  }

  const debutGen = data_introduced.typeByName[0].introduced.edges[0].node.number;

  if (debutGen > filters.genFilter.gen) return (
    <div>
      {typeName} doesn't exist in Generation {filters.genFilter.gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the type exists in this gen, we check the actual data
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
        Data not found for '{typeName}'.
      </div>
    );
  }
  else if (!data.typeByName) {
    console.log('invalid query');
    return (
      <div>
        'typeByName' is not a valid query for '{typeName}'.
      </div>
    );
  }
  else if (data.typeByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const typeResult = new TypeOnPage(data.typeByName[0]);

  return (
    <div className="planner-page__wrapper">
      <h1 className="planner-page__header">{typeResult.formattedName}</h1>
      <div className="planner-page__accordion-wrapper">
        <Accordion 
          accordionContext='planner'
          accordionData={[
            {
              title: <ConnectionAccordionTitle
                titleText={`Ability interactions with ${typeResult.formattedName}`}
              />,
              content: typeResult.abilityCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderTypeAbility}
                  query={TYPE_ABILITY_QUERY}
                  queryVars={abilityQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Field state interactions with ${typeResult.formattedName}`}
              />,
              content: typeResult.fieldStateCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderTypeFieldState}
                  query={TYPE_FIELDSTATE_QUERY}
                  queryVars={fieldStateQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Item interactions with ${typeResult.formattedName}`}
              />,
              content: typeResult.itemCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderTypeItem}
                  query={TYPE_ITEM_QUERY}
                  queryVars={itemQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Move interactions with ${typeResult.formattedName}`}
              />,
              content: typeResult.moveInteractionCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderTypeMove}
                  query={TYPE_MOVE_QUERY}
                  queryVars={moveQueryVars}
                />
              </>,
            },
          ]}
        />
      </div>
      <Outlet />
    </div>
  );
}

export default TypePage;