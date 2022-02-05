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
  MissingDispatchError,
  MissingGenError,
  MissingPokemonFilterError,
  MissingTierFilterError,
} from "../helpers";

import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";

export const listRenderEffectAbility = ({ data, dispatchCart, dispatchTeam, dispatchBGManager, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<EffectAbilityQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);
  if (!dispatchCart || !dispatchTeam || !dispatchBGManager) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntityConnectionSearch component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntityConnectionSearch component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntityConnectionSearch component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed PokemonFilter to the EntityConnectionSearch component.');

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
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              dispatchBGManager,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter: tierFilter,
              pokemonFilter: pokemonFilter,
              cartNote: `'${result.formattedName}' has the effect '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export const listRenderEffectFieldState = ({ data, dispatchCart, dispatchTeam, dispatchBGManager, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<EffectFieldStateQuery>) => {
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
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>
    </>
  );
}

export const listRenderEffectItem = ({ data, dispatchCart, dispatchTeam, dispatchBGManager, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<EffectItemQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);
  if (!dispatchCart || !dispatchTeam || !dispatchBGManager) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntityConnectionSearch component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntityConnectionSearch component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntityConnectionSearch component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed PokemonFilter to the EntityConnectionSearch component.');

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
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              dispatchBGManager,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' has the effect '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export const listRenderEffectMove = ({ data, dispatchCart, dispatchTeam, dispatchBGManager, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<EffectMoveQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);
  if (!dispatchCart || !dispatchTeam || !dispatchBGManager) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntityConnectionSearch component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntityConnectionSearch component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntityConnectionSearch component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed PokemonFilter to the EntityConnectionSearch component.');

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
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              dispatchBGManager,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter: tierFilter,
              pokemonFilter: pokemonFilter,
              cartNote: `'${result.formattedName}' has the effect '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>
    </>
  );
}