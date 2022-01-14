import {
  Link,
} from "react-router-dom";

import {
  EffectAbilityEdge,
  EffectAbilityQuery,

  EffectFieldStateEdge,
  EffectFieldStateQuery,

  EffectItemEdge,
  EffectItemQuery,

  EffectMoveEdge,
  EffectMoveQuery
} from "../../../../types-queries/Effect";
import {
  ListRenderArgs,
} from "../helpers";

export const listRenderEffectAbility = ({ data, }: ListRenderArgs<EffectAbilityQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);
  return (
    <>
      {data.effectByName[0].abilities.edges.map((abilityEdge: EffectAbilityEdge) => (
        <div>
          <Link to={`../abilities/${abilityEdge.node.name}`}>{abilityEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  );
}

export const listRenderEffectFieldState = ({ data, }: ListRenderArgs<EffectFieldStateQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);
  return (
    <>
      {data.effectByName[0].fieldStates.edges.map((FieldStateEdge: EffectFieldStateEdge) => (
        <div>
          <Link to={`../fieldStates/${FieldStateEdge.node.name}`}>{FieldStateEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  );
}

export const listRenderEffectItem = ({ data, }: ListRenderArgs<EffectItemQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);
  return (
    <>
      {data.effectByName[0].items.edges.map((itemEdge: EffectItemEdge) => (
        <div>
          <Link to={`../items/${itemEdge.node.name}`}>{itemEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  );
}

export const listRenderEffectMove = ({ data, }: ListRenderArgs<EffectMoveQuery>) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);
  return (
    <>
      {data.effectByName[0].moves.edges.map((moveEdge: EffectMoveEdge) => (
        <div>
          <Link to={`../moves/${moveEdge.node.name}`}>{moveEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  );
}