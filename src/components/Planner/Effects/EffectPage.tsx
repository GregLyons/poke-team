import {
  Outlet,
  useParams
} from 'react-router-dom';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { useDebutQuery, usePageQuery } from '../../../hooks/Planner/PageQueries';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../hooks/Searches';
import {
  EffectAbilityQueryVars, EffectFieldStateQueryVars, EffectItemQueryVars, EffectMoveQueryVars, EffectOnPage, EffectPageQuery,
  EffectPageQueryVars, EFFECT_ABILITY_QUERY, EFFECT_FIELDSTATE_QUERY, EFFECT_ITEM_QUERY, EFFECT_MOVE_QUERY, EFFECT_PAGE_QUERY
} from '../../../types-queries/Planner/Effect';
import { Dispatches, Filters } from '../../App';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';
import { listRenderEffectAbility, listRenderEffectFieldState, listRenderEffectItem, listRenderEffectMove } from './EffectConnections';

type EffectPageProps = {
  dispatches: Dispatches
  filters: Filters
}

const EffectPage = ({
  dispatches,
  filters,
}: EffectPageProps) => {
  const params = useParams();
  
  const effectName = params.effectId || '';

  // Connection queries
  // #region 
  
  const { queryVars: abilityQueryVars, } = useRemovalConnectedSearchVars<EffectAbilityQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: effectName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: fieldStateQueryVars, } = useGenConnectedSearchVars<EffectFieldStateQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: effectName,
  }, genFilter: filters.genFilter});

  const { queryVars: itemQueryVars, } = useGenConnectedSearchVars<EffectItemQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: effectName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: moveQueryVars, } = useGenConnectedSearchVars<EffectMoveQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: effectName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  // #endregion
  
  const { data, pageComponent, } = usePageQuery<EffectPageQuery, EffectPageQueryVars>(
    EFFECT_PAGE_QUERY,
      {
        gen: filters.genFilter.gen,
        name: effectName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      },
      effectName,
    );
  
    const debutComponent = useDebutQuery(effectName, 'Effect', filters.genFilter);
  
    if (debutComponent) return debutComponent;
    if (pageComponent) return pageComponent;
  
    if (!data?.effectByName || !data?.effectByName[0]) return <div>Data not found for '{effectName}'</div>;


  const effectResult = new EffectOnPage(data.effectByName[0]);

  return (
    <div className="planner-page__wrapper">
      <h1 className="planner-page__header">{effectResult.formattedName}</h1>
      <div className="planner-page__accordion-wrapper">
        <Accordion 
          accordionContext='planner'
          accordionData={[
            {
              title: <ConnectionAccordionTitle
                titleText={`Abilities with '${effectResult.formattedName}'`}
              />,
              content: effectResult.abilityCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderEffectAbility}
                  query={EFFECT_ABILITY_QUERY}
                  queryVars={abilityQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Field states with '${effectResult.formattedName}'`}
              />,
              content: effectResult.fieldStateCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderEffectFieldState}
                  query={EFFECT_FIELDSTATE_QUERY}
                  queryVars={fieldStateQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Items with '${effectResult.formattedName}'`}
              />,
              content: effectResult.itemCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderEffectItem}
                  query={EFFECT_ITEM_QUERY}
                  queryVars={itemQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Moves with '${effectResult.formattedName}'`}
              />,
              content: effectResult.moveCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderEffectMove}
                  query={EFFECT_MOVE_QUERY}
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

export default EffectPage;