import {
  StatAbilityResult,
  StatAbilityQuery,

  StatFieldStateResult,
  StatFieldStateQuery,

  StatItemResult,
  StatItemQuery,

  StatMoveResult,
  StatMoveQuery
} from "../../../../types-queries/Stat";
import {
  ListRenderArgs,
  MissingDispatchError,
} from "../helpers";

import ConnectionAccordionEntry from "../ConnectionAccordionEntry";

export const listRenderStatAbility = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<StatAbilityQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');

  const parentID = data.statByName[0].id;

  const abilityResults = data.statByName[0].modifiedByAbility.edges.map(edge => new StatAbilityResult(edge));

  return (
    <>
      {abilityResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="abilities"
          key={`${parentID}_${result.id}_ability`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
          icons={{
            dispatchCart: dispatchCart,
            dispatchTeam: dispatchTeam,
            iconData: result.pokemonIconData
          }}
        />
      ))}
    </>
  );
}

export const listRenderStatFieldState = ({ data, }: ListRenderArgs<StatFieldStateQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);

  const parentID = data.statByName[0].id;

  const fieldStateResults = data.statByName[0].modifiedByFieldState.edges.map(edge => new StatFieldStateResult(edge));

  return (
    <>
      {fieldStateResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="fieldStates"
          key={`${parentID}_${result.id}_fieldState`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
        />
      ))}
    </>
  );
}

export const listRenderStatItem = ({ data, }: ListRenderArgs<StatItemQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);

  const parentID = data.statByName[0].id;

  const itemResults = data.statByName[0].modifiedByItem.edges.map(edge => new StatItemResult(edge));

  return (
    <>
      {itemResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="items"
          key={`${parentID}_${result.id}_item`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
        />
      ))}
    </>
  );
}

export const listRenderStatMove = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<StatMoveQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');

  const parentID = data.statByName[0].id;

  const moveResults = data.statByName[0].modifiedByMove.edges.map(edge => new StatMoveResult(edge));

  return (
    <>
      {moveResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="moves"
          key={`${parentID}_${result.id}_move`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
          icons={{
            dispatchCart: dispatchCart,
            dispatchTeam: dispatchTeam,
            iconData: result.pokemonIconData
          }}
        />
      ))}
    </>
  );
}