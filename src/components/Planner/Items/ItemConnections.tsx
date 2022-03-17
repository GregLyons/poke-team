import { ListRenderArgs, ListRenderArgsIcons } from "../../../hooks/Searches";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../types-queries/helpers";
import {
  ItemEffectQuery, ItemEffectResult, ItemFieldStateQuery, ItemFieldStateResult, ItemStatQuery, ItemStatResult, ItemStatusQuery, ItemStatusResult, ItemTypeQuery, ItemTypeResult, ItemUsageMethodQuery, ItemUsageMethodResult
} from "../../../types-queries/Planner/Item";
import { ENUMCASE_TO_TITLECASE } from "../../../utils/constants";
import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";

export const listRenderItemEffect = ({ data, }: ListRenderArgs<ItemEffectQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const parent = data.itemByName[0];

  const effectResults = parent.effects.edges.map(edge => new ItemEffectResult(edge));
  
  return (
    <>
      <li className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        <ul className="planner-accordion__sub-item-results">
          {effectResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
              targetEntityClass="Effect"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
            />
          ))}
        </ul>
      </li>
    </>
  )
}

export const listRenderItemFieldState = ({ data, }: ListRenderArgs<ItemFieldStateQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const parent = data.itemByName[0];

  const activatedByResults = parent.activatedByFieldState.edges.map(edge => new ItemFieldStateResult(edge));
  const extendsResults = parent.extendsFieldState.edges.map(edge => new ItemFieldStateResult(edge));
  const ignoresResults = parent.ignoresFieldState.edges.map(edge => new ItemFieldStateResult(edge));
  const resistsResults = parent.resistsFieldState.edges.map(edge => new ItemFieldStateResult(edge));

  return (
    <>
      {activatedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Activated by field state</h3>
        <ul className="planner-accordion__sub-item-results">
          {activatedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
      {extendsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Extends field state</h3>
        <p className="planner-accordion__clarification">
          When the owner of this item creates the field state, the field state will last for a greater number of turns than usual.
        </p>
        <ul className="planner-accordion__sub-item-results">
          {extendsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Ignores field state</h3>
        <p className="planner-accordion__clarification">
          Item allows the owner to ignore the effects of the field state.
        </p>
        <ul className="planner-accordion__sub-item-results">
          {ignoresResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
      {resistsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resists field state</h3>
        <p className="planner-accordion__clarification">
          Effects of the field state on the owner of the item are weakened (e.g. less damage).
        </p>
        <ul className="planner-accordion__sub-item-results">
          {resistsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
    </>
  )
}

export const listRenderItemStat = ({ data, }: ListRenderArgs<ItemStatQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const parent = data.itemByName[0];

  const statResults = parent.modifiesStat.edges.map(edge => new ItemStatResult(edge));
  const boostStageResults = statResults.filter(result => result.stage > 0);
  const reduceStageResults = statResults.filter(result => result.stage < 0);
  const boostMultiplierResults = statResults.filter(result => result.multiplier > 1);
  const reduceMultiplierResults = statResults.filter(result => result.multiplier < 1);

  return (
    <>
      {boostStageResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        <ul className="planner-accordion__sub-item-results">
          {boostStageResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by multiplier</h3>
        <ul className="planner-accordion__sub-item-results">
          {boostMultiplierResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by stage</h3>
        <ul className="planner-accordion__sub-item-results">
          {reduceStageResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Reduces by multiplier</h3>
        <ul className="planner-accordion__sub-item-results">
          {reduceMultiplierResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
    </>
  );
}

export const listRenderItemStatus = ({ data, }: ListRenderArgs<ItemStatusQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const parent = data.itemByName[0];

  const causesResults = parent.causesStatus.edges.map(edge => new ItemStatusResult(edge));
  const resistsResults = parent.resistsStatus.edges.map(edge => new ItemStatusResult(edge));

  return (
    <>
      {causesResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Causes status</h3>
        <ul className="planner-accordion__sub-item-results">
          {causesResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resists status</h3>
        <p className="planner-accordion__clarification">
          The item fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        <ul className="planner-accordion__sub-item-results">
          {causesResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
    </>
  );
}

export const listRenderItemType = ({ data, dispatches, filters, }: ListRenderArgsIcons<ItemTypeQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const parent = data.itemByName[0];

  const boostsResults = parent.boostsType.edges.map(edge => new ItemTypeResult(edge));
  const naturalGiftResults = parent.naturalGift.edges.map(edge => new ItemTypeResult(edge));
  const resistsResults = parent.resistsType.edges.map(edge => new ItemTypeResult(edge));

  return (
    <>
      {boostsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts type</h3>
        <p className="planner-accordion__clarification">
          Item boosts the power of moves of the listed type used by the owner.
        </p> 
        <ul className="planner-accordion__sub-item-results">
          {boostsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
      {naturalGiftResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Natural gift</h3>
        <p className="planner-accordion__clarification">
          When the owner of this item uses Natural Gift, the move will be of the listed type.
        </p> 
        <ul className="planner-accordion__sub-item-results">
          {naturalGiftResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
              targetEntityClass="Type"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[{key: 'POW', title: 'Power', value: result.power || 1}]}
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
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resists type</h3>
        <p className="planner-accordion__clarification">
          Item resists moves of the listed type used against the owner.
        </p>
        <ul className="planner-accordion__sub-item-results">
          {resistsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
    </>
  );
}

export const listRenderItemUsageMethod = ({ data, }: ListRenderArgs<ItemUsageMethodQuery>) => {
  if (!data || !data.itemByName) return (<div>Data not found for the query 'itemByName'.</div>);

  const parent = data.itemByName[0];

  const activatedByResults = parent.activatedByUsageMethod.edges.map(edge => new ItemUsageMethodResult(edge));
  const boostsResults = parent.boostsUsageMethod.edges.map(edge => new ItemUsageMethodResult(edge));
  const resistsResults = parent.resistsUsageMethod.edges.map(edge => new ItemUsageMethodResult(edge));

  return (
    <>
      {activatedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Activated by usage method</h3>
        <ul className="planner-accordion__sub-item-results">
          {activatedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
      {boostsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosts usage method</h3>
        <p className="planner-accordion__clarification">
          Item boosts the power of moves of this usage method used by the Pokemon.
        </p> 
        <ul className="planner-accordion__sub-item-results">
          {boostsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
      {resistsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resists usage method</h3>
        <p className="planner-accordion__clarification">
          Item resists moves of this usage method used against the Pokemon.
        </p>
        <ul className="planner-accordion__sub-item-results">
          {resistsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Item"
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
    </>
  );
}