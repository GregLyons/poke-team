import {
  StatusAbilityResult,
  StatusAbilityQuery,

  StatusFieldStateResult,
  StatusFieldStateQuery,

  StatusItemResult,
  StatusItemQuery,

  StatusMoveResult,
  StatusMoveQuery,
} from "../../../../types-queries/Status";
import {
  ListRenderArgs,
  MissingDispatchError,
} from "../helpers";

import EntityAccordionEntry from "../EntityAccordionEntry";

export const listRenderStatusAbility = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<StatusAbilityQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');

  const parentID = data.statusByName[0].id;

  const causedByResults = data.statusByName[0].causedByAbility.edges.map(edge => new StatusAbilityResult(edge));
  const resistedByResults = data.statusByName[0].resistedByAbility.edges.map(edge => new StatusAbilityResult(edge));

  return (
    <>
      {causedByResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Caused by ability</h3>
        {causedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="statuses"
            key={`${parentID}_${result.id}_cause_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resisted by ability</h3>
        <p className="planner__accordion-clarification">
          Ability fully cures this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="statuses"
            key={`${parentID}_${result.id}_resist_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatusFieldState = ({ data, }: ListRenderArgs<StatusFieldStateQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);

  const parentID = data.statusByName[0].id;

  const causedByResults = data.statusByName[0].causedByFieldState.edges.map(edge => new StatusFieldStateResult(edge));
  const resistedByResults = data.statusByName[0].resistedByFieldState.edges.map(edge => new StatusFieldStateResult(edge));

  return (
    <>
      {causedByResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Caused by field state</h3>
        {causedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="statuses"
            key={`${parentID}_${result.id}_cause_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resisted by field state</h3>
        <p className="planner__accordion-clarification">
          Field state fully cures this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="statuses"
            key={`${parentID}_${result.id}_resist_fieldState`}
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

  const parentID = data.statusByName[0].id;

  const causedByResults = data.statusByName[0].causedByItem.edges.map(edge => new StatusItemResult(edge));
  const resistedByResults = data.statusByName[0].resistedByItem.edges.map(edge => new StatusItemResult(edge));

  return (
    <>
      {causedByResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Caused by item</h3>
        {causedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="statuses"
            key={`${parentID}_${result.id}_cause_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resisted by item</h3>
        <p className="planner__accordion-clarification">
          Item fully cure this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="statuses"
            key={`${parentID}_${result.id}_resist_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatusMove = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<StatusMoveQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');

  const parentID = data.statusByName[0].id;

  const causedByResults = data.statusByName[0].causedByMove.edges.map(edge => new StatusMoveResult(edge));
  const resistedByResults = data.statusByName[0].resistedByMove.edges.map(edge => new StatusMoveResult(edge));

  return (
    <>
      {causedByResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Caused by move</h3>
        {causedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="statuses"
            key={`${parentID}_${result.id}_cause_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resisted by move</h3>
        <p className="planner__accordion-clarification">
          Move fully cure this status, prevents it, or mitigates it in some way.
        </p>
        {resistedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="statuses"
            key={`${parentID}_${result.id}_resist_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
    </>
  );
}