import {
  UsageMethodAbilityResult,
  UsageMethodAbilityQuery,

  UsageMethodItemResult,
  UsageMethodItemQuery,

  UsageMethodMoveResult,
  UsageMethodMoveQuery,
} from "../../../../types-queries/Planner/UsageMethod";
import {
  ListRenderArgs,
  MissingDispatchError,
  MissingGenError,
  MissingTierFilterError,
} from "../helpers";

import ConnectionAccordionEntry from "../ConnectionAccordionEntry";

export const listRenderUsageMethodAbility = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, }: ListRenderArgs<UsageMethodAbilityQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.usageMethodByName[0];

  const activatesResults = parent.activatesAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const boostedByResults = parent.boostedByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const preventedByResults = parent.preventedByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const resistedByResults = parent.resistedByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));

  return (
    <>
      {activatesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Activates ability</h3>
        {activatesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_activate_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' activated by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {boostedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosted by ability</h3>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_boost_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {preventedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Prevented by ability</h3>
        <p className="planner__accordion-clarification">
          Presence of the listed ability prevents moves of this usage method from being used.
        </p>
        {preventedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_prevent_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' prevents '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by ability</h3>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_resist_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderUsageMethodItem = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, }: ListRenderArgs<UsageMethodItemQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.usageMethodByName[0];

  const activatesResults = parent.activatesItem.edges.map(edge => new UsageMethodItemResult(edge));
  const boostedByResults = parent.boostedByItem.edges.map(edge => new UsageMethodItemResult(edge));
  const resistedByResults = parent.resistedByItem.edges.map(edge => new UsageMethodItemResult(edge));

  return (
    <>
      {activatesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Activates item</h3>
        {activatesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_activate_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              genFilter,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' is activated by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {boostedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosted by item</h3>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_boost_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              genFilter,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by item</h3>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_resist_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              genFilter,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderUsageMethodMove = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, }: ListRenderArgs<UsageMethodMoveQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.usageMethodByName[0];

  const hadResults = parent.moves.edges.map(edge => new UsageMethodMoveResult(edge));
  const preventedByResults = parent.preventedByMove.edges.map(edge => new UsageMethodMoveResult(edge));

  return (
    <>
      {hadResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Possessed by move</h3>
        {hadResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_has_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              typeIconDatum: result.typeIconDatum,
              genFilter,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' has '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {preventedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Prevented by move</h3>
        <p className="planner__accordion-clarification">
          The listed move can prevent other Pokemon from using moves of this usage method.
        </p>
        {preventedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_prevent_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              typeIconDatum: result.typeIconDatum,
              genFilter,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' prevents '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}