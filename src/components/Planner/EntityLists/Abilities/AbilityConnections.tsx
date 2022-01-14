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
      <>
        <h3>Activates field state</h3>
        {activatedByEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {createsEdges.length > 0 && (
      <>
        <h3>Creates field state</h3>
        {createsEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {ignoresEdges.length > 0 && (
      <>
        <h3>Ignores field state</h3>
        {ignoresEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {preventsEdges.length > 0 && (
      <>
        <h3>Prevents field state</h3>
        {preventsEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {removesEdges.length > 0 && (
      <>
        <h3>Removes field state</h3>
        {removesEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {suppressesEdges.length > 0 && (
      <>
        <h3>Suppresses field state</h3>
        {suppressesEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
    </>
  )
}