import {
  EffectAbilityResult,
  EffectAbilityQuery,

  EffectFieldStateResult,
  EffectFieldStateQuery,

  EffectItemResult,
  EffectItemQuery,

  EffectMoveResult,
  EffectMoveQuery
} from "../../../types-queries/Planner/Effect";
import {
  ListRenderArgs,
  ListRenderArgsIcons,
} from "../helpers";

import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";

export const listRenderEffectAbility = ({ data, dispatches, filters, }: ListRenderArgsIcons<EffectAbilityQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);

  const parent = data.effectByName[0];

  const abilityResults = parent.abilities.edges.map(edge => new EffectAbilityResult(edge));

  return (
    <>
      <div className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        {abilityResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Effect"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' has the effect '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export const listRenderEffectFieldState = ({ data, }: ListRenderArgs<EffectFieldStateQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);

  const parent = data.effectByName[0];

  const fieldStateResults = parent.fieldStates.edges.map(edge => new EffectFieldStateResult(edge));

  return (
    <>
      <div className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        {fieldStateResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Effect"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_fieldState`}
            icons={{
              linkIconDatum: {
                iconClass: 'fieldState',
                iconDatum: result.iconDatum,
              }
            }}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>
    </>
  );
}

export const listRenderEffectItem = ({ data, dispatches, filters, }: ListRenderArgsIcons<EffectItemQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);

  const parent = data.effectByName[0];

  const itemResults = parent.items.edges.map(edge => new EffectItemResult(edge));

  return (
    <>
      <div className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        {itemResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Effect"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatches,
              pokemonIconData: result.requiredPokemonIconData,
              linkIconDatum: {
                iconClass: 'item',
                iconDatum: result.itemIconDatum
              },
              filters,
              cartNote: `'${result.formattedName}' has the effect '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export const listRenderEffectMove = ({ data, dispatches, filters, }: ListRenderArgsIcons<EffectMoveQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);

  const parent = data.effectByName[0];

  const moveResults = parent.moves.edges.map(edge => new EffectMoveResult(edge));

  return (
    <>
      <div className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        {moveResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Effect"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatches,
              filters,
              pokemonIconData: result.pokemonIconData,
              cartNote: `'${result.formattedName}' has the effect '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>
    </>
  );
}