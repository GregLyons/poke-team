import {
  Link,
} from "react-router-dom";
import {
  StatusAbilityEdge,
  StatusAbilityQuery,

  StatusFieldStateEdge,
  StatusFieldStateQuery,

  StatusItemEdge,
  StatusItemQuery,

  StatusMoveEdge,
  StatusMoveQuery,
} from "../../../../types-queries/Status";
import {
  ListRenderArgs,
} from "../helpers";

let a: StatusAbilityQuery

export const listRenderStatusAbility = ({ data, }: ListRenderArgs<StatusAbilityQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);

  const causedByEdges = data.statusByName[0].causedByAbility.edges;
  const resistedByEdges = data.statusByName[0].resistedByAbility.edges;

  return (
    <>
      {causedByEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Caused by ability</h3>
        {causedByEdges.map((statusEdge: StatusAbilityEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../abilities/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {resistedByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resisted by ability</h3>
        <p className="planner__accordion-clarification">
          Ability mitigates the effects of this status in some manner.
        </p>
        {resistedByEdges.map((statusEdge: StatusAbilityEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../abilities/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatusFieldState = ({ data, }: ListRenderArgs<StatusFieldStateQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);

  const causedByEdges = data.statusByName[0].causedByFieldState.edges;
  const resistedByEdges = data.statusByName[0].resistedByFieldState.edges;

  return (
    <>
      {causedByEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Caused by field state</h3>
        {causedByEdges.map((statusEdge: StatusFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {resistedByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resisted by field state</h3>
        <p className="planner__accordion-clarification">
          Field state mitigates the effects of this status in some manner.
        </p>
        {resistedByEdges.map((statusEdge: StatusFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatusItem = ({ data, }: ListRenderArgs<StatusItemQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);

  const causedByEdges = data.statusByName[0].causedByItem.edges;
  const resistedByEdges = data.statusByName[0].resistedByItem.edges;

  return (
    <>
      {causedByEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Caused by item</h3>
        {causedByEdges.map((statusEdge: StatusItemEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../items/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {resistedByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resisted by item</h3>
        <p className="planner__accordion-clarification">
          Item mitigates the effects of this status in some manner.
        </p>
        {resistedByEdges.map((statusEdge: StatusItemEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../items/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatusMove = ({ data, }: ListRenderArgs<StatusMoveQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);

  const causedByEdges = data.statusByName[0].causedByMove.edges;
  const resistedByEdges = data.statusByName[0].resistedByMove.edges;

  return (
    <>
      {causedByEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Caused by move</h3>
        {causedByEdges.map((statusEdge: StatusMoveEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../moves/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {resistedByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resisted by move</h3>
        <p className="planner__accordion-clarification">
          Move mitigates the effects of this status in some manner.
        </p>
        {resistedByEdges.map((statusEdge: StatusMoveEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../moves/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
    </>
  );
}