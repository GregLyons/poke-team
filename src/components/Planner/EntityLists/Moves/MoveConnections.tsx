import {
  MoveEffectResult,
  MoveEffectQuery,

  MoveFieldStateResult,
  MoveFieldStateQuery,
  
  MoveStatResult,
  MoveStatQuery,

  MoveStatusResult,
  MoveStatusQuery,

  MoveTypeQuery,
  MoveTypeResult,

  MoveUsageMethodQuery,
  MoveUsageMethodResult,
} from "../../../../types-queries/Move";
import ConnectionAccordionEntry from "../ConnectionAccordionEntry";

import {
  ListRenderArgs,
} from "../helpers";

export const listRenderMoveEffect = ({ data, }: ListRenderArgs<MoveEffectQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parentID = data.moveByName[0].id;

  const effectResults = data.moveByName[0].effects.edges.map(edge => new MoveEffectResult(edge));

  return (
    <>
      {effectResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="effects"
          key={`${parentID}_${result.id}_effect`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
        />
      ))}
    </>
  )
}

export const listRenderMoveFieldState = ({ data, }: ListRenderArgs<MoveFieldStateQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parentID = data.moveByName[0].id;

  const createsResults = data.moveByName[0].createsFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const enhancedByResults = data.moveByName[0].enhancedByFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const hinderedByResults = data.moveByName[0].hinderedByFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const removesResults = data.moveByName[0].removesFieldState.edges.map(edge => new MoveFieldStateResult(edge));

  return (
    <>
      {createsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Creates field state</h3>
        {createsResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_create_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
          />
        ))}
      </div>)}
      {enhancedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Enhanced by field state</h3>
        {enhancedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_enhance_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {hinderedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Hindered by field state</h3>
        {hinderedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_hinder_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {removesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Removes field state</h3>
        {removesResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_remove_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  )
}

export const listRenderMoveStat = ({ data, }: ListRenderArgs<MoveStatQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parentID = data.moveByName[0].id;

  const statResults = data.moveByName[0].modifiesStat.edges.map(edge => new MoveStatResult(edge));
  const boostStageResults = statResults.filter(result => result.stage > 0);
  const reduceStageResults = statResults.filter(result => result.stage < 0);
  const boostMultiplierResults = statResults.filter(result => result.multiplier > 1);
  const reduceMultiplierResults = statResults.filter(result => result.multiplier < 1);

  return (
    <>
      {boostStageResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="stats"
            key={`${parentID}_${result.id}_boost_stage_stat`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[
              {
                key: 'Stage', value: result.stage,
              },
              {
                key: 'Chance', value: result.chance,
              },
              {
                key: 'Recipient', value: result.recipient,
              },
            ]}
          />
        ))}
      </div>)}
      {boostMultiplierResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="stats"
            key={`${parentID}_${result.id}_boost_multiplier_stat`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[
              {
                key: 'Multiplier', value: result.multiplier,
              },
              {
                key: 'Chance', value: result.chance,
              },
              {
                key: 'Recipient', value: result.recipient,
              },
            ]}
          />
        ))}
      </div>)}
      {reduceStageResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="stats"
            key={`${parentID}_${result.id}_reduce_stage_stat`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[
              {
                key: 'Stage', value: result.stage,
              },
              {
                key: 'Chance', value: result.chance,
              },
              {
                key: 'Recipient', value: result.recipient,
              },
            ]}
          />
        ))}
      </div>)}
      {reduceMultiplierResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="stats"
            key={`${parentID}_${result.id}_reduce_multiplier_stat`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[
              {
                key: 'Multiplier', value: result.multiplier,
              },
              {
                key: 'Chance', value: result.chance,
              },
              {
                key: 'Recipient', value: result.recipient,
              },
            ]}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderMoveStatus = ({ data, }: ListRenderArgs<MoveStatusQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parentID = data.moveByName[0].id;

  const causesResults = data.moveByName[0].causesStatus.edges.map(edge => new MoveStatusResult(edge));
  const resistsResults = data.moveByName[0].resistsStatus.edges.map(edge => new MoveStatusResult(edge));

  return (
    <>
      {causesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Causes status</h3>
        {causesResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="statuses"
            key={`${parentID}_${result.id}_cause_status`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
          />
        ))}
      </div>)}
      {resistsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resists status</h3>
        <p className="planner__accordion-clarification">
          The move fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        {resistsResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="statuses"
            key={`${parentID}_${result.id}_resist_status`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderMoveType = ({ data, }: ListRenderArgs<MoveTypeQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parentID = data.moveByName[0].id;

  const requiresResults = data.moveByName[0].requiresType.edges.map(edge => new MoveTypeResult(edge));

  return (
    <>
      {requiresResults.length > 0 && (
      <div className="planner__accordion-subitem">
        <h3 className="planner__accordion-subitem-header">Requires type</h3>
        <p className="planner__accordion-clarification">
          This move requires another move of the listed type as its base move.
        </p>
        {requiresResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="statuses"
            key={`${parentID}_${result.id}_cause_status`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderMoveUsageMethod = ({ data, }: ListRenderArgs<MoveUsageMethodQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parentID = data.moveByName[0].id;

  const usageMethodResults = data.moveByName[0].usageMethods.edges.map(edge => new MoveUsageMethodResult(edge));

  return (
    <>
      {usageMethodResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="usageMethods"
          key={`${parentID}_${result.id}_usageMethod`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
        />
      ))}
    </>
  )
}