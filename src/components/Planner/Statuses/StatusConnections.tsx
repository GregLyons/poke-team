import {
  StatusAbilityResult,
  StatusAbilityQuery,

  StatusFieldStateResult,
  StatusFieldStateQuery,

  StatusItemResult,
  StatusItemQuery,

  StatusMoveResult,
  StatusMoveQuery,
} from "../../../types-queries/Planner/Status";
import {
  ListRenderArgs,
  MissingDispatchError,
  MissingGenError,
  MissingPokemonFilterError,
  MissingTierFilterError,
} from "../helpers";

import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";

export const listRenderStatusAbility = ({ data, dispatchCart, dispatchTeam, dispatchBGManager, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<StatusAbilityQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);
  if (!dispatchCart || !dispatchTeam || !dispatchBGManager) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntityConnectionSearch component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntityConnectionSearch component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntityConnectionSearch component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed PokemonFilter to the EntityConnectionSearch component.');

  const parent = data.statusByName[0];

  const causedByResults = parent.causedByAbility.edges.map(edge => new StatusAbilityResult(edge));
  const resistedByResults = parent.resistedByAbility.edges.map(edge => new StatusAbilityResult(edge));

  return (
    <>
      {causedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Caused by ability</h3>
        {causedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Status"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_cause_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: '%', title: 'Chance', value: result.chance || 0}]}
            icons={{
              dispatchCart,
              dispatchTeam,
              dispatchBGManager,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' causes '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by ability</h3>
        <p className="planner-accordion__clarification">
          Ability fully cures this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Status"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_resist_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart,
              dispatchTeam,
              dispatchBGManager,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatusFieldState = ({ data, }: ListRenderArgs<StatusFieldStateQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);

  const parent = data.statusByName[0];

  const causedByResults = parent.causedByFieldState.edges.map(edge => new StatusFieldStateResult(edge));
  const resistedByResults = parent.resistedByFieldState.edges.map(edge => new StatusFieldStateResult(edge));

  return (
    <>
      {causedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Caused by field state</h3>
        {causedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Status"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_cause_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: '%', title: 'Chance', value: result.chance || 0}]}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by field state</h3>
        <p className="planner-accordion__clarification">
          Field state fully cures this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Status"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_resist_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatusItem = ({ data, dispatchCart, dispatchTeam, dispatchBGManager, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<StatusItemQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);
  if (!dispatchCart || !dispatchTeam || !dispatchBGManager) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntityConnectionSearch component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntityConnectionSearch component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntityConnectionSearch component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed PokemonFilter to the EntityConnectionSearch component.');

  const parent = data.statusByName[0];

  const causedByResults = parent.causedByItem.edges.map(edge => new StatusItemResult(edge));
  const resistedByResults = parent.resistedByItem.edges.map(edge => new StatusItemResult(edge));

  return (
    <>
      {causedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Caused by item</h3>
        {causedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Status"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_cause_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: '%', title: 'Chance', value: result.chance || 0}]}
            icons={{
              dispatchCart,
              dispatchTeam,
              dispatchBGManager,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' causes '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by item</h3>
        <p className="planner-accordion__clarification">
          Item fully cure this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Status"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_resist_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart,
              dispatchTeam,
              dispatchBGManager,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatusMove = ({ data, dispatchCart, dispatchTeam, dispatchBGManager, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<StatusMoveQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);
  if (!dispatchCart || !dispatchTeam || !dispatchBGManager) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntityConnectionSearch component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntityConnectionSearch component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntityConnectionSearch component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed PokemonFilter to the EntityConnectionSearch component.');

  const parent = data.statusByName[0];

  const causedByResults = parent.causedByMove.edges.map(edge => new StatusMoveResult(edge));
  const resistedByResults = parent.resistedByMove.edges.map(edge => new StatusMoveResult(edge));

  return (
    <>
      {causedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Caused by move</h3>
        {causedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Status"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_cause_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: '%', title: 'Chance', value: result.chance || 0}]}
            icons={{
              dispatchCart,
              dispatchTeam,
              dispatchBGManager,
              pokemonIconData: result.pokemonIconData,
              typeIconDatum: result.typeIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' causes '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by move</h3>
        <p className="planner-accordion__clarification">
          Move fully cure this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Status"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_resist_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart,
              dispatchTeam,
              dispatchBGManager,
              pokemonIconData: result.pokemonIconData,
              typeIconDatum: result.typeIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}