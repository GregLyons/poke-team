import { ListRenderArgs, ListRenderArgsIcons } from "../../../hooks/Searches";
import {
  StatusAbilityQuery, StatusAbilityResult, StatusFieldStateQuery, StatusFieldStateResult, StatusItemQuery, StatusItemResult, StatusMoveQuery, StatusMoveResult
} from "../../../types-queries/Planner/Status";
import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";

export const listRenderStatusAbility = ({ data, dispatches, filters, }: ListRenderArgsIcons<StatusAbilityQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);

  const parent = data.statusByName[0];

  const causedByResults = parent.causedByAbility.edges.map(edge => new StatusAbilityResult(edge));
  const resistedByResults = parent.resistedByAbility.edges.map(edge => new StatusAbilityResult(edge));

  return (
    <ul className="planner-accordion__subitem-list">
      {causedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Caused by ability</h3>
        <ul className="planner-accordion__subitem-results">
          {causedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Status"
              targetEntityClass="Ability"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[{key: '%', title: 'Chance', value: result.chance || 0}]}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData,
                filters,
                cartNote: `'${result.formattedName}' causes '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {resistedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by ability</h3>
        <p className="planner-accordion__clarification">
          Ability fully cures this status, prevents it, or mitigates it in some way.
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Status"
              targetEntityClass="Ability"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData,
                filters,
                cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
    </ul>
  );
}

export const listRenderStatusFieldState = ({ data, }: ListRenderArgs<StatusFieldStateQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);

  const parent = data.statusByName[0];

  const causedByResults = parent.causedByFieldState.edges.map(edge => new StatusFieldStateResult(edge));
  const resistedByResults = parent.resistedByFieldState.edges.map(edge => new StatusFieldStateResult(edge));

  return (
    <ul className="planner-accordion__subitem-list">
      {causedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Caused by field state</h3>
        <ul className="planner-accordion__subitem-results">
          {causedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Status"
              targetEntityClass="Field state"
              key={result.id}
              icons={{
                linkIconDatum: {
                  iconClass: 'fieldState',
                  iconDatum: result.iconDatum,
                }
              }}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[{key: '%', title: 'Chance', value: result.chance || 0}]}
            />
          ))}
        </ul>
      </li>)}
      {resistedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by field state</h3>
        <p className="planner-accordion__clarification">
          Field state fully cures this status, prevents it, or mitigates it in some way.
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Status"
              targetEntityClass="Field state"
              key={result.id}
              icons={{
                linkIconDatum: {
                  iconClass: 'fieldState',
                  iconDatum: result.iconDatum,
                }
              }}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
            />
          ))}
        </ul>
      </li>)}
    </ul>
  );
}

export const listRenderStatusItem = ({ data, dispatches, filters, }: ListRenderArgsIcons<StatusItemQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);

  const parent = data.statusByName[0];

  const causedByResults = parent.causedByItem.edges.map(edge => new StatusItemResult(edge));
  const resistedByResults = parent.resistedByItem.edges.map(edge => new StatusItemResult(edge));

  return (
    <ul className="planner-accordion__subitem-list">
      {causedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Caused by item</h3>
        <ul className="planner-accordion__subitem-results">
          {causedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Status"
              targetEntityClass="Item"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[{key: '%', title: 'Chance', value: result.chance || 0}]}
              icons={{
                dispatches,
                pokemonIconData: result.requiredPokemonIconData,
                linkIconDatum: {
                  iconClass: 'item',
                  iconDatum: result.itemIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' causes '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {resistedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by item</h3>
        <p className="planner-accordion__clarification">
          Item fully cure this status, prevents it, or mitigates it in some way.
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Status"
              targetEntityClass="Item"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.requiredPokemonIconData,
                linkIconDatum: {
                  iconClass: 'item',
                  iconDatum: result.itemIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
    </ul>
  );
}

export const listRenderStatusMove = ({ data, dispatches, filters, }: ListRenderArgsIcons<StatusMoveQuery>) => {
  if (!data || !data.statusByName) return (<div>Data not found for the query 'statusByName'.</div>);

  const parent = data.statusByName[0];

  const causedByResults = parent.causedByMove.edges.map(edge => new StatusMoveResult(edge));
  const resistedByResults = parent.resistedByMove.edges.map(edge => new StatusMoveResult(edge));

  return (
    <ul className="planner-accordion__subitem-list">
      {causedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Caused by move</h3>
        <ul className="planner-accordion__subitem-results">
          {causedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Status"
              targetEntityClass="Move"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[{key: '%', title: 'Chance', value: result.chance || 0}]}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData,
                linkIconDatum: {
                  iconClass: 'type',
                  iconDatum: result.typeIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' causes '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {resistedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by move</h3>
        <p className="planner-accordion__clarification">
          Move fully cure this status, prevents it, or mitigates it in some way.
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Status"
              targetEntityClass="Move"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData,
                linkIconDatum: {
                  iconClass: 'type',
                  iconDatum: result.typeIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
    </ul>
  );
}