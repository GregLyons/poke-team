import {
  AbilityEffectQuery,
  AbilityEffectResult,
  AbilityFieldStateQuery,
  AbilityFieldStateResult,
  AbilityStatQuery,
  AbilityStatResult,
  AbilityStatusQuery,
  AbilityStatusResult,
  AbilityTypeQuery,
  AbilityTypeResult,
  AbilityUsageMethodQuery,
  AbilityUsageMethodResult,
} from "../../../types-queries/Planner/Ability";

import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../types-queries/helpers";
import { ENUMCASE_TO_TITLECASE } from "../../../utils/constants";
import { ListRenderArgs, ListRenderArgsIcons } from "../../../hooks/Planner/MainSearches";

export const listRenderAbilityEffect = ({ data, }: ListRenderArgs<AbilityEffectQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parent = data.abilityByName[0];

  const effectResults = parent.effects.edges.map(edge => new AbilityEffectResult(edge));
  
  return (
    <>
      <div className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        {effectResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Ability"
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

export const listRenderAbilityFieldState = ({ data, }: ListRenderArgs<AbilityFieldStateQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parent = data.abilityByName[0];

  const activatedByResults = parent.activatedByFieldState.edges.map(edge => new AbilityFieldStateResult(edge));
  const createsResults = parent.createsFieldState.edges.map(edge => new AbilityFieldStateResult(edge));
  const ignoresResults = parent.ignoresFieldState.edges.map(edge => new AbilityFieldStateResult(edge));
  const preventsResults = parent.preventsFieldState.edges.map(edge => new AbilityFieldStateResult(edge));
  const removesResults = parent.removesFieldState.edges.map(edge => new AbilityFieldStateResult(edge));
  const suppressesResults = parent.suppressesFieldState.edges.map(edge => new AbilityFieldStateResult(edge));

  return (
    <>
      {activatedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Activated by field state</h3>
        {activatedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_activate_fieldState`}
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
      {createsResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Creates field state</h3>
        {createsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
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
      {ignoresResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Ignores field state</h3>
        <p className="planner-accordion__clarification">
          Ability allows the owner to ignore the effects of the field state.
        </p>
        {ignoresResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_ignore_fieldState`}
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
      {preventsResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Prevents field state</h3>
        <p className="planner-accordion__clarification">
          Prevents the field state from being set up while in play, but does not remove field states which are already present.
        </p>
        {preventsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_prevent_fieldState`}
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
        <p className="planner-accordion__clarification">
          Ability removes the field state from the field entirely.
        </p>
        {removesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
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
      {suppressesResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Suppresses field state</h3>
        <p className="planner-accordion__clarification">
          Ability removes the effects of the field state while in play, but does not remove the field state entirely.
        </p>
        {suppressesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_suppress_fieldState`}
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

export const listRenderAbilityStat = ({ data, }: ListRenderArgs<AbilityStatQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parent = data.abilityByName[0];

  const statResults = parent.modifiesStat.edges.map(edge => new AbilityStatResult(edge));
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
          parentEntityClass="Ability"
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
          parentEntityClass="Ability"
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
          parentEntityClass="Ability"
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
          parentEntityClass="Ability"
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

export const listRenderAbilityStatus = ({ data, }: ListRenderArgs<AbilityStatusQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parent = data.abilityByName[0];

  const causesResults = parent.causesStatus.edges.map(edge => new AbilityStatusResult(edge));
  const resistsResults = parent.resistsStatus.edges.map(edge => new AbilityStatusResult(edge));

  return (
    <>
      {causesResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Causes status</h3>
        {causesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
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
          The ability fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        {resistsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
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

export const listRenderAbilityType = ({ data, dispatches, filters, }: ListRenderArgsIcons<AbilityTypeQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parent = data.abilityByName[0];

  const boostsResults = parent.boostsType.edges.map(edge => new AbilityTypeResult(edge));
  const resistsResults = parent.resistsType.edges.map(edge => new AbilityTypeResult(edge));

  return (
    <>
      {boostsResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts type</h3>
        <p className="planner-accordion__clarification">
          Ability boosts the power of moves of this type used by the Pokemon.
        </p> 
        {boostsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
            targetEntityClass="Type"
            key={`${parent.id}_${result.id}_boost_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              pokemonIconData: [DUMMY_POKEMON_ICON_DATUM],
              linkIconDatum: {
                iconClass: 'type',
                iconDatum: result.typeIconDatum
              },
              dispatches,
              filters,
              cartNote: ``
            }}
          />
        ))}
      </div>)}
      {resistsResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resists type</h3>
        <p className="planner-accordion__clarification">
          Ability resists moves of this type used against the Pokemon.
        </p>
        {resistsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
            targetEntityClass="Type"
            key={`${parent.id}_${result.id}_resist_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              pokemonIconData: [DUMMY_POKEMON_ICON_DATUM],
              linkIconDatum: {
                iconClass: 'type',
                iconDatum: result.typeIconDatum
              },
              dispatches,
              filters,
              cartNote: ``
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderAbilityUsageMethod = ({ data, }: ListRenderArgs<AbilityUsageMethodQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parent = data.abilityByName[0];

  const activatedByResults = parent.activatedByUsageMethod.edges.map(edge => new AbilityUsageMethodResult(edge));
  const boostsResults = parent.boostsUsageMethod.edges.map(edge => new AbilityUsageMethodResult(edge));
  const preventsResults = parent.preventsUsageMethod.edges.map(edge => new AbilityUsageMethodResult(edge));
  const resistsResults = parent.resistsUsageMethod.edges.map(edge => new AbilityUsageMethodResult(edge));

  return (
    <>
      {activatedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Activated by usage method</h3>
        {activatedByResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Ability"
            targetEntityClass="Usage method"
            key={`${parent.id}_${result.id}_activate_usageMethod`}
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
      {boostsResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts usage method</h3>
        <p className="planner-accordion__clarification">
          Ability boosts the power of moves of this usage method used by the Pokemon.
        </p> 
        {boostsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
            targetEntityClass="Usage method"
            key={`${parent.id}_${result.id}_boost_usageMethod`}
            icons={{
              linkIconDatum: {
                iconClass: 'usageMethod',
                iconDatum: result.iconDatum,
              }
            }}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {preventsResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Prevents usage method</h3>
        <p className="planner-accordion__clarification">
          Prevents moves of the listed usage method from being used while this ability is present.
        </p>
        {preventsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
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
      {resistsResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resists usage method</h3>
        <p className="planner-accordion__clarification">
          Ability resists moves of this usage method used against the Pokemon.
        </p>
        {resistsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Ability"
            targetEntityClass="Usage method"
            key={`${parent.id}_${result.id}_resist_usageMethod`}
            icons={{
              linkIconDatum: {
                iconClass: 'usageMethod',
                iconDatum: result.iconDatum,
              }
            }}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
    </>
  );
}