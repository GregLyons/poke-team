import {
  Link,
} from "react-router-dom";

import {
  MoveEffectEdge,
  MoveEffectQuery,

  MoveFieldStateEdge,
  MoveFieldStateQuery,
  MoveStatusEdge,
  MoveStatusQuery,
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
      <div className="planner__accordion-content--positive">
        <h3>Creates field state</h3>
        {createsEdges.map((fieldStateEdge: MoveFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {enhancedByEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Enhanced by field state</h3>
        {enhancedByEdges.map((fieldStateEdge: MoveFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {hinderedByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Hindered by field state</h3>
        {hinderedByEdges.map((fieldStateEdge: MoveFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {removesEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Removes field state</h3>
        {removesEdges.map((fieldStateEdge: MoveFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
    </>
  )
}

export const listRenderMoveStatus = ({ data, }: ListRenderArgs<MoveStatusQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const causesStatusEdges = data.moveByName[0].causesStatus.edges;
  const resistsStatusEdges = data.moveByName[0].resistsStatus.edges;

  return (
    <>
      {causesStatusEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Causes status</h3>
        {causesStatusEdges.map((statusEdge: MoveStatusEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../statuses/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {resistsStatusEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resists status</h3>
        {resistsStatusEdges.map((statusEdge: MoveStatusEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../statuses/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
    </>
  );
}