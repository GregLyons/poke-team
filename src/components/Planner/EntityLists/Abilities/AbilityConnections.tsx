import {
  AbilityEffectQuery,
  AbilityEffectResult,
  AbilityFieldStateQuery,
  AbilityFieldStateResult,
  AbilityStatQuery,
  AbilityStatResult,
  AbilityStatusQuery,
  AbilityStatusResult,
  AbilityTypeQuery,
  AbilityTypeResult,
  AbilityUsageMethodQuery,
  AbilityUsageMethodResult,
} from "../../../../types-queries/Ability";
import {
  ListRenderArgs,
} from "../helpers";

import ConnectionAccordionEntry from "../ConnectionAccordionEntry";

export const listRenderAbilityEffect = ({ data, }: ListRenderArgs<AbilityEffectQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parentID = data.abilityByName[0].id;

  const effectResults = data.abilityByName[0].effects.edges.map(edge => new AbilityEffectResult(edge));
  
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

export const listRenderAbilityFieldState = ({ data, }: ListRenderArgs<AbilityFieldStateQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parentID = data.abilityByName[0].id;

  const activatedByResults = data.abilityByName[0].activatedByFieldState.edges.map(edge => new AbilityFieldStateResult(edge));
  const createsResults = data.abilityByName[0].createsFieldState.edges.map(edge => new AbilityFieldStateResult(edge));
  const ignoresResults = data.abilityByName[0].ignoresFieldState.edges.map(edge => new AbilityFieldStateResult(edge));
  const preventsResults = data.abilityByName[0].preventsFieldState.edges.map(edge => new AbilityFieldStateResult(edge));
  const removesResults = data.abilityByName[0].removesFieldState.edges.map(edge => new AbilityFieldStateResult(edge));
  const suppressesResults = data.abilityByName[0].suppressesFieldState.edges.map(edge => new AbilityFieldStateResult(edge));

  return (
    <>
      {activatedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Activated by field state</h3>
        {activatedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_activate_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
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
      {ignoresResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Ignores field state</h3>
        <p className="planner__accordion-clarification">
          Ability allows the owner to ignore the effects of the field state.
        </p>
        {ignoresResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_ignore_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {preventsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Prevents field state</h3>
        <p className="planner__accordion-clarification">
          Prevents the field state from being set up while in play, but does not remove field states which are already present.
        </p>
        {preventsResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_prevent_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {removesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Removes field state</h3>
        <p className="planner__accordion-clarification">
          Ability removes the field state from the field entirely.
        </p>
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
      {suppressesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Suppresses field state</h3>
        <p className="planner__accordion-clarification">
          Ability removes the effects of the field state while in play, but does not remove the field state entirely.
        </p>
        {suppressesResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_suppress_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  )
}

export const listRenderAbilityStat = ({ data, }: ListRenderArgs<AbilityStatQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parentID = data.abilityByName[0].id;

  const statResults = data.abilityByName[0].modifiesStat.edges.map(edge => new AbilityStatResult(edge));
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

export const listRenderAbilityStatus = ({ data, }: ListRenderArgs<AbilityStatusQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parentID = data.abilityByName[0].id;

  const causesResults = data.abilityByName[0].causesStatus.edges.map(edge => new AbilityStatusResult(edge));
  const resistsResults = data.abilityByName[0].resistsStatus.edges.map(edge => new AbilityStatusResult(edge));

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
          The ability fully cures the status, prevents the status, or mitigates the status in some way.
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

export const listRenderAbilityType = ({ data, }: ListRenderArgs<AbilityTypeQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parentID = data.abilityByName[0].id;

  const boostsResults = data.abilityByName[0].boostsType.edges.map(edge => new AbilityTypeResult(edge));
  const resistsResults = data.abilityByName[0].resistsType.edges.map(edge => new AbilityTypeResult(edge));

  return (
    <>
      {boostsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosts type</h3>
        <p className="planner__accordion-clarification">
          Ability boosts the power of moves of this type used by the Pokemon.
        </p> 
        {boostsResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="types"
            key={`${parentID}_${result.id}_boost_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {resistsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resists type</h3>
        <p className="planner__accordion-clarification">
          Ability resists moves of this type used against the Pokemon.
        </p>
        {resistsResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="types"
            key={`${parentID}_${result.id}_resist_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderAbilityUsageMethod = ({ data, }: ListRenderArgs<AbilityUsageMethodQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parentID = data.abilityByName[0].id;

  const boostsResults = data.abilityByName[0].boostsUsageMethod.edges.map(edge => new AbilityUsageMethodResult(edge));
  const resistsResults = data.abilityByName[0].resistsUsageMethod.edges.map(edge => new AbilityUsageMethodResult(edge));
  resistsResults.map(result => {
    console.log(result.multiplier)
  });

  return (
    <>
      {boostsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosts usage method</h3>
        <p className="planner__accordion-clarification">
          Ability boosts the power of moves of this usage method used by the Pokemon.
        </p> 
        {boostsResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="usageMethods"
            key={`${parentID}_${result.id}_boost_usageMethod`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multiplier', value: result.multiplier}]}
          />
        ))}
      </div>)}
      {resistsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resists usage method</h3>
        <p className="planner__accordion-clarification">
          Ability resists moves of this usage method used against the Pokemon.
        </p>
        {resistsResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="usageMethods"
            key={`${parentID}_${result.id}_resist_usageMethod`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multiplier', value: result.multiplier}]}
          />
        ))}
      </div>)}
    </>
  );
}