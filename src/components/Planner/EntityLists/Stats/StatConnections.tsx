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
  const boostStageResults = abilityResults.filter(result => result.stage > 0);
  const reduceStageResults = abilityResults.filter(result => result.stage < 0);
  const boostMultiplierResults = abilityResults.filter(result => result.multiplier > 1);
  const reduceMultiplierResults = abilityResults.filter(result => result.multiplier < 1);

  return (
    <>
      {boostStageResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parentID}_${result.id}_boost_stage_ability`}
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
                key: 'Recipient', value: result.recipient,
              },
            ]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {boostMultiplierResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parentID}_${result.id}_boost_multiplier_ability`}
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
                key: 'Recipient', value: result.recipient,
              },
            ]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {reduceStageResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parentID}_${result.id}_reduce_stage_ability`}
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
                key: 'Recipient', value: result.recipient,
              },
            ]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {reduceMultiplierResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parentID}_${result.id}_reduce_multiplier_ability`}
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
                key: 'Recipient', value: result.recipient,
              },
            ]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatFieldState = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<StatFieldStateQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);

  const parentID = data.statByName[0].id;

  const fieldStateResults = data.statByName[0].modifiedByFieldState.edges.map(edge => new StatFieldStateResult(edge));
  const boostStageResults = fieldStateResults.filter(result => result.stage > 0);
  const reduceStageResults = fieldStateResults.filter(result => result.stage < 0);
  const boostMultiplierResults = fieldStateResults.filter(result => result.multiplier > 1);
  const reduceMultiplierResults = fieldStateResults.filter(result => result.multiplier < 1);

  return (
    <>
      {boostStageResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_boost_stage_fieldState`}
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
                key: 'Recipient', value: result.recipient,
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
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_boost_multiplier_fieldState`}
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
                key: 'Recipient', value: result.recipient,
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
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_reduce_stage_fieldState`}
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
                key: 'Recipient', value: result.recipient,
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
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_reduce_multiplier_fieldState`}
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
                key: 'Recipient', value: result.recipient,
              },
            ]}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatItem = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<StatItemQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);

  const parentID = data.statByName[0].id;

  const itemResults = data.statByName[0].modifiedByItem.edges.map(edge => new StatItemResult(edge));
  const boostStageResults = itemResults.filter(result => result.stage > 0);
  const reduceStageResults = itemResults.filter(result => result.stage < 0);
  const boostMultiplierResults = itemResults.filter(result => result.multiplier > 1);
  const reduceMultiplierResults = itemResults.filter(result => result.multiplier < 1);

  return (
    <>
      {boostStageResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="items"
            key={`${parentID}_${result.id}_boost_stage_item`}
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
                key: 'Recipient', value: result.recipient,
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
            targetEntityClass="items"
            key={`${parentID}_${result.id}_boost_multiplier_item`}
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
                key: 'Recipient', value: result.recipient,
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
            targetEntityClass="items"
            key={`${parentID}_${result.id}_reduce_stage_item`}
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
                key: 'Recipient', value: result.recipient,
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
            targetEntityClass="items"
            key={`${parentID}_${result.id}_reduce_multiplier_item`}
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
                key: 'Recipient', value: result.recipient,
              },
            ]}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderStatMove = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<StatMoveQuery>) => {
  if (!data || !data.statByName) return (<div>Data not found for the query 'statByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');

  const parentID = data.statByName[0].id;

  const moveResults = data.statByName[0].modifiedByMove.edges.map(edge => new StatMoveResult(edge));
  const boostStageResults = moveResults.filter(result => result.stage > 0);
  const reduceStageResults = moveResults.filter(result => result.stage < 0);
  const boostMultiplierResults = moveResults.filter(result => result.multiplier > 1);
  const reduceMultiplierResults = moveResults.filter(result => result.multiplier < 1);

  return (
    <>
      {boostStageResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosts by stage</h3>
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="moves"
            key={`${parentID}_${result.id}_boost_stage_move`}
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
                key: 'Recipient', value: result.recipient,
              },
            ]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {boostMultiplierResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boost by multiplier</h3>
        {boostMultiplierResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="moves"
            key={`${parentID}_${result.id}_boost_multiplier_move`}
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
                key: 'Recipient', value: result.recipient,
              },
            ]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {reduceStageResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Reduces by stage</h3>
        {reduceStageResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="moves"
            key={`${parentID}_${result.id}_reduce_stage_move`}
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
                key: 'Recipient', value: result.recipient,
              },
            ]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {reduceMultiplierResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Reduces by multiplier</h3>
        {reduceMultiplierResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="moves"
            key={`${parentID}_${result.id}_reduce_multiplier_move`}
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
                key: 'Recipient', value: result.recipient,
              },
            ]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
    </>
  );
}