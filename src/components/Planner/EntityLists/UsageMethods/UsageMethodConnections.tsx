import {
  UsageMethodAbilityResult,
  UsageMethodAbilityQuery,

  UsageMethodEffectResult,
  UsageMethodEffectQuery,

  UsageMethodItemResult,
  UsageMethodItemQuery,

  UsageMethodMoveResult,
  UsageMethodMoveQuery,

  UsageMethodStatResult,
  UsageMethodStatQuery,

  UsageMethodStatusResult,
  UsageMethodStatusQuery,
  
  UsageMethodTypeResult,
  UsageMethodTypeQuery,
} from "../../../../types-queries/UsageMethod";
import {
  ListRenderArgs,
  MissingDispatchError,
  MissingGenError,
  MissingTierFilterError,
} from "../helpers";

import ConnectionAccordionEntry from "../ConnectionAccordionEntry";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";

export const listRenderUsageMethodAbility = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<UsageMethodAbilityQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parentID = data.usageMethodByName[0].id;

  const activatesResults = data.usageMethodByName[0].activatesAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const createdByResults = data.usageMethodByName[0].createdByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const ignoredByResults = data.usageMethodByName[0].ignoredByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const preventedByResults = data.usageMethodByName[0].preventedByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const removedByResults = data.usageMethodByName[0].removedByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));
  const suppressedByResults = data.usageMethodByName[0].suppressedByAbility.edges.map(edge => new UsageMethodAbilityResult(edge));

  return (
    <>
      {activatesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Activates ability</h3>
        {activatesResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parentID}_${result.id}_activate_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
            }}
          />
        ))}
      </div>)}
      {createdByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Created by ability</h3>
        {createdByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parentID}_${result.id}_create_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
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
            targetEntityClass="abilities"
            key={`${parentID}_${result.id}_ignore_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
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
            targetEntityClass="abilities"
            key={`${parentID}_${result.id}_prevent_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
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
            targetEntityClass="abilities"
            key={`${parentID}_${result.id}_remove_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
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
            targetEntityClass="abilities"
            key={`${parentID}_${result.id}_suppress_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderUsageMethodEffect = ({ data, }: ListRenderArgs<UsageMethodEffectQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);

  const parentID = data.usageMethodByName[0].id;

  const effectResults = data.usageMethodByName[0].effects.edges.map(edge => new UsageMethodEffectResult(edge));
  
  return (
    <>
      {effectResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="effects"
          key={`${parentID}_${result.id}_effect`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
        />
      ))}
    </>
  )
}

export const listRenderUsageMethodItem = ({ data, }: ListRenderArgs<UsageMethodItemQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);

  const parentID = data.usageMethodByName[0].id;

  const activatesResults = data.usageMethodByName[0].activatesItem.edges.map(edge => new UsageMethodItemResult(edge));
  const extendedByResults = data.usageMethodByName[0].extendedByItem.edges.map(edge => new UsageMethodItemResult(edge));
  const ignoredByResults = data.usageMethodByName[0].ignoredByItem.edges.map(edge => new UsageMethodItemResult(edge));
  const resistedByResults = data.usageMethodByName[0].resistedByItem.edges.map(edge => new UsageMethodItemResult(edge));

  return (
    <>
      {activatesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Activates item</h3>
        {activatesResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="items"
            key={`${parentID}_${result.id}_activate_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
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
            targetEntityClass="items"
            key={`${parentID}_${result.id}_extend_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
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
            targetEntityClass="items"
            key={`${parentID}_${result.id}_ignore_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
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
            targetEntityClass="items"
            key={`${parentID}_${result.id}_resist_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderUsageMethodMove = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<UsageMethodMoveQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parentID = data.usageMethodByName[0].id;

  const createdByResults = data.usageMethodByName[0].createdByMove.edges.map(edge => new UsageMethodMoveResult(edge));
  const enhancesResults = data.usageMethodByName[0].enhancesMove.edges.map(edge => new UsageMethodMoveResult(edge));
  const hindersResults = data.usageMethodByName[0].hindersMove.edges.map(edge => new UsageMethodMoveResult(edge));
  const removedByResults = data.usageMethodByName[0].removedByMove.edges.map(edge => new UsageMethodMoveResult(edge));

  return (
    <>
      {createdByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Created by move</h3>
        {createdByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="moves"
            key={`${parentID}_${result.id}_create_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
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
            targetEntityClass="moves"
            key={`${parentID}_${result.id}_enhance_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
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
            targetEntityClass="moves"
            key={`${parentID}_${result.id}_hinder_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
            }}
          />
        ))}
      </div>)}
      {removedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Removed by move</h3>
        {removedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="moves"
            key={`${parentID}_${result.id}_remove_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderUsageMethodStat = ({ data, }: ListRenderArgs<UsageMethodStatQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);

  const parentID = data.usageMethodByName[0].id;

  const statResults = data.usageMethodByName[0].modifiesStat.edges.map(edge => new UsageMethodStatResult(edge));
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
            targetEntityClass="stats"
            key={`${parentID}_${result.id}_boost_stage_stat`}
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
            targetEntityClass="stats"
            key={`${parentID}_${result.id}_boost_multiplier_stat`}
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
            targetEntityClass="stats"
            key={`${parentID}_${result.id}_reduce_stage_stat`}
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
            targetEntityClass="stats"
            key={`${parentID}_${result.id}_reduce_multiplier_stat`}
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

export const listRenderUsageMethodStatus = ({ data, }: ListRenderArgs<UsageMethodStatusQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'itemByName'.</div>);
  
  const parentID = data.usageMethodByName[0].id;

  const causesResults = data.usageMethodByName
  [0].causesStatus.edges.map(edge => new UsageMethodStatusResult(edge));
  const resistsResults = data.usageMethodByName[0].resistsStatus.edges.map(edge => new UsageMethodStatusResult(edge));

  return (
    <>
      {causesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Causes status</h3>
        {causesResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="statuses"
            key={`${parentID}_${result.id}_cause_status`}
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
            targetEntityClass="statuses"
            key={`${parentID}_${result.id}_resist_status`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderUsageMethodType = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<UsageMethodTypeQuery>) => {
  if (!data || !data.usageMethodByName) return (<div>Data not found for the query 'usageMethodByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');
  
  const parentID = data.usageMethodByName[0].id;

  const boostsResults = data.usageMethodByName
  [0].boostsType.edges.map(edge => new UsageMethodTypeResult(edge));
  const ignoredByResults = data.usageMethodByName
  [0].ignoredByType.edges.map(edge => new UsageMethodTypeResult(edge));
  const removedByResults = data.usageMethodByName
  [0].removedByType.edges.map(edge => new UsageMethodTypeResult(edge));
  const resistanceResults = data.usageMethodByName
  [0].resistedByType.edges.map(edge => new UsageMethodTypeResult(edge));
  const resistsResults = data.usageMethodByName[0].resistsType.edges.map(edge => new UsageMethodTypeResult(edge));
  const weatherBallResults = data.usageMethodByName
  [0].weatherBall.edges.map(edge => new UsageMethodTypeResult(edge));
  
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
            targetEntityClass="types"
            key={`${parentID}_${result.id}_boost_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multiplier', value: result.multiplier || 0}]}
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
            targetEntityClass="types"
            key={`${parentID}_${result.id}_weaken_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multiplier', value: result.multiplier || 0}]}
          />
        ))}
      </div>)}
      {resistanceResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Strong against type</h3>
        <p className="planner__accordion-clarification">
          Negative effects of the field state on Pokemon of the listed type are heightened (e.g. more damage).
        </p>
        {resistanceResults.filter(result => result.multiplier && result.multiplier > 1).map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="types"
            key={`${parentID}_${result.id}_resist_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
              gen: gen,
              tierFilter: tierFilter,
            }}
            data={[{key: 'Multiplier', value: result.multiplier || 0}]}
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
            targetEntityClass="types"
            key={`${parentID}_${result.id}_weather_ball_type`}
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
              targetEntityClass="types"
              key={`${parentID}_${result.id}_ignore_type`}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatchCart: dispatchCart,
                dispatchTeam: dispatchTeam,
                iconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
                gen: gen,
                tierFilter: tierFilter,
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
            targetEntityClass="types"
            key={`${parentID}_${result.id}_remove_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
              gen: gen,
              tierFilter: tierFilter,
            }}
          />
        ))}
      </div>)}
      {resistanceResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by type</h3>
        <p className="planner__accordion-clarification">
          Negative effects of the field state on Pokemon of the listed type are mitigated (e.g. less damage).
        </p>
        {resistanceResults.filter(result => result.multiplier && result.multiplier < 1).map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="types"
            key={`${parentID}_${result.id}_resist_type`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
              gen: gen,
              tierFilter: tierFilter,
            }}
            data={[{key: 'Multiplier', value: result.multiplier || 0}]}
          />
        ))}
      </div>)}
    </>
  );
}