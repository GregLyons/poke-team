import {
  Link,
} from "react-router-dom";

import {
  ItemEffectEdge,
  ItemEffectQuery,

  ItemFieldStateEdge,
  ItemFieldStateQuery,
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
      <>
        <h3>Activates field state</h3>
        {activatedByEdges.map((fieldStateEdge: ItemFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {extendsEdges.length > 0 && (
      <>
        <h3>Extends field state</h3>
        {extendsEdges.map((fieldStateEdge: ItemFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {ignoresEdges.length > 0 && (
      <>
        <h3>Ignores field state</h3>
        {ignoresEdges.map((fieldStateEdge: ItemFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {resistsEdges.length > 0 && (
      <>
        <h3>Resists field state</h3>
        {resistsEdges.map((fieldStateEdge: ItemFieldStateEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
    </>
  )
}