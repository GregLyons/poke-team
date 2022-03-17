import { ListRenderArgs, ListRenderArgsIcons } from "../../../hooks/Searches";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../types-queries/helpers";
import {
  MoveEffectQuery, MoveEffectResult, MoveFieldStateQuery, MoveFieldStateResult, MoveStatQuery, MoveStatResult, MoveStatusQuery, MoveStatusResult, MoveTypeQuery,
  MoveTypeResult,

  MoveUsageMethodQuery,
  MoveUsageMethodResult
} from "../../../types-queries/Planner/Move";
import { ENUMCASE_TO_TITLECASE } from "../../../utils/constants";
import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";

export const listRenderMoveEffect = ({ data, }: ListRenderArgs<MoveEffectQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const effectResults = parent.effects.edges.map(edge => new MoveEffectResult(edge));

  return (
    <ul className="planner-accordion__sub-item-list">
      <li className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        <ul className="planner-accordion__sub-item-results">
          {effectResults.map(result => (
            <ConnectionAccordionEntry
                parentEntityClass="Move"
              targetEntityClass="Effect"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
            />
          ))}
        </ul>
      </li>
    </ul>
  );
}

export const listRenderMoveFieldState = ({ data, }: ListRenderArgs<MoveFieldStateQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const createsResults = parent.createsFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const enhancedByResults = parent.enhancedByFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const hinderedByResults = parent.hinderedByFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const removesResults = parent.removesFieldState.edges.map(edge => new MoveFieldStateResult(edge));

  return (
    <ul className="planner-accordion__sub-item-list">
      {createsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Creates field state</h3>
        <ul className="planner-accordion__sub-item-results">
          {createsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
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
              data={[{key: 'TURN', title: 'Turns', value: result.turns || 0}]}
            />
          ))}
        </ul>
      </li>)}
      {enhancedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Enhanced by field state</h3>
        <ul className="planner-accordion__sub-item-results">
          {enhancedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
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
      {hinderedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Hindered by field state</h3>
        <ul className="planner-accordion__sub-item-results">
          {hinderedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
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
      {removesResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Removes field state</h3>
        <ul className="planner-accordion__sub-item-results">
          {removesResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
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

export const listRenderMoveStat = ({ data, }: ListRenderArgs<MoveStatQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const statResults = parent.modifiesStat.edges.map(edge => new MoveStatResult(edge));
  const boostStageResults = statResults.filter(result => result.stage > 0);
  const reduceStageResults = statResults.filter(result => result.stage < 0);
  const boostMultiplierResults = statResults.filter(result => result.multiplier > 1);
  const reduceMultiplierResults = statResults.filter(result => result.multiplier < 1);

  return (
    <ul className="planner-accordion__sub-item-list">
      {boostStageResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        <ul className="planner-accordion__sub-item-results">
          {boostStageResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
              targetEntityClass="Stat"
              key={result.id}
              icons={{
                linkIconDatum: {
                  iconClass: 'stat',
                  iconDatum: result.iconDatum,
                }
              }}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[
                {
                  key: 'STAGE', title: 'Stage', value: result.stage,
                },
                {
                  key: '%', title: 'Chance', value: result.chance,
                },
                {
                  key: 'REC', title: 'Recipient', value: ENUMCASE_TO_TITLECASE(result.recipient),
                },
              ]}
            />
          ))}
        </ul>
      </li>)}
      {boostMultiplierResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by multiplier</h3>
        <ul className="planner-accordion__sub-item-results">
          {boostMultiplierResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
              targetEntityClass="Stat"
              key={result.id}
              icons={{
                linkIconDatum: {
                  iconClass: 'stat',
                  iconDatum: result.iconDatum,
                }
              }}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[
                {
                  key: 'MULT', title: 'Multiplier', value: result.multiplier,
                },
                {
                  key: '%', title: 'Chance', value: result.chance,
                },
                {
                  key: 'REC', title: 'Recipient', value: ENUMCASE_TO_TITLECASE(result.recipient),
                },
              ]}
            />
          ))}
        </ul>
      </li>)}
      {reduceStageResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by stage</h3>
        <ul className="planner-accordion__sub-item-results">
          {reduceStageResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
              targetEntityClass="Stat"
              key={result.id}
              icons={{
                linkIconDatum: {
                  iconClass: 'stat',
                  iconDatum: result.iconDatum,
                }
              }}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[
                {
                  key: 'STAGE', title: 'Stage', value: result.stage,
                },
                {
                  key: '%', title: 'Chance', value: result.chance,
                },
                {
                  key: 'REC', title: 'Recipient', value: ENUMCASE_TO_TITLECASE(result.recipient),
                },
              ]}
            />
          ))}
        </ul>
      </li>)}
      {reduceMultiplierResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by multiplier</h3>
        <ul className="planner-accordion__sub-item-results">
          {reduceMultiplierResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
              targetEntityClass="Stat"
              key={result.id}
              icons={{
                linkIconDatum: {
                  iconClass: 'stat',
                  iconDatum: result.iconDatum,
                }
              }}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[
                {
                  key: 'MULT', title: 'Multiplier', value: result.multiplier,
                },
                {
                  key: '%', title: 'Chance', value: result.chance,
                },
                {
                  key: 'REC', title: 'Recipient', value: ENUMCASE_TO_TITLECASE(result.recipient),
                },
              ]}
            />
          ))}
        </ul>
      </li>)}
    </ul>
  );
}

export const listRenderMoveStatus = ({ data, }: ListRenderArgs<MoveStatusQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const causesResults = parent.causesStatus.edges.map(edge => new MoveStatusResult(edge));
  const resistsResults = parent.resistsStatus.edges.map(edge => new MoveStatusResult(edge));

  return (
    <ul className="planner-accordion__sub-item-list">
      {causesResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Causes status</h3>
        <ul className="planner-accordion__sub-item-results">
          {causesResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
              targetEntityClass="Status"
              key={result.id}
              icons={{
                linkIconDatum: {
                  iconClass: 'status',
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
      {resistsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resists status</h3>
        <p className="planner-accordion__clarification">
          The move fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        <ul className="planner-accordion__sub-item-results">
          {resistsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
              targetEntityClass="Status"
              key={result.id}
              icons={{
                linkIconDatum: {
                  iconClass: 'status',
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

export const listRenderMoveType = ({ data, dispatches, filters, }: ListRenderArgsIcons<MoveTypeQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const requiresResults = parent.requiresType.edges.map(edge => new MoveTypeResult(edge));

  return (
    <ul className="planner-accordion__sub-item-list">
      {requiresResults.length > 0 && (
      <li className="planner-accordion__subitem">
        <h3 className="planner-accordion__subitem-header">Requires type</h3>
        <p className="planner-accordion__clarification">
          This move requires another move of the listed type as its base move.
        </p>
        <ul className="planner-accordion__sub-item-results">
          {requiresResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
              targetEntityClass="Type"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                pokemonIconData: [DUMMY_POKEMON_ICON_DATUM],
                linkIconDatum: {
                  iconClass: 'type',
                  iconDatum: result.typeIconDatum
                },
                dispatches,
                filters,
                cartNote: ``,
              }}
            />
          ))}
        </ul>
      </li>)}
    </ul>
  );
}

export const listRenderMoveUsageMethod = ({ data, }: ListRenderArgs<MoveUsageMethodQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const hasResults = parent.usageMethods.edges.map(edge => new MoveUsageMethodResult(edge));
  const preventsResults = parent.preventsUsageMethod.edges.map(edge => new MoveUsageMethodResult(edge));

  return (
    <ul className="planner-accordion__sub-item-list">
      {hasResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Has usage method</h3>
        <ul className="planner-accordion__sub-item-results">
          {hasResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
              targetEntityClass="Usage method"
              key={result.id}
              icons={{
                linkIconDatum: {
                  iconClass: 'usageMethod',
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
      {preventsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Prevents usage method</h3>
        <p className="planner-accordion__subitem-positive">
          This move can prevent other Pokemon from using moves of the listed usage method.
        </p>
        <ul className="planner-accordion__sub-item-results">
          {preventsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Move"
              targetEntityClass="Usage method"
              key={result.id}
              icons={{
                linkIconDatum: {
                  iconClass: 'usageMethod',
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
  )
}