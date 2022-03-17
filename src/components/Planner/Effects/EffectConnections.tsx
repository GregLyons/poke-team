import { ListRenderArgs, ListRenderArgsIcons } from "../../../hooks/Searches";
import {
  EffectAbilityQuery, EffectAbilityResult, EffectFieldStateQuery, EffectFieldStateResult, EffectItemQuery, EffectItemResult, EffectMoveQuery, EffectMoveResult
} from "../../../types-queries/Planner/Effect";
import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";

export const listRenderEffectAbility = ({ data, dispatches, filters, }: ListRenderArgsIcons<EffectAbilityQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);

  const parent = data.effectByName[0];

  const abilityResults = parent.abilities.edges.map(edge => new EffectAbilityResult(edge));

  return (
    <ul className="planner-accordion__sub-item-list">
      <li className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        <ul className="planner-accordion__sub-item-results">
          {abilityResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Effect"
              targetEntityClass="Ability"
              key={result.id}
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
        </ul>
      </li>
    </ul>
  );
}

export const listRenderEffectFieldState = ({ data, }: ListRenderArgs<EffectFieldStateQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);

  const parent = data.effectByName[0];

  const fieldStateResults = parent.fieldStates.edges.map(edge => new EffectFieldStateResult(edge));

  return (
    <ul className="planner-accordion__sub-item-list">
      <li className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        <ul className="planner-accordion__sub-item-results">
          {fieldStateResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Effect"
              targetEntityClass="Field state"
              key={result.id}
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
        </ul>
      </li>
    </ul>
  );
}

export const listRenderEffectItem = ({ data, dispatches, filters, }: ListRenderArgsIcons<EffectItemQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);

  const parent = data.effectByName[0];

  const itemResults = parent.items.edges.map(edge => new EffectItemResult(edge));

  return (
    <ul className="planner-accordion__sub-item-list">
      <li className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        <ul className="planner-accordion__sub-item-results">
          {itemResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Effect"
              targetEntityClass="Item"
              key={result.id}
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
        </ul>
      </li>
    </ul>
  );
}

export const listRenderEffectMove = ({ data, dispatches, filters, }: ListRenderArgsIcons<EffectMoveQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);

  const parent = data.effectByName[0];

  const moveResults = parent.moves.edges.map(edge => new EffectMoveResult(edge));

  return (
    <ul className="planner-accordion__sub-item-list">
      <li className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        <ul className="planner-accordion__sub-item-results">
          {moveResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Effect"
              targetEntityClass="Move"
              key={result.id}
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
        </ul>
      </li>
    </ul>
  );
}