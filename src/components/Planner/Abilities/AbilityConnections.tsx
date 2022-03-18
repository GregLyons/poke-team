import { ListRenderArgs, ListRenderArgsIcons } from "../../../hooks/Searches";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../types-queries/helpers";
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
  AbilityUsageMethodResult
} from "../../../types-queries/Planner/Ability";
import { ENUMCASE_TO_TITLECASE } from "../../../utils/constants";
import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";


export const listRenderAbilityEffect = ({ data, }: ListRenderArgs<AbilityEffectQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parent = data.abilityByName[0];

  const effectResults = parent.effects.edges.map(edge => new AbilityEffectResult(edge));
  
  return (
    <ul className="planner-accordion__subitem-list">
      <li className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        <ul className="planner-accordion__subitem-results">
          {effectResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
    <ul className="planner-accordion__subitem-list">
      {activatedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Activated by field state</h3>
        <ul className="planner-accordion__subitem-results">
          {activatedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
      {createsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Creates field state</h3>
        <ul className="planner-accordion__subitem-results">
          {createsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
      {ignoresResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Ignores field state</h3>
        <p className="planner-accordion__clarification">
          Ability allows the owner to ignore the effects of the field state.
        </p>
        <ul className="planner-accordion__subitem-results">
          {ignoresResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
      {preventsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Prevents field state</h3>
        <p className="planner-accordion__clarification">
          Prevents the field state from being set up while in play, but does not remove field states which are already present.
        </p>
        <ul className="planner-accordion__subitem-results">
          {preventsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Removes field state</h3>
        <p className="planner-accordion__clarification">
          Ability removes the field state from the field entirely.
        </p>
        <ul className="planner-accordion__subitem-results">
          {removesResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
      {suppressesResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Suppresses field state</h3>
        <p className="planner-accordion__clarification">
          Ability removes the effects of the field state while in play, but does not remove the field state entirely.
        </p>
        <ul className="planner-accordion__subitem-results">
        {suppressesResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Ability"
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
    <ul className="planner-accordion__subitem-list">
      {boostStageResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        <ul className="planner-accordion__subitem-results">
          {boostStageResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by multiplier</h3>
        <ul className="planner-accordion__subitem-results">
          {boostMultiplierResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by stage</h3>
        <ul className="planner-accordion__subitem-results">
          {reduceStageResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by multiplier</h3>
        <ul className="planner-accordion__subitem-results">
          {reduceMultiplierResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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

export const listRenderAbilityStatus = ({ data, }: ListRenderArgs<AbilityStatusQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parent = data.abilityByName[0];

  const causesResults = parent.causesStatus.edges.map(edge => new AbilityStatusResult(edge));
  const resistsResults = parent.resistsStatus.edges.map(edge => new AbilityStatusResult(edge));

  return (
    <ul className="planner-accordion__subitem-list">
      {causesResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Causes status</h3>
        <ul className="planner-accordion__subitem-results">
          {causesResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Resists status</h3>
        <p className="planner-accordion__clarification">
          The ability fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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

export const listRenderAbilityType = ({ data, dispatches, filters, }: ListRenderArgsIcons<AbilityTypeQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const parent = data.abilityByName[0];

  const boostsResults = parent.boostsType.edges.map(edge => new AbilityTypeResult(edge));
  const resistsResults = parent.resistsType.edges.map(edge => new AbilityTypeResult(edge));

  return (
    <ul className="planner-accordion__subitem-list">
      {boostsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Boosts type</h3>
        <p className="planner-accordion__clarification">
          Ability boosts the power of moves of this type used by the Pokemon.
        </p> 
        <ul className="planner-accordion__subitem-results">
          {boostsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
              targetEntityClass="Type"
              key={result.id}
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
        </ul>
      </li>)}
      {resistsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Resists type</h3>
        <p className="planner-accordion__clarification">
          Ability resists moves of this type used against the Pokemon.
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
              targetEntityClass="Type"
              key={result.id}
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
        </ul>
      </li>)}
    </ul>
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
    <ul className="planner-accordion__subitem-list">
      {activatedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Activated by usage method</h3>
        <ul className="planner-accordion__subitem-results">
          {activatedByResults.map(result => (
            <ConnectionAccordionEntry
                parentEntityClass="Ability"
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
      {boostsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Boosts usage method</h3>
        <p className="planner-accordion__clarification">
          Ability boosts the power of moves of this usage method used by the Pokemon.
        </p> 
        <ul className="planner-accordion__subitem-results">
          {boostsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
              data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            />
          ))}
        </ul>
      </li>)}
      {preventsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Prevents usage method</h3>
        <p className="planner-accordion__clarification">
          Prevents moves of the listed usage method from being used while this ability is present.
        </p>
        <ul className="planner-accordion__subitem-results">
          {preventsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
      {resistsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Resists usage method</h3>
        <p className="planner-accordion__clarification">
          Ability resists moves of this usage method used against the Pokemon.
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Ability"
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
              data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            />
          ))}
        </ul>
      </li>)}
    </ul>
  );
}