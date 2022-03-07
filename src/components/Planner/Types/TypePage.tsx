import {
  Outlet,
  useParams,
} from 'react-router-dom';

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
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import {
  listRenderTypeAbility,
  listRenderTypeFieldState,
  listRenderTypeItem,
  listRenderTypeMove,
} from './TypeConnections';

import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import { useGenConnectedSearchVars, useRemovalConnectedSearchBar, useRemovalConnectedSearchVars } from '../../../hooks/Searches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { Dispatches, Filters } from '../../App';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';
import { useDebutQuery, usePageQuery } from '../../../hooks/Planner/PageQueries';

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
  
  const { queryVars: abilityQueryVars, } = useRemovalConnectedSearchVars<TypeAbilityQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: typeName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: fieldStateQueryVars, } = useGenConnectedSearchVars<TypeFieldStateQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: typeName,
  }, genFilter: filters.genFilter});

  const { queryVars: itemQueryVars, } = useRemovalConnectedSearchVars<TypeItemQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: typeName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: moveQueryVars, } = useRemovalConnectedSearchVars<TypeMoveQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: typeName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  // #endregion
  
  const { data, pageComponent, } = usePageQuery<TypePageQuery, TypePageQueryVars>(
    TYPE_PAGE_QUERY,
      {
        gen: filters.genFilter.gen,
        name: typeName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      },
      typeName,
    );
  
    const debutComponent = useDebutQuery(typeName, 'Type', filters.genFilter);
  
    if (debutComponent) return debutComponent;
    if (pageComponent) return pageComponent;
  
    if (!data?.typeByName || !data?.typeByName[0]) return <div>Data not found for '{typeName}'</div>;


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