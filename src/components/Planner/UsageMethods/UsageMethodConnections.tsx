import {
  UsageMethodAbilityResult,
  UsageMethodAbilityQuery,

  UsageMethodItemResult,
  UsageMethodItemQuery,

  UsageMethodMoveResult,
  UsageMethodMoveQuery,
} from "../../../types-queries/Planner/UsageMethod";

import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";
import { ListRenderArgsIcons } from "../helpers";

export const listRenderUsageMethodAbility = ({ data, dispatches, filters, }: ListRenderArgsIcons<UsageMethodAbilityQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);

  const parent = data.usageMethodByName[0];

  const activatesResults = parent.activatesAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const boostedByResults = parent.boostedByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const preventedByResults = parent.preventedByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const resistedByResults = parent.resistedByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));

  return (
    <>
      {activatesResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Activates ability</h3>
        {activatesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_activate_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' activated by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {boostedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosted by ability</h3>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_boost_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {preventedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Prevented by ability</h3>
        <p className="planner-accordion__clarification">
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
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' prevents '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by ability</h3>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_resist_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderUsageMethodItem = ({ data, dispatches, filters, }: ListRenderArgsIcons<UsageMethodItemQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);

  const parent = data.usageMethodByName[0];

  const activatesResults = parent.activatesItem.edges.map(edge => new UsageMethodItemResult(edge));
  const boostedByResults = parent.boostedByItem.edges.map(edge => new UsageMethodItemResult(edge));
  const resistedByResults = parent.resistedByItem.edges.map(edge => new UsageMethodItemResult(edge));

  return (
    <>
      {activatesResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Activates item</h3>
        {activatesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_activate_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatches,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              filters,
              cartNote: `'${result.formattedName}' is activated by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {boostedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosted by item</h3>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_boost_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatches,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              filters,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by item</h3>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_resist_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatches,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              filters,
              cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderUsageMethodMove = ({ data, dispatches, filters, }: ListRenderArgsIcons<UsageMethodMoveQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);

  const parent = data.usageMethodByName[0];

  const hadResults = parent.moves.edges.map(edge => new UsageMethodMoveResult(edge));
  const preventedByResults = parent.preventedByMove.edges.map(edge => new UsageMethodMoveResult(edge));

  return (
    <>
      {hadResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Possessed by move</h3>
        {hadResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Usage method"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_has_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              typeIconDatum: result.typeIconDatum,
              filters,
              cartNote: `'${result.formattedName}' has '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {preventedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Prevented by move</h3>
        <p className="planner-accordion__clarification">
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
              dispatches,
              pokemonIconData: result.pokemonIconData,
              typeIconDatum: result.typeIconDatum,
              filters,
              cartNote: `'${result.formattedName}' prevents '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}