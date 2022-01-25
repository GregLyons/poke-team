import {
  FieldStateAbilityResult,
  FieldStateAbilityQuery,

  FieldStateEffectResult,
  FieldStateEffectQuery,

  FieldStateItemResult,
  FieldStateItemQuery,

  FieldStateMoveResult,
  FieldStateMoveQuery,

  FieldStateStatResult,
  FieldStateStatQuery,

  FieldStateStatusResult,
  FieldStateStatusQuery,
  
  FieldStateTypeResult,
  FieldStateTypeQuery,
} from "../../../../types-queries/Planner/FieldState";
import {
  ListRenderArgs,
  MissingDispatchError,
  MissingGenError,
  MissingTierFilterError,
} from "../helpers";
import {
  DUMMY_POKEMON_ICON_DATUM,
} from "../../../../types-queries/helpers";

import ConnectionAccordionEntry from "../ConnectionAccordionEntry";

export const listRenderFieldStateAbility = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<FieldStateAbilityQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.fieldStateByName[0];

  const activatesResults = parent.activatesAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const createdByResults = parent.createdByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const ignoredByResults = parent.ignoredByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const preventedByResults = parent.preventedByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const removedByResults = parent.removedByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const suppressedByResults = parent.suppressedByAbility.edges.map(edge => new FieldStateAbilityResult(edge));

  return (
    <>
      {activatesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Activates ability</h3>
        {activatesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_activate_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' activates '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {createdByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Created by ability</h3>
        {createdByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_create_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' created by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {ignoredByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Ignored by ability</h3>
        <p className="planner__accordion-clarification">
          Effects of field state ignored by owner of the ability.
        </p>
        {ignoredByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_ignore_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' ignored by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {preventedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Prevented by ability</h3>
        <p className="planner__accordion-clarification">
          Ability prevents the field state from being set up, but does not remove it if the field state is already present.
        </p>
        {preventedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_prevent_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' prevented by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {removedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Removed by ability</h3>
        <p className="planner__accordion-clarification">
          Ability removes the field state entirely.
        </p>
        {removedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_remove_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' removed by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {suppressedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Suppressed by ability</h3>
        <p className="planner__accordion-clarification">
          Effects are suppressed while the ability is present, but the field state is not removed entirely.
        </p>
        {suppressedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Ability"
            key={`${parent.id}_${result.id}_suppress_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' suppressed by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderFieldStateEffect = ({ data, }: ListRenderArgs<FieldStateEffectQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const parent = data.fieldStateByName[0];

  const effectResults = parent.effects.edges.map(edge => new FieldStateEffectResult(edge));
  
  return (
    <>
      {effectResults.map(result => (
        <ConnectionAccordionEntry
          parentEntityClass="Field state"
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

export const listRenderFieldStateItem = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<FieldStateItemQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.fieldStateByName[0];

  const activatesResults = parent.activatesItem.edges.map(edge => new FieldStateItemResult(edge));
  const extendedByResults = parent.extendedByItem.edges.map(edge => new FieldStateItemResult(edge));
  const ignoredByResults = parent.ignoredByItem.edges.map(edge => new FieldStateItemResult(edge));
  const resistedByResults = parent.resistedByItem.edges.map(edge => new FieldStateItemResult(edge));

  return (
    <>
      {activatesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Activates item</h3>
        {activatesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_activate_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' is activated by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {extendedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Extended by item</h3>
        <p className="planner__accordion-clarification">
          When the owner of the item creates this field state, the field state will last for a greater number of turns than usual.
        </p>
        {extendedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_extend_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' extends '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {ignoredByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Ignored by item</h3>
        <p className="planner__accordion-clarification">
          Item allows the owner to ignore the effects of the field state.
        </p>
        {ignoredByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_ignore_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' ignores '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by item</h3>
        <p className="planner__accordion-clarification">
          Effects of the field state on the owner of the item are weakened (e.g. less damage).
        </p>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Item"
            key={`${parent.id}_${result.id}_resist_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.requiredPokemonIconData,
              itemIconDatum: result.itemIconDatum,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderFieldStateMove = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<FieldStateMoveQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.fieldStateByName[0];

  const createdByResults = parent.createdByMove.edges.map(edge => new FieldStateMoveResult(edge));
  const enhancesResults = parent.enhancesMove.edges.map(edge => new FieldStateMoveResult(edge));
  const hindersResults = parent.hindersMove.edges.map(edge => new FieldStateMoveResult(edge));
  const removedByResults = parent.removedByMove.edges.map(edge => new FieldStateMoveResult(edge));

  return (
    <>
      {createdByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Created by move</h3>
        {createdByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_create_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' creates '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {enhancesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Enhances move</h3>
        <p className="planner__accordion-clarification">
          Presence of the field state increases the effectiveness of the move in some way.
        </p>
        {enhancesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_enhance_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' enhances '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {hindersResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Hinders move</h3>
        <p className="planner__accordion-clarification">
          Presence of the field state reduces the effectiveness of the move in some way.
        </p>
        {hindersResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_hinder_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' hinders '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {removedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Removed by move</h3>
        {removedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Move"
            key={`${parent.id}_${result.id}_remove_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' removes '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderFieldStateStat = ({ data, }: ListRenderArgs<FieldStateStatQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const parent = data.fieldStateByName[0];

  const statResults = parent.modifiesStat.edges.map(edge => new FieldStateStatResult(edge));
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
          parentEntityClass="Field state"
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
          parentEntityClass="Field state"
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
          parentEntityClass="Field state"
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
          parentEntityClass="Field state"
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
                key: 'Recipient', value: result.recipient,
              },
            ]}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderFieldStateStatus = ({ data, }: ListRenderArgs<FieldStateStatusQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'itemByName'.</div>);
  
  const parent = data.fieldStateByName[0];

  const causesResults = data.fieldStateByName
  [0].causesStatus.edges.map(edge => new FieldStateStatusResult(edge));
  const resistsResults = parent.resistsStatus.edges.map(edge => new FieldStateStatusResult(edge));

  return (
    <>
      {causesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Causes status</h3>
        {causesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
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
          Presence of the field state fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        {resistsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
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

export const listRenderFieldStateType = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<FieldStateTypeQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');
  
  const parent = data.fieldStateByName[0];

  const boostsResults = data.fieldStateByName
  [0].boostsType.edges.map(edge => new FieldStateTypeResult(edge));
  const ignoredByResults = data.fieldStateByName
  [0].ignoredByType.edges.map(edge => new FieldStateTypeResult(edge));
  const removedByResults = data.fieldStateByName
  [0].removedByType.edges.map(edge => new FieldStateTypeResult(edge));
  const resistanceResults = data.fieldStateByName
  [0].resistedByType.edges.map(edge => new FieldStateTypeResult(edge));
  const resistsResults = parent.weakensType.edges.map(edge => new FieldStateTypeResult(edge));
  const weatherBallResults = data.fieldStateByName
  [0].weatherBall.edges.map(edge => new FieldStateTypeResult(edge));
  
  return (
    <>
      {boostsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosts type</h3>
        <p className="planner__accordion-clarification">
          Presence of this field state boosts the power of moves of the listed type.
        </p>
        {boostsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Type"
            key={`${parent.id}_${result.id}_boost_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {resistsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Weakens type</h3>
        <p className="planner__accordion-clarification">
          Presence of this field state weakens the power of moves of the listed type.
        </p>
        {resistsResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Type"
            key={`${parent.id}_${result.id}_weaken_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {resistanceResults.filter(result => result.multiplier && result.multiplier > 1).length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Strong against type</h3>
        <p className="planner__accordion-clarification">
          Negative effects of the field state on Pokemon of the listed type are heightened (e.g. more damage).
        </p>
        {resistanceResults.filter(result => result.multiplier && result.multiplier > 1).map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Type"
            key={`${parent.id}_${result.id}_resist_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' strong against '${parent.formattedName}'.`,
            }}
            data={[{key: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {weatherBallResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Weather Ball</h3>
        <p className="planner__accordion-clarification">
          Presence of this field state changes the type of Weather Ball to the listed type.
        </p>
        {weatherBallResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Type"
            key={`${parent.id}_${result.id}_weather_ball_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {ignoredByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
          <h3 className="planner__accordion-subitem-header">Ignored by type</h3>
          <p className="planner__accordion-clarification">
            Effects of field state ignored by Pokemon of the listed type.
          </p>
          {ignoredByResults.map(result => (
            <ConnectionAccordionEntry
          parentEntityClass="Field state"
              targetEntityClass="Type"
              key={`${parent.id}_${result.id}_ignore_type`}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatchCart: dispatchCart,
                dispatchTeam: dispatchTeam,
                pokemonIconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
                gen: gen,
                tierFilter: tierFilter,
                cartNote: `'${result.formattedName}' ignored by '${parent.formattedName}'.`,
              }}
            />
          ))}
      </div>)}
      {removedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Removed by type</h3>
        <p className="planner__accordion-clarification">
          Pokemon of the listed type remove this field state upon entry.
        </p>
        {removedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Type"
            key={`${parent.id}_${result.id}_remove_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' removed by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistanceResults.filter(result => result.multiplier && result.multiplier < 1).length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by type</h3>
        <p className="planner__accordion-clarification">
          Negative effects of the field state on Pokemon of the listed type are mitigated (e.g. less damage).
        </p>
        {resistanceResults.filter(result => result.multiplier && result.multiplier < 1).map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Field state"
            targetEntityClass="Type"
            key={`${parent.id}_${result.id}_resist_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              pokemonIconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' resisted by '${parent.formattedName}'.`,
            }}
            data={[{key: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
    </>
  );
}