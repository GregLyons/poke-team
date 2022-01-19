import {
  ItemEffectResult,
  ItemEffectQuery,

  ItemFieldStateResult,
  ItemFieldStateQuery,
  
  ItemStatResult,
  ItemStatQuery,

  ItemStatusResult,
  ItemStatusQuery,
} from "../../../../types-queries/Item";
import {
  ListRenderArgs,
} from "../helpers";

import ConnectionAccordionEntry from "../ConnectionAccordionEntry";

export const listRenderItemEffect = ({ data, }: ListRenderArgs<ItemEffectQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const parentID = data.itemByName[0].id;

  const effectResults = data.itemByName[0].effects.edges.map(edge => new ItemEffectResult(edge));
  
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

export const listRenderItemFieldState = ({ data, }: ListRenderArgs<ItemFieldStateQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const parentID = data.itemByName[0].id;

  const activatedByResults = data.itemByName[0].activatedByFieldState.edges.map(edge => new ItemFieldStateResult(edge));
  const extendsResults = data.itemByName[0].extendsFieldState.edges.map(edge => new ItemFieldStateResult(edge));
  const ignoresResults = data.itemByName[0].ignoresFieldState.edges.map(edge => new ItemFieldStateResult(edge));
  const resistsResults = data.itemByName[0].resistsFieldState.edges.map(edge => new ItemFieldStateResult(edge));

  return (
    <>
      {activatedByResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Activates field state</h3>
        {activatedByResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_activate_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {extendsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--positive">
        <h3 className="planner__accordion-subitem-header">Extends field state</h3>
        <p className="planner__accordion-clarification">
          When the owner of this item creates the field state, the field state will last for a greater number of turns than usual.
        </p>
        {extendsResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_extend_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'Turns', value: result.turns || 0}]}
          />
        ))}
      </div>)}
      {ignoresResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Ignores field state</h3>
        <p className="planner__accordion-clarification">
          Item allows the owner to ignore the effects of the field state.
        </p>
        {ignoresResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_ignore_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
      {resistsResults.length > 0 && (
      <div className="planner__accordion-subitem planner__accordion-subitem--negative">
        <h3 className="planner__accordion-subitem-header">Resists field state</h3>
        <p className="planner__accordion-clarification">
          Effects of the field state on the owner of the item are weakened (e.g. less damage).
        </p>
        {resistsResults.map(result => (
          <ConnectionAccordionEntry
            targetEntityClass="fieldStates"
            key={`${parentID}_${result.id}_resist_fieldState`}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
          />
        ))}
      </div>)}
    </>
  )
}

export const listRenderItemStat = ({ data, }: ListRenderArgs<ItemStatQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const parentID = data.itemByName[0].id;

  const statResults = data.itemByName[0].modifiesStat.edges.map(edge => new ItemStatResult(edge));
  
  return (
    <>
      {statResults.map(result => (
        <ConnectionAccordionEntry
          targetEntityClass="stats"
          key={`${parentID}_${result.id}_stat`}
          name={result.formattedName}
          linkName={result.name}
          description={result.description}
        />
      ))}
    </>
  )
}

export const listRenderItemStatus = ({ data, }: ListRenderArgs<ItemStatusQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const parentID = data.itemByName[0].id;

  const causesResults = data.itemByName[0].causesStatus.edges.map(edge => new ItemStatusResult(edge));
  const resistsResults = data.itemByName[0].resistsStatus.edges.map(edge => new ItemStatusResult(edge));

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
          The item fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        {causesResults.map(result => (
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