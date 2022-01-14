import {
  Link,
} from "react-router-dom";

import {
  MoveEffectEdge,
  MoveEffectQuery,

  MoveFieldStateEdge,
  MoveFieldStateQuery,
} from "../../../../types-queries/Move";

import {
  ListRenderArgs,
} from "../helpers";

let a: MoveEffectEdge
export const listRenderMoveEffect = ({ data, }: ListRenderArgs<MoveEffectQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  return (
    <>
      {data.moveByName[0].effects.edges.map((effectEdge: MoveEffectEdge) => (
        <div>
          <Link to={`../effects/${effectEdge.node.name}`}>{effectEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  )
}

export const listRenderMoveFieldState = ({ data, }: ListRenderArgs<MoveFieldStateQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const createsEdges = data.moveByName[0].createsFieldState.edges;
  const enhancedByEdges = data.moveByName[0].enhancedByFieldState.edges;
  const hinderedByEdges = data.moveByName[0].hinderedByFieldState.edges;
  const removesEdges = data.moveByName[0].removesFieldState.edges;

  return (
    <>
      {createsEdges.length > 0 && (
      <>
        <h3>Creates field state</h3>
        {createsEdges.map((fieldStateEdge: MoveFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {enhancedByEdges.length > 0 && (
      <>
        <h3>Enhanced by field state</h3>
        {enhancedByEdges.map((fieldStateEdge: MoveFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {hinderedByEdges.length > 0 && (
      <>
        <h3>Hindered by field state</h3>
        {hinderedByEdges.map((fieldStateEdge: MoveFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {removesEdges.length > 0 && (
      <>
        <h3>Removes field state</h3>
        {removesEdges.map((fieldStateEdge: MoveFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
    </>
  )
}