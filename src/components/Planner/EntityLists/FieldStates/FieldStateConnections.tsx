import {
  Link,
} from "react-router-dom";
import {
  FieldStateAbilityEdge,
  FieldStateAbilityQuery,

  FieldStateEffectEdge,
  FieldStateEffectQuery,

  FieldStateItemEdge,
  FieldStateItemQuery,

  FieldStateMoveEdge,
  FieldStateMoveQuery,
} from "../../../../types-queries/FieldState";
import {
  ListRenderArgs,
} from "../helpers";

let a: FieldStateAbilityQuery

export const listRenderFieldStateAbility = ({ data, }: ListRenderArgs<FieldStateAbilityQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const activatesEdges = data.fieldStateByName[0].activatesAbility.edges;
  const createdByEdges = data.fieldStateByName[0].createdByAbility.edges;
  const ignoredByEdges = data.fieldStateByName[0].ignoredByAbility.edges;
  const preventedByEdges = data.fieldStateByName[0].preventedByAbility.edges;
  const removedByEdges = data.fieldStateByName[0].removedByAbility.edges;
  const suppressedByEdges = data.fieldStateByName[0].suppressedByAbility.edges;

  return (
    <>
      {activatesEdges.length > 0 && (
      <>
        <h3>Activates ability</h3>
        {activatesEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {createdByEdges.length > 0 && (
      <>
        <h3>Created by ability</h3>
        {createdByEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {ignoredByEdges.length > 0 && (
      <>
        <h3>Ignored by ability</h3>
        {ignoredByEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {preventedByEdges.length > 0 && (
      <>
        <h3>Prevented by ability</h3>
        {preventedByEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {removedByEdges.length > 0 && (
      <>
        <h3>Removed by ability</h3>
        {removedByEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {suppressedByEdges.length > 0 && (
      <>
        <h3>Suppressed by ability</h3>
        {suppressedByEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div>
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
    </>
  );
}

export const listRenderFieldStateEffect = ({ data, }: ListRenderArgs<FieldStateEffectQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  return (
    <>
      {data.fieldStateByName[0].effects.edges.map((effectEdge: FieldStateEffectEdge) => (
        <div>
          <Link to={`../effects/${effectEdge.node.name}`}>{effectEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  )
}



export const listRenderFieldStateItem = ({ data, }: ListRenderArgs<FieldStateItemQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const activatesEdges = data.fieldStateByName[0].activatesItem.edges
  const extendedByEdges = data.fieldStateByName[0].extendedByItem.edges
  const ignoredByEdges = data.fieldStateByName[0].ignoredByItem.edges
  const resistedByEdges = data.fieldStateByName[0].resistedByItem.edges

  return (
    <>
      {activatesEdges.length > 0 && (
      <>
        <h3>Activates item</h3>
        {activatesEdges.map((itemEdge: FieldStateItemEdge) => (
          <div>
            <Link to={`../items/${itemEdge.node.name}`}>{itemEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {extendedByEdges.length > 0 && (
      <>
        <h3>Extended by item</h3>
        {extendedByEdges.map((itemEdge: FieldStateItemEdge) => (
          <div>
            <Link to={`../items/${itemEdge.node.name}`}>{itemEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {ignoredByEdges.length > 0 && (
      <>
        <h3>Ignored by item</h3>
        {ignoredByEdges.map((itemEdge: FieldStateItemEdge) => (
          <div>
            <Link to={`../items/${itemEdge.node.name}`}>{itemEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {resistedByEdges.length > 0 && (
      <>
        <h3>Resisted by item</h3>
        {resistedByEdges.map((itemEdge: FieldStateItemEdge) => (
          <div>
            <Link to={`../items/${itemEdge.node.name}`}>{itemEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
    </>
  );
}

export const listRenderFieldStateMove = ({ data, }: ListRenderArgs<FieldStateMoveQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const createdByEdges = data.fieldStateByName[0].createdByMove.edges;
  const enhancesEdges = data.fieldStateByName[0].enhancesMove.edges;
  const hindersEdges = data.fieldStateByName[0].hindersMove.edges;
  const removedByEdges = data.fieldStateByName[0].removedByMove.edges;

  return (
    <>
      {createdByEdges.length > 0 && (
      <>
        <h3>Created by move</h3>
        {createdByEdges.map((moveEdge: FieldStateMoveEdge) => (
          <div>
            <Link to={`../moves/${moveEdge.node.name}`}>{moveEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {enhancesEdges.length > 0 && (
      <>
        <h3>Enhances move</h3>
        {enhancesEdges.map((moveEdge: FieldStateMoveEdge) => (
          <div>
            <Link to={`../moves/${moveEdge.node.name}`}>{moveEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {hindersEdges.length > 0 && (
      <>
        <h3>Hinders move</h3>
        {hindersEdges.map((moveEdge: FieldStateMoveEdge) => (
          <div>
            <Link to={`../moves/${moveEdge.node.name}`}>{moveEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
      {removedByEdges.length > 0 && (
      <>
        <h3>Removed by move</h3>
        {removedByEdges.map((moveEdge: FieldStateMoveEdge) => (
          <div>
            <Link to={`../moves/${moveEdge.node.name}`}>{moveEdge.node.formattedName}</Link>
          </div>
        ))}
      </>)}
    </>
  );
}