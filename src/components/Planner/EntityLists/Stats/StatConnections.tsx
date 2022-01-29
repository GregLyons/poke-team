import {
  StatAbilityResult,
  StatAbilityQuery,

  StatFieldStateResult,
  StatFieldStateQuery,

  StatItemResult,
  StatItemQuery,

  StatMoveResult,
  StatMoveQuery
} from "../../../../types-queries/Planner/Stat";
import {
  ListRenderArgs,
  MissingDispatchError,
  MissingGenError,
  MissingPokemonFilterError,
  MissingTierFilterError,
} from "../helpers";

import ConnectionAccordionEntry from "../Entries/ConnectionAccordionEntry";
import { ENUMCASE_TO_TITLECASE } from "../../../../utils/constants";

export const listRenderStatAbility = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<StatAbilityQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntityConnectionSearch component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntityConnectionSearch component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntityConnectionSearch component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed PokemonFilter to the EntityConnectionSearch component.');

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
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_boost_stage_ability`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {boostMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <h3 className="planner-accordion__subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_boost_multiplier_ability`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <h3 className="planner-accordion__subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_reduce_stage_ability`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' reduces '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <h3 className="planner-accordion__subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_reduce_multiplier_ability`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' reduces '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatFieldState = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<StatFieldStateQuery>) => {
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
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_boost_stage_fieldState`}
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
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <h3 className="planner-accordion__subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_boost_multiplier_fieldState`}
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
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <h3 className="planner-accordion__subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_reduce_stage_fieldState`}
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
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <h3 className="planner-accordion__subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Field state"
            key={`${parent.id}_${result.id}_reduce_multiplier_fieldState`}
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

export const listRenderStatItem = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<StatItemQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntityConnectionSearch component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntityConnectionSearch component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntityConnectionSearch component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed PokemonFilter to the EntityConnectionSearch component.');

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
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_boost_stage_item`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' raises '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {boostMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <h3 className="planner-accordion__subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_boost_multiplier_item`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <h3 className="planner-accordion__subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_reduce_stage_item`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' lowers '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <h3 className="planner-accordion__subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_reduce_multiplier_item`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' reduces '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatMove = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<StatMoveQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntityConnectionSearch component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntityConnectionSearch component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntityConnectionSearch component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed PokemonFilter to the EntityConnectionSearch component.');

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
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_boost_stage_move`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              typeIconDatum: result.typeIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {boostMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <h3 className="planner-accordion__subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_boost_multiplier_move`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              typeIconDatum: result.typeIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceStageResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <h3 className="planner-accordion__subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_reduce_stage_move`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              typeIconDatum: result.typeIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' reduces '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {reduceMultiplierResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <h3 className="planner-accordion__subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Stat"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_reduce_multiplier_move`}
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
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              typeIconDatum: result.typeIconDatum,
              genFilter,
              tierFilter,
              pokemonFilter,
              cartNote: `'${result.formattedName}' reduces '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}