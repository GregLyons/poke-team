import {
  StatusAbilityResult,
  StatusAbilityQuery,

  StatusFieldStateResult,
  StatusFieldStateQuery,

  StatusItemResult,
  StatusItemQuery,

  StatusMoveResult,
  StatusMoveQuery,
} from "../../../../types-queries/Planner/Status";
import {
  ListRenderArgs,
  MissingDispatchError,
  MissingGenError,
  MissingTierFilterError,
} from "../helpers";

import ConnectionAccordionEntry from "../ConnectionAccordionEntry";

export const listRenderStatusAbility = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<StatusAbilityQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.statusByName[0];

  const causedByResults = parent.causedByAbility.edges.map(edge => new StatusAbilityResult(edge));
  const resistedByResults = parent.resistedByAbility.edges.map(edge => new StatusAbilityResult(edge));

  return (
    <>
      {causedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Caused by ability</h3>
        {causedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parent.id}_${result.id}_cause_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' causes '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by ability</h3>
        <p className="planner__accordion-clarification">
          Ability fully cures this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parent.id}_${result.id}_resist_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
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
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Caused by field state</h3>
        {causedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parent.id}_${result.id}_cause_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by field state</h3>
        <p className="planner__accordion-clarification">
          Field state fully cures this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
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

export const listRenderStatusItem = ({ data, }: ListRenderArgs<StatusItemQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);

  const parent = data.statusByName[0];

  const causedByResults = parent.causedByItem.edges.map(edge => new StatusItemResult(edge));
  const resistedByResults = parent.resistedByItem.edges.map(edge => new StatusItemResult(edge));

  return (
    <>
      {causedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Caused by item</h3>
        {causedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="items"
            key={`${parent.id}_${result.id}_cause_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by item</h3>
        <p className="planner__accordion-clarification">
          Item fully cure this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="items"
            key={`${parent.id}_${result.id}_resist_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatusMove = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<StatusMoveQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.statusByName[0];

  const causedByResults = parent.causedByMove.edges.map(edge => new StatusMoveResult(edge));
  const resistedByResults = parent.resistedByMove.edges.map(edge => new StatusMoveResult(edge));

  return (
    <>
      {causedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Caused by move</h3>
        {causedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="moves"
            key={`${parent.id}_${result.id}_cause_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' causes '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by move</h3>
        <p className="planner__accordion-clarification">
          Move fully cure this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="moves"
            key={`${parent.id}_${result.id}_resist_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}