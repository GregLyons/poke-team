import {
  AbilityEffectQuery,
  AbilityEffectResult,
  AbilityFieldStateQuery,
  AbilityFieldStateResult,
  AbilityStatusQuery,
  AbilityStatusResult,
} from "../../../../types-queries/Ability";
import {
  ListRenderArgs,
} from "../helpers";

import EntityAccordionEntry from "../EntityAccordionEntry";

export const listRenderAbilityEffect = ({ data, }: ListRenderArgs<AbilityEffectQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parentID = data.abilityByName[0].id;

  const effectResults = data.abilityByName[0].effects.edges.map(edge => new AbilityEffectResult(edge));
  
  return (
    <>
      {effectResults.map(result => (
        <EntityAccordionEntry
          parentEntityClass="abilities"
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
      <div className="planner__accordion-content--positive">
        <h3>Activated by field state</h3>
        {activatedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="abilities"
            key={`${parentID}_${result.id}_activate_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {createsResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Creates field state</h3>
        {createsResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="abilities"
            key={`${parentID}_${result.id}_create_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
          />
        ))}
      </div>)}
      {ignoresResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Ignores field state</h3>
        <p className="planner__accordion-clarification">
          Ability allows the owner to ignore the effects of the field state.
        </p>
        {ignoresResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="abilities"
            key={`${parentID}_${result.id}_ignore_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {preventsResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Prevents field state</h3>
        <p className="planner__accordion-clarification">
          Prevents the field state from being set up while in play, but does not remove field states which are already present.
        </p>
        {preventsResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="abilities"
            key={`${parentID}_${result.id}_prevent_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {removesResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Removes field state</h3>
        <p className="planner__accordion-clarification">
          Ability removes the field state from the field entirely.
        </p>
        {removesResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="abilities"
            key={`${parentID}_${result.id}_remove_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {suppressesResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Suppresses field state</h3>
        <p className="planner__accordion-clarification">
          Ability removes the effects of the field state while in play, but does not remove the field state entirely.
        </p>
        {suppressesResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="abilities"
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

export const listRenderAbilityStatus = ({ data, }: ListRenderArgs<AbilityStatusQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parentID = data.abilityByName[0].id;

  const causesResults = data.abilityByName[0].causesStatus.edges.map(edge => new AbilityStatusResult(edge));
  const resistsResults = data.abilityByName[0].resistsStatus.edges.map(edge => new AbilityStatusResult(edge));

  return (
    <>
      {causesResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Causes status</h3>
        {causesResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="abilities"
            key={`${parentID}_${result.id}_cause_status`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
          />
        ))}
      </div>)}
      {resistsResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resists status</h3>
        <p className="planner__accordion-clarification">
          The ability fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        {causesResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="abilities"
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