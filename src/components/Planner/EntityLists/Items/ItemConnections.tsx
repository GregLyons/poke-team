import {
  Link,
} from "react-router-dom";

import {
  ItemEffectEdge,
  ItemEffectQuery,

  ItemFieldStateEdge,
  ItemFieldStateQuery,
  ItemStatusEdge,
  ItemStatusQuery,
} from "../../../../types-queries/Item";
import {
  ListRenderArgs,
} from "../helpers";

export const listRenderItemEffect = ({ data, }: ListRenderArgs<ItemEffectQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  return (
    <>
      {data.itemByName[0].effects.edges.map((effectEdge: ItemEffectEdge) => (
        <div>
          <Link to={`../effects/${effectEdge.node.name}`}>{effectEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  )
}

export const listRenderItemFieldState = ({ data, }: ListRenderArgs<ItemFieldStateQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const activatedByEdges = data.itemByName[0].activatedByFieldState.edges;
  const extendsEdges = data.itemByName[0].extendsFieldState.edges;
  const ignoresEdges = data.itemByName[0].ignoresFieldState.edges;
  const resistsEdges = data.itemByName[0].resistsFieldState.edges;

  return (
    <>
      {activatedByEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Activates field state</h3>
        {activatedByEdges.map((fieldStateEdge: ItemFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {extendsEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Extends field state</h3>
        <p className="planner__accordion-clarification">
          When the owner of this item creates the field state, the field state will last for a greater number of turns than usual.
        </p>
        {extendsEdges.map((fieldStateEdge: ItemFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {ignoresEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Ignores field state</h3>
        <p className="planner__accordion-clarification">
          Item allows the owner to ignore the effects of the field state.
        </p>
        {ignoresEdges.map((fieldStateEdge: ItemFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {resistsEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resists field state</h3>
        <p className="planner__accordion-clarification">
          Effects of the field state on the owner of the item are weakened (e.g. less damage).
        </p>
        {resistsEdges.map((fieldStateEdge: ItemFieldStateEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
    </>
  )
}

export const listRenderItemStatus = ({ data, }: ListRenderArgs<ItemStatusQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const causesStatusEdges = data.itemByName[0].causesStatus.edges;
  const resistsStatusEdges = data.itemByName[0].resistsStatus.edges;

  return (
    <>
      {causesStatusEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Causes status</h3>
        {causesStatusEdges.map((statusEdge: ItemStatusEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../statuses/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {resistsStatusEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resists status</h3>
        {resistsStatusEdges.map((statusEdge: ItemStatusEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../statuses/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
    </>
  );
}