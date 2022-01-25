import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";
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
} from "../../../../types-queries/Planner/Move";
import { ENUMCASE_TO_TITLECASE } from "../../../../utils/constants";
import ConnectionAccordionEntry from "../ConnectionAccordionEntry";

import {
  ListRenderArgs, MissingDispatchError, MissingGenError, MissingTierFilterError,
} from "../helpers";

export const listRenderMoveEffect = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<MoveEffectQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const effectResults = parent.effects.edges.map(edge => new MoveEffectResult(edge));

  return (
    <>
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
    </>
  )
}

export const listRenderMoveFieldState = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<MoveFieldStateQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const createsResults = parent.createsFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const enhancedByResults = parent.enhancedByFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const hinderedByResults = parent.hinderedByFieldState.edges.map(edge => new MoveFieldStateResult(edge));
  const removesResults = parent.removesFieldState.edges.map(edge => new MoveFieldStateResult(edge));

  return (
    <>
      {createsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Creates field state</h3>
        {createsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_create_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
          />
        ))}
      </div>)}
      {enhancedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Enhanced by field state</h3>
        {enhancedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_enhance_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {hinderedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Hindered by field state</h3>
        {hinderedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_hinder_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {removesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Removes field state</h3>
        {removesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_remove_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  )
}

export const listRenderMoveStat = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<MoveStatQuery>) => {
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
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Stat"
            key={`${parent.id}_${result.id}_boost_stage_stat`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[
              {
                key: 'Stage', value: result.stage,
              },
              {
                key: 'Chance', value: result.chance,
              },
              {
                key: 'Recipient', value: ENUMCASE_TO_TITLECASE(result.recipient),
              },
            ]}
          />
        ))}
      </div>)}
      {boostMultiplierResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Stat"
            key={`${parent.id}_${result.id}_boost_multiplier_stat`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[
              {
                key: 'Multiplier', value: result.multiplier,
              },
              {
                key: 'Chance', value: result.chance,
              },
              {
                key: 'Recipient', value: ENUMCASE_TO_TITLECASE(result.recipient),
              },
            ]}
          />
        ))}
      </div>)}
      {reduceStageResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Stat"
            key={`${parent.id}_${result.id}_reduce_stage_stat`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[
              {
                key: 'Stage', value: result.stage,
              },
              {
                key: 'Chance', value: result.chance,
              },
              {
                key: 'Recipient', value: ENUMCASE_TO_TITLECASE(result.recipient),
              },
            ]}
          />
        ))}
      </div>)}
      {reduceMultiplierResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Stat"
            key={`${parent.id}_${result.id}_reduce_multiplier_stat`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[
              {
                key: 'Multiplier', value: result.multiplier,
              },
              {
                key: 'Chance', value: result.chance,
              },
              {
                key: 'Recipient', value: ENUMCASE_TO_TITLECASE(result.recipient),
              },
            ]}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderMoveStatus = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<MoveStatusQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const causesResults = parent.causesStatus.edges.map(edge => new MoveStatusResult(edge));
  const resistsResults = parent.resistsStatus.edges.map(edge => new MoveStatusResult(edge));

  return (
    <>
      {causesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Causes status</h3>
        {causesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Status"
            key={`${parent.id}_${result.id}_cause_status`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
          />
        ))}
      </div>)}
      {resistsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resists status</h3>
        <p className="planner__accordion-clarification">
          The move fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        {resistsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Status"
            key={`${parent.id}_${result.id}_resist_status`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderMoveType = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<MoveTypeQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.moveByName[0];

  const requiresResults = parent.requiresType.edges.map(edge => new MoveTypeResult(edge));

  return (
    <>
      {requiresResults.length > 0 && (
      <div className="planner__accordion-subitem">
        <h3 className="planner__accordion-subitem-header">Requires type</h3>
        <p className="planner__accordion-clarification">
          This move requires another move of the listed type as its base move.
        </p>
        {requiresResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Status"
            key={`${parent.id}_${result.id}_cause_status`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              pokemonIconData: [DUMMY_POKEMON_ICON_DATUM],
              typeIconDatum: result.typeIconDatum,
              dispatchCart,
              dispatchTeam,
              gen,
              tierFilter,
              cartNote: ``
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderMoveUsageMethod = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<MoveUsageMethodQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const parent = data.moveByName[0];

  const hasResults = parent.usageMethods.edges.map(edge => new MoveUsageMethodResult(edge));
  const preventsResults = parent.preventsUsageMethod.edges.map(edge => new MoveUsageMethodResult(edge));

  return (
    <>
      {hasResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Has usage method</h3>
        {hasResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Usage method"
            key={`${parent.id}_${result.id}_has_usageMethod`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {preventsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Prevents usage method</h3>
        <p className="planner__accordion-subitem-positive">
          This move can prevent other Pokemon from using moves of the listed usage method.
        </p>
        {preventsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Move"
            targetEntityClass="Usage method"
            key={`${parent.id}_${result.id}_prevent_usageMethod`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  )
}