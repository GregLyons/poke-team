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
  FieldStateStatusEdge,
  FieldStateStatusQuery,
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
      <div className="planner__accordion-content--positive">
        <h3>Activates ability</h3>
        {activatesEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {createdByEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Created by ability</h3>
        {createdByEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {ignoredByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Ignored by ability</h3>
        <p className="planner__accordion-clarification">
          Effects of field state ignored by owner of the ability.
        </p>
        {ignoredByEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {preventedByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Prevented by ability</h3>
        <p className="planner__accordion-clarification">
          Ability prevents the field state from being set up, but does not remove it if the field state is already present.
        </p>
        {preventedByEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {removedByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Removed by ability</h3>
        <p className="planner__accordion-clarification">
          Ability removes the field state entirely.
        </p>
        {removedByEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {suppressedByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Suppressed by ability</h3>
        <p className="planner__accordion-clarification">
          Effects are suppressed while the ability is present, but the field state is not removed entirely.
        </p>
        {suppressedByEdges.map((fieldStateEdge: FieldStateAbilityEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
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
      <div className="planner__accordion-content--positive">
        <h3>Activates item</h3>
        {activatesEdges.map((itemEdge: FieldStateItemEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../items/${itemEdge.node.name}`}>{itemEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {extendedByEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Extended by item</h3>
        <p className="planner__accordion-clarification">
          When the owner of the item creates this field state, the field state will last for a greater number of turns than usual.
        </p>
        {extendedByEdges.map((itemEdge: FieldStateItemEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../items/${itemEdge.node.name}`}>{itemEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {ignoredByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Ignored by item</h3>
        <p className="planner__accordion-clarification">
          Item allows the owner to ignore the effects of the field state.
        </p>
        {ignoredByEdges.map((itemEdge: FieldStateItemEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../items/${itemEdge.node.name}`}>{itemEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {resistedByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resisted by item</h3>
        <p className="planner__accordion-clarification">
          Effects of the field state on the owner of the item are weakened (e.g. less damage).
        </p>
        {resistedByEdges.map((itemEdge: FieldStateItemEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../items/${itemEdge.node.name}`}>{itemEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
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
      <div className="planner__accordion-content--positive">
        <h3>Created by move</h3>
        {createdByEdges.map((moveEdge: FieldStateMoveEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../moves/${moveEdge.node.name}`}>{moveEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {enhancesEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Enhances move</h3>
        <p className="planner__accordion-clarification">
          Presence of the field state increases the effectiveness of the move in some way.
        </p>
        {enhancesEdges.map((moveEdge: FieldStateMoveEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../moves/${moveEdge.node.name}`}>{moveEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {hindersEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Hinders move</h3>
        <p className="planner__accordion-clarification">
          Presence of the field state reduces the effectiveness of the move in some way.
        </p>
        {hindersEdges.map((moveEdge: FieldStateMoveEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../moves/${moveEdge.node.name}`}>{moveEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {removedByEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Removed by move</h3>
        {removedByEdges.map((moveEdge: FieldStateMoveEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../moves/${moveEdge.node.name}`}>{moveEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
    </>
  );
}

export const listRenderFieldStateStatus = ({ data, }: ListRenderArgs<FieldStateStatusQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const causesStatusEdges = data.fieldStateByName[0].causesStatus.edges;
  const resistsStatusEdges = data.fieldStateByName[0].resistsStatus.edges;

  return (
    <>
      {causesStatusEdges.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Causes status</h3>
        {causesStatusEdges.map((statusEdge: FieldStateStatusEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../statuses/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
      {resistsStatusEdges.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resists status</h3>
        {resistsStatusEdges.map((statusEdge: FieldStateStatusEdge) => (
          <div className="planner__accordion-entry">
            <Link to={`../statuses/${statusEdge.node.name}`}>{statusEdge.node.formattedName}</Link>
          </div>
        ))}
      </div>)}
    </>
  );
}