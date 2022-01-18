import {
  FieldStateAbilityResult,
  FieldStateAbilityQuery,

  FieldStateEffectResult,
  FieldStateEffectQuery,

  FieldStateItemResult,
  FieldStateItemQuery,

  FieldStateMoveResult,
  FieldStateMoveQuery,

  FieldStateStatusResult,
  FieldStateStatusQuery,
} from "../../../../types-queries/FieldState";
import {
  ListRenderArgs,
  MissingDispatchError,
} from "../helpers";

import EntityAccordionEntry from "../EntityAccordionEntry";

export const listRenderFieldStateAbility = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<FieldStateAbilityQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');

  const parentID = data.fieldStateByName[0].id;

  const activatesResults = data.fieldStateByName[0].activatesAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const createdByResults = data.fieldStateByName[0].createdByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const ignoredByResults = data.fieldStateByName[0].ignoredByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const preventedByResults = data.fieldStateByName[0].preventedByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const removedByResults = data.fieldStateByName[0].removedByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const suppressedByResults = data.fieldStateByName[0].suppressedByAbility.edges.map(edge => new FieldStateAbilityResult(edge));

  return (
    <>
      {activatesResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Activates ability</h3>
        {activatesResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_activate_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {createdByResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Created by ability</h3>
        {createdByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_create_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {ignoredByResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Ignored by ability</h3>
        <p className="planner__accordion-clarification">
          Effects of field state ignored by owner of the ability.
        </p>
        {createdByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_ignore_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {preventedByResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Prevented by ability</h3>
        <p className="planner__accordion-clarification">
          Ability prevents the field state from being set up, but does not remove it if the field state is already present.
        </p>
        {preventedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_prevent_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {removedByResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Removed by ability</h3>
        <p className="planner__accordion-clarification">
          Ability removes the field state entirely.
        </p>
        {removedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_remove_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {suppressedByResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Suppressed by ability</h3>
        <p className="planner__accordion-clarification">
          Effects are suppressed while the ability is present, but the field state is not removed entirely.
        </p>
        {suppressedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_suppress_ability`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
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

export const listRenderFieldStateEffect = ({ data, }: ListRenderArgs<FieldStateEffectQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const parentID = data.fieldStateByName[0].id;

  const effectResults = data.fieldStateByName[0].effects.edges.map(edge => new FieldStateEffectResult(edge));
  
  return (
    <>
      {effectResults.map(result => (
        <EntityAccordionEntry
          parentEntityClass="fieldStates"
          key={`${parentID}_${result.id}_effect`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
        />
      ))}
    </>
  )
}

export const listRenderFieldStateItem = ({ data, }: ListRenderArgs<FieldStateItemQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const parentID = data.fieldStateByName[0].id;

  const activatesResults = data.fieldStateByName[0].activatesItem.edges.map(edge => new FieldStateItemResult(edge));
  const extendedByResults = data.fieldStateByName[0].extendedByItem.edges.map(edge => new FieldStateItemResult(edge));
  const ignoredByResults = data.fieldStateByName[0].ignoredByItem.edges.map(edge => new FieldStateItemResult(edge));
  const resistedByResults = data.fieldStateByName[0].resistedByItem.edges.map(edge => new FieldStateItemResult(edge));

  return (
    <>
      {activatesResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Activates item</h3>
        {activatesResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_activate_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {extendedByResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Extended by item</h3>
        <p className="planner__accordion-clarification">
          When the owner of the item creates this field state, the field state will last for a greater number of turns than usual.
        </p>
        {extendedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_extend_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
          />
        ))}
      </div>)}
      {ignoredByResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Ignored by item</h3>
        <p className="planner__accordion-clarification">
          Item allows the owner to ignore the effects of the field state.
        </p>
        {extendedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_ignore_item`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resisted by item</h3>
        <p className="planner__accordion-clarification">
          Effects of the field state on the owner of the item are weakened (e.g. less damage).
        </p>
        {resistedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
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

export const listRenderFieldStateMove = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<FieldStateMoveQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');

  const parentID = data.fieldStateByName[0].id;

  const createdByResults = data.fieldStateByName[0].createdByMove.edges.map(edge => new FieldStateMoveResult(edge));
  const enhancesResults = data.fieldStateByName[0].enhancesMove.edges.map(edge => new FieldStateMoveResult(edge));
  const hindersResults = data.fieldStateByName[0].hindersMove.edges.map(edge => new FieldStateMoveResult(edge));
  const removedByResults = data.fieldStateByName[0].removedByMove.edges.map(edge => new FieldStateMoveResult(edge));

  return (
    <>
      {createdByResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Created by move</h3>
        {createdByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_create_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {enhancesResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Enhances move</h3>
        <p className="planner__accordion-clarification">
          Presence of the field state increases the effectiveness of the move in some way.
        </p>
        {enhancesResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_enhance_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {hindersResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Hinders move</h3>
        <p className="planner__accordion-clarification">
          Presence of the field state reduces the effectiveness of the move in some way.
        </p>
        {hindersResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_hinder_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatchCart: dispatchCart,
              dispatchTeam: dispatchTeam,
              iconData: result.pokemonIconData
            }}
          />
        ))}
      </div>)}
      {removedByResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Removed by move</h3>
        {removedByResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_remove_move`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
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

export const listRenderFieldStateStatus = ({ data, }: ListRenderArgs<FieldStateStatusQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'itemByName'.</div>);
  
  const parentID = data.fieldStateByName[0].id;

  const causesResults = data.fieldStateByName
  [0].causesStatus.edges.map(edge => new FieldStateStatusResult(edge));
  const resistsResults = data.fieldStateByName[0].resistsStatus.edges.map(edge => new FieldStateStatusResult(edge));

  return (
    <>
      {causesResults.length > 0 && (
      <div className="planner__accordion-content--positive">
        <h3>Causes status</h3>
        {causesResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
            key={`${parentID}_${result.id}_cause_status`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Chance', value: result.chance || 0}]}
          />
        ))}
      </div>)}
      {resistsResults.length > 0 && (
      <div className="planner__accordion-content--negative">
        <h3>Resists status</h3>
        <p className="planner__accordion-clarification">
          Presence of the field state fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        {resistsResults.map(result => (
          <EntityAccordionEntry
            parentEntityClass="fieldStates"
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