import {
  TypeAbilityResult,
  TypeAbilityQuery,

  TypeFieldStateResult,
  TypeFieldStateQuery,

  TypeItemResult,
  TypeItemQuery,

  TypeMoveResult,
  TypeMoveQuery,
} from "../../../../types-queries/Planner/Type";
import {
  ListRenderArgs,
  MissingDispatchError,
  MissingGenError,
  MissingTierFilterError,
} from "../helpers";

import ConnectionAccordionEntry from "../ConnectionAccordionEntry";

export const listRenderTypeAbility = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<TypeAbilityQuery>) => {
  if (!data || !data.typeByName) return (<div>Data not found for the query 'typeByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.typeByName[0];

  const boostedByResults = parent.boostedByAbility.edges.map(edge => new TypeAbilityResult(edge));
  const resistedByResults = parent.resistedByAbility.edges.map(edge => new TypeAbilityResult(edge));

  return (
    <>
      {boostedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosted by ability</h3>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parent.id}_${result.id}_boost_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' boosted by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by ability</h3>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="abilities"
            key={`${parent.id}_${result.id}_resist_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' resisted by by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderTypeFieldState = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<TypeFieldStateQuery>) => {
  if (!data || !data.typeByName) return (<div>Data not found for the query 'typeByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.typeByName[0];

  const boostedByResults = parent.boostedByFieldState.edges.map(edge => new TypeFieldStateResult(edge));
  const ignoresResults = parent.ignoresFieldState.edges.map(edge => new TypeFieldStateResult(edge));
  const removesResults = parent.removesFieldState.edges.map(edge => new TypeFieldStateResult(edge));
  const resistedByResults = parent.weakenedByFieldState.edges.map(edge => new TypeFieldStateResult(edge));
  const resistanceResults = parent.resistsFieldState.edges.map(edge => new TypeFieldStateResult(edge));
  const weatherBallResults = parent.weatherBall.edges.map(edge => new TypeFieldStateResult(edge));

  return (
    <>
      {boostedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosted by field state</h3>
        <p className="planner__accordion-clarification">
          Presence of the listed field state boosts the power of moves of this type.
        </p>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parent.id}_${result.id}_boost_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {resistanceResults.filter(result => result.multiplier && result.multiplier < 1).length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Resists field state</h3>
        <p className="planner__accordion-clarification">
          Negative effects of the listed field state on Pokemon of this type are mitigated.
        </p>
        {resistanceResults.filter(result => result.multiplier && result.multiplier < 1).map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parent.id}_${result.id}_resist_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {ignoresResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
          <h3 className="planner__accordion-subitem-header">Ignores field state</h3>
          <p className="planner__accordion-clarification">
            Effects of the listed field state ignored by Pokemon of this type.
          </p>
          {ignoresResults.map(result => (
            <ConnectionAccordionEntry
              targetEntityClass="fieldStates"
              key={`${parent.id}_${result.id}_ignore_fieldState`}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
            />
          ))}
      </div>)}
      {removesResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Removed by type</h3>
        <p className="planner__accordion-clarification">
          Pokemon of this type remove the listed field state upon entry.
        </p>
        {removesResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parent.id}_${result.id}_remove_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {weatherBallResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Weather Ball</h3>
        <p className="planner__accordion-clarification">
          Presence of the listed field state changes the type of Weather Ball to this type.
        </p>
        {weatherBallResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parent.id}_${result.id}_weather_ball_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Weakened by field state</h3>
        <p className="planner__accordion-clarification">
          Presence of the listed field state weakens the power of moves of this type.
        </p>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parent.id}_${result.id}_resist_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {resistanceResults.filter(result => result.multiplier && result.multiplier > 1).length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Weak to field state</h3>
        <p className="planner__accordion-clarification">
          Negative effects of the listed field state on Pokemon of this type are increased.
        </p>
        {resistanceResults.filter(result => result.multiplier && result.multiplier > 1).map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parent.id}_${result.id}_resist_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderTypeItem = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<TypeItemQuery>) => {
  if (!data || !data.typeByName) return (<div>Data not found for the query 'typeByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.typeByName[0];

  const boostedByResults = parent.boostedByItem.edges.map(edge => new TypeItemResult(edge));
  const naturalGiftResults = parent.naturalGift.edges.map(edge => new TypeItemResult(edge));
  const resistedByResults = parent.resistedByItem.edges.map(edge => new TypeItemResult(edge));

  return (
    <>
      {boostedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Boosted by ability</h3>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="items"
            key={`${parent.id}_${result.id}_boost_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {naturalGiftResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Natural gift</h3>
        <p className="planner__accordion-clarification">
          When the owner of the listed item uses Natural Gift, the move will be of this type.
        </p>
        {naturalGiftResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="items"
            key={`${parent.id}_${result.id}_boost_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Power', value: result.power || 0}]}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resisted by ability</h3>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="items"
            key={`${parent.id}_${result.id}_resist_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Multipler', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderTypeMove = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<TypeMoveQuery>) => {
  if (!data || !data.typeByName) return (<div>Data not found for the query 'typeByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the component.');

  const parent = data.typeByName[0];

  const enablesResult = parent.enablesMove.edges.map(edge => new TypeMoveResult(edge));

  return (
    <>
      {enablesResult.length > 0 && (
      <div className="planner__accordion-subitem">
        <h3 className="planner__accordion-subitem-header">Enables move</h3>
        <p className="planner__accordion-clarification">
          Moves of this type serve as the base move for the listed move.
        </p>
        {enablesResult.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="moves"
            key={`${parent.id}_${result.id}_enable_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData,
              gen: gen,
              tierFilter: tierFilter,
              cartNote: `'${result.formattedName}' enabled by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}
