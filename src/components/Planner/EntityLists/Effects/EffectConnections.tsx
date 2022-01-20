import {
  EffectAbilityResult,
  EffectAbilityQuery,

  EffectFieldStateResult,
  EffectFieldStateQuery,

  EffectItemResult,
  EffectItemQuery,

  EffectMoveResult,
  EffectMoveQuery
} from "../../../../types-queries/Effect";
import {
  ListRenderArgs,
  MissingDispatchError,
  MissingGenError,
  MissingTierFilterError,
} from "../helpers";

import ConnectionAccordionEntry from "../ConnectionAccordionEntry";

export const listRenderEffectAbility = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<EffectAbilityQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parentID = data.effectByName[0].id;

  const abilityResults = data.effectByName[0].abilities.edges.map(edge => new EffectAbilityResult(edge));

  return (
    <>
      {abilityResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="abilities"
          key={`${parentID}_${result.id}_ability`}
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

export const listRenderEffectFieldState = ({ data, }: ListRenderArgs<EffectFieldStateQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);

  const parentID = data.effectByName[0].id;

  const fieldStateResults = data.effectByName[0].fieldStates.edges.map(edge => new EffectFieldStateResult(edge));

  return (
    <>
      {fieldStateResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="fieldStates"
          key={`${parentID}_${result.id}_fieldState`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
        />
      ))}
    </>
  );
}

export const listRenderEffectItem = ({ data, }: ListRenderArgs<EffectItemQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);

  const parentID = data.effectByName[0].id;

  const itemResults = data.effectByName[0].items.edges.map(edge => new EffectItemResult(edge));

  return (
    <>
      {itemResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="items"
          key={`${parentID}_${result.id}_item`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
        />
      ))}
    </>
  );
}

export const listRenderEffectMove = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<EffectMoveQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parentID = data.effectByName[0].id;

  const moveResults = data.effectByName[0].moves.edges.map(edge => new EffectMoveResult(edge));

  return (
    <>
      {moveResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="moves"
          key={`${parentID}_${result.id}_move`}
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