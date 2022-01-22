import {
  UsageMethodAbilityResult,
  UsageMethodAbilityQuery,

  UsageMethodItemResult,
  UsageMethodItemQuery,

  UsageMethodMoveResult,
  UsageMethodMoveQuery,
} from "../../../../types-queries/UsageMethod";
import {
  ListRenderArgs,
  MissingDispatchError,
  MissingGenError,
  MissingTierFilterError,
} from "../helpers";

import ConnectionAccordionEntry from "../ConnectionAccordionEntry";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";

export const listRenderUsageMethodAbility = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<UsageMethodAbilityQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.usageMethodByName[0];

  const boostedByResults = parent.boostedByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const resistedByResults = parent.resistedByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));

  return (
    <>
      {boostedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosted by ability</h3>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parent.id}_${result.id}_boost_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by ability</h3>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parent.id}_${result.id}_resist_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderUsageMethodItem = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<UsageMethodItemQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.usageMethodByName[0];

  const boostedByResults = parent.boostedByItem.edges.map(edge => new UsageMethodItemResult(edge));
  const resistedByResults = parent.resistedByItem.edges.map(edge => new UsageMethodItemResult(edge));

  return (
    <>
      {boostedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosted by item</h3>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="items"
            key={`${parent.id}_${result.id}_boost_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by item</h3>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="items"
            key={`${parent.id}_${result.id}_resist_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderUsageMethodMove = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<UsageMethodMoveQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.usageMethodByName[0];

  const moveResults = parent.moves.edges.map(edge => new UsageMethodMoveResult(edge));

  return (
    <>
      {moveResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="moves"
          key={`${parent.id}_${result.id}_move`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
          icons={{
            dispatchCart: dispatchCart,
            dispatchTeam: dispatchTeam,
            iconData: result.pokemonIconData,
            gen: gen,
            tierFilter: tierFilter,
          }}
        />
      ))}
    </>
  );
}