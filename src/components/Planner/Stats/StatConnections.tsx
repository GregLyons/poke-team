import { ListRenderArgs, ListRenderArgsIcons } from "../../../hooks/Searches";
import {
  StatAbilityQuery, StatAbilityResult, StatFieldStateQuery, StatFieldStateResult, StatItemQuery, StatItemResult, StatMoveQuery, StatMoveResult
} from "../../../types-queries/Planner/Stat";
import { ENUMCASE_TO_TITLECASE } from "../../../utils/constants";
import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";


export const listRenderStatAbility = ({ data, dispatches, filters, }: ListRenderArgsIcons<StatAbilityQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);

  const parent = data.statByName[0];

  const abilityResults = parent.modifiedByAbility.edges.map(edge => new StatAbilityResult(edge));
  const boostStageResults = abilityResults.filter(result => result.stage > 0);
  const reduceStageResults = abilityResults.filter(result => result.stage < 0);
  const boostMultiplierResults = abilityResults.filter(result => result.multiplier > 1);
  const reduceMultiplierResults = abilityResults.filter(result => result.multiplier < 1);

  return (
    <>
      {boostStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Ability"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {boostMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Ability"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Ability"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' reduces '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Ability"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' reduces '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatFieldState = ({ data, }: ListRenderArgs<StatFieldStateQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);

  const parent = data.statByName[0];

  const fieldStateResults = parent.modifiedByFieldState.edges.map(edge => new StatFieldStateResult(edge));
  const boostStageResults = fieldStateResults.filter(result => result.stage > 0);
  const reduceStageResults = fieldStateResults.filter(result => result.stage < 0);
  const boostMultiplierResults = fieldStateResults.filter(result => result.multiplier > 1);
  const reduceMultiplierResults = fieldStateResults.filter(result => result.multiplier < 1);

  return (
    <>
      {boostStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
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
          parentEntityClass="Stat"
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
          parentEntityClass="Stat"
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
          parentEntityClass="Stat"
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

export const listRenderStatItem = ({ data, dispatches, filters, }: ListRenderArgsIcons<StatItemQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);

  const parent = data.statByName[0];

  const itemResults = parent.modifiedByItem.edges.map(edge => new StatItemResult(edge));
  const boostStageResults = itemResults.filter(result => result.stage > 0);
  const reduceStageResults = itemResults.filter(result => result.stage < 0);
  const boostMultiplierResults = itemResults.filter(result => result.multiplier > 1);
  const reduceMultiplierResults = itemResults.filter(result => result.multiplier < 1);

  return (
    <>
      {boostStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Item"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.requiredPokemonIconData,
              linkIconDatum: {
                iconClass: 'item',
                iconDatum: result.itemIconDatum
              },
              filters,
              cartNote: `'${result.formattedName}' raises '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {boostMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Item"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.requiredPokemonIconData,
              linkIconDatum: {
                iconClass: 'item',
                iconDatum: result.itemIconDatum
              },
              filters,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Item"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.requiredPokemonIconData,
              linkIconDatum: {
                iconClass: 'item',
                iconDatum: result.itemIconDatum
              },
              filters,
              cartNote: `'${result.formattedName}' lowers '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Item"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.requiredPokemonIconData,
              linkIconDatum: {
                iconClass: 'item',
                iconDatum: result.itemIconDatum
              },
              filters,
              cartNote: `'${result.formattedName}' reduces '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatMove = ({ data, dispatches, filters, }: ListRenderArgsIcons<StatMoveQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);

  const parent = data.statByName[0];

  const moveResults = parent.modifiedByMove.edges.map(edge => new StatMoveResult(edge));
  const boostStageResults = moveResults.filter(result => result.stage > 0);
  const reduceStageResults = moveResults.filter(result => result.stage < 0);
  const boostMultiplierResults = moveResults.filter(result => result.multiplier > 1);
  const reduceMultiplierResults = moveResults.filter(result => result.multiplier < 1);

  return (
    <>
      {boostStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Move"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              linkIconDatum: {
                iconClass: 'type',
                iconDatum: result.typeIconDatum
              },
              filters,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {boostMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Move"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              linkIconDatum: {
                iconClass: 'type',
                iconDatum: result.typeIconDatum
              },
              filters,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Move"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              linkIconDatum: {
                iconClass: 'type',
                iconDatum: result.typeIconDatum
              },
              filters,
              cartNote: `'${result.formattedName}' reduces '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Move"
            key={result.id}
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
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              linkIconDatum: {
                iconClass: 'type',
                iconDatum: result.typeIconDatum
              },
              filters,
              cartNote: `'${result.formattedName}' reduces '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}