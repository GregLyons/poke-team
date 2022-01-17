import {
  Link,
} from "react-router-dom";

import {
  AbilityEffectEdge,
  AbilityEffectQuery,
  AbilityFieldStateEdge,
  AbilityFieldStateQuery,
} from "../../../../types-queries/Ability";
import {
  ListRenderArgs,
} from "../helpers";

export const listRenderAbilityEffect = ({ data, }: ListRenderArgs<AbilityEffectQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  return (
    <>
      {data.abilityByName[0].effects.edges.map((effectEdge: AbilityEffectEdge) => (
        <div>
          <Link to={`../effects/${effectEdge.node.name}`}>{effectEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  )
}

export const listRenderAbilityFieldState = ({ data, }: ListRenderArgs<AbilityFieldStateQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const activatedByEdges = data.abilityByName[0].activatedByFieldState.edges;
  const createsEdges = data.abilityByName[0].createsFieldState.edges;
  const ignoresEdges = data.abilityByName[0].ignoresFieldState.edges;
  const preventsEdges = data.abilityByName[0].preventsFieldState.edges;
  const removesEdges = data.abilityByName[0].removesFieldState.edges;
  const suppressesEdges = data.abilityByName[0].suppressesFieldState.edges;

  return (
    <>
      {activatedByEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Activated by field state</h3>
        {activatedByEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {createsEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Creates field state</h3>
        {createsEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {ignoresEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Ignores field state</h3>
        <p className="planner__accordion-clarification">
          Ability allows the owner to ignore the effects of the field state.
        </p>
        {ignoresEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {preventsEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Prevents field state</h3>
        <p className="planner__accordion-clarification">
          Prevents the field state from being set up while in play, but does not remove field states which are already present.
        </p>
        {preventsEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {removesEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Removes field state</h3>
        <p className="planner__accordion-clarification">
          Ability removes the field state from the field entirely.
        </p>
        {removesEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {suppressesEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Suppresses field state</h3>
        <p className="planner__accordion-clarification">
          Ability removes the effects of the field state while in play, but does not remove the field state entirely.
        </p>
        {suppressesEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
    </>
  )
}