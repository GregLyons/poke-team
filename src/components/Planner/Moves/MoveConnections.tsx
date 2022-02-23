import { ListRenderArgs, ListRenderArgsIcons } from "../../../hooks/Searches";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../types-queries/helpers";
import {
  MoveEffectResult,
  MoveEffectQuery,

  MoveFieldStateResult,
  MoveFieldStateQuery,
  
  MoveStatResult,
  MoveStatQuery,

  MoveStatusResult,
  MoveStatusQuery,

  MoveTypeQuery,
  MoveTypeResult,

  MoveUsageMethodQuery,
  MoveUsageMethodResult,
} from "../../../types-queries/Planner/Move";
import { ENUMCASE_TO_TITLECASE } from "../../../utils/constants";
import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";

export const listRenderMoveEffect = ({ data, }: ListRenderArgs<MoveEffectQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const effectResults = parent.effects.edges.map(edge => new MoveEffectResult(edge));

  return (
    <>
      <div className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        {effectResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Move"
            targetEntityClass="Effect"
            key={`${parent.id}_${result.id}_effect`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>
    </>
  )
}

export const listRenderMoveFieldState = ({ data, }: ListRenderArgs<MoveFieldStateQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const createsResults = parent.createsFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const enhancedByResults = parent.enhancedByFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const hinderedByResults = parent.hinderedByFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const removesResults = parent.removesFieldState.edges.map(edge => new MoveFieldStateResult(edge));

  return (
    <>
      {createsResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Creates field state</h3>
        {createsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_create_fieldState`}
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
      </div>)}
      {enhancedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Enhanced by field state</h3>
        {enhancedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_enhance_fieldState`}
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
      </div>)}
      {hinderedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Hindered by field state</h3>
        {hinderedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_hinder_fieldState`}
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
      </div>)}
      {removesResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Removes field state</h3>
        {removesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_remove_fieldState`}
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
      </div>)}
    </>
  )
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
    <>
      {boostStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Stat"
            key={`${parent.id}_${result.id}_boost_stage_stat`}
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
      </div>)}
      {boostMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Stat"
            key={`${parent.id}_${result.id}_boost_multiplier_stat`}
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
      </div>)}
      {reduceStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Stat"
            key={`${parent.id}_${result.id}_reduce_stage_stat`}
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
      </div>)}
      {reduceMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Stat"
            key={`${parent.id}_${result.id}_reduce_multiplier_stat`}
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
      </div>)}
    </>
  );
}

export const listRenderMoveStatus = ({ data, }: ListRenderArgs<MoveStatusQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const causesResults = parent.causesStatus.edges.map(edge => new MoveStatusResult(edge));
  const resistsResults = parent.resistsStatus.edges.map(edge => new MoveStatusResult(edge));

  return (
    <>
      {causesResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Causes status</h3>
        {causesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Status"
            key={`${parent.id}_${result.id}_cause_status`}
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
      </div>)}
      {resistsResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resists status</h3>
        <p className="planner-accordion__clarification">
          The move fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        {resistsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Status"
            key={`${parent.id}_${result.id}_resist_status`}
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
      </div>)}
    </>
  );
}

export const listRenderMoveType = ({ data, dispatches, filters, }: ListRenderArgsIcons<MoveTypeQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const requiresResults = parent.requiresType.edges.map(edge => new MoveTypeResult(edge));

  return (
    <>
      {requiresResults.length > 0 && (
      <div className="planner-accordion__subitem">
        <h3 className="planner-accordion__subitem-header">Requires type</h3>
        <p className="planner-accordion__clarification">
          This move requires another move of the listed type as its base move.
        </p>
        {requiresResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Type"
            key={`${parent.id}_${result.id}_require_type`}
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
      </div>)}
    </>
  );
}

export const listRenderMoveUsageMethod = ({ data, }: ListRenderArgs<MoveUsageMethodQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const hasResults = parent.usageMethods.edges.map(edge => new MoveUsageMethodResult(edge));
  const preventsResults = parent.preventsUsageMethod.edges.map(edge => new MoveUsageMethodResult(edge));

  return (
    <>
      {hasResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Has usage method</h3>
        {hasResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Usage method"
            key={`${parent.id}_${result.id}_has_usageMethod`}
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
      </div>)}
      {preventsResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Prevents usage method</h3>
        <p className="planner-accordion__subitem-positive">
          This move can prevent other Pokemon from using moves of the listed usage method.
        </p>
        {preventsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Usage method"
            key={`${parent.id}_${result.id}_prevent_usageMethod`}
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
      </div>)}
    </>
  )
}