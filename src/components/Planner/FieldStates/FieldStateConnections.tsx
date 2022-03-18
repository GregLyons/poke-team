import { ListRenderArgs, ListRenderArgsIcons } from "../../../hooks/Searches";
import {
  DUMMY_POKEMON_ICON_DATUM
} from "../../../types-queries/helpers";
import {
  FieldStateAbilityQuery, FieldStateAbilityResult, FieldStateEffectQuery, FieldStateEffectResult, FieldStateItemQuery, FieldStateItemResult, FieldStateMoveQuery, FieldStateMoveResult, FieldStateStatQuery, FieldStateStatResult, FieldStateStatusQuery, FieldStateStatusResult, FieldStateTypeQuery, FieldStateTypeResult
} from "../../../types-queries/Planner/FieldState";
import { ENUMCASE_TO_TITLECASE } from "../../../utils/constants";
import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";

export const listRenderFieldStateAbility = ({ data, dispatches, filters, }: ListRenderArgsIcons<FieldStateAbilityQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const parent = data.fieldStateByName[0];

  const activatesResults = parent.activatesAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const createdByResults = parent.createdByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const ignoredByResults = parent.ignoredByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const preventedByResults = parent.preventedByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const removedByResults = parent.removedByAbility.edges.map(edge => new FieldStateAbilityResult(edge));
  const suppressedByResults = parent.suppressedByAbility.edges.map(edge => new FieldStateAbilityResult(edge));

  return (
    <ul className="planner-accordion__subitem-list">
      {activatesResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Activates ability</h3>
        <ul className="planner-accordion__subitem-results">
        {activatesResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Field state"
            targetEntityClass="Ability"
            key={result.id}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' activated by '${parent.formattedName}'.`,
            }}
          />
        ))}
        </ul>
      </li>)}
      {createdByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Created by ability</h3>
        <ul className="planner-accordion__subitem-results">
          {createdByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Ability"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[{key: 'TURN', title: 'Turns', value: result.turns || 0}]}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData,
                filters,
                cartNote: `'${result.formattedName}' creates '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {ignoredByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Ignored by ability</h3>
        <p className="planner-accordion__clarification">
          Effects of field state ignored by owner of the ability.
        </p>
        <ul className="planner-accordion__subitem-results">
          {ignoredByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Ability"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData,
                filters,
                cartNote: `'${result.formattedName}' ignores '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {preventedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Prevented by ability</h3>
        <p className="planner-accordion__clarification">
          Ability prevents the field state from being set up, but does not remove it if the field state is already present.
        </p>
        <ul className="planner-accordion__subitem-results">
        {preventedByResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Field state"
            targetEntityClass="Ability"
            key={result.id}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' prevents '${parent.formattedName}'.`,
            }}
          />
        ))}
        </ul>
      </li>)}
      {removedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Removed by ability</h3>
        <p className="planner-accordion__clarification">
          Ability removes the field state entirely.
        </p>
        <ul className="planner-accordion__subitem-results">
        {removedByResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Field state"
            targetEntityClass="Ability"
            key={result.id}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' removes '${parent.formattedName}'.`,
            }}
          />
        ))}
        </ul>
      </li>)}
      {suppressedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Suppressed by ability</h3>
        <p className="planner-accordion__clarification">
          Effects are suppressed while the ability is present, but the field state is not removed entirely.
        </p>
        <ul className="planner-accordion__subitem-results">
        {suppressedByResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Field state"
            targetEntityClass="Ability"
            key={result.id}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' suppresses '${parent.formattedName}'.`,
            }}
          />
        ))}
        </ul>
      </li>)}
    </ul>
  );
}

export const listRenderFieldStateEffect = ({ data, }: ListRenderArgs<FieldStateEffectQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const parent = data.fieldStateByName[0];

  const effectResults = parent.effects.edges.map(edge => new FieldStateEffectResult(edge));
  
  return (
    <ul className="planner-accordion__subitem-list">
      <li className="planner-accordion__subitem">
        <div className="planner-accordion__subitem-shadow" />
        <ul className="planner-accordion__subitem-results">
          {effectResults.map(result => (
              <ConnectionAccordionEntry
                parentEntityClass="Field state"
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
  )
}

export const listRenderFieldStateItem = ({ data, dispatches, filters, }: ListRenderArgsIcons<FieldStateItemQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const parent = data.fieldStateByName[0];

  const activatesResults = parent.activatesItem.edges.map(edge => new FieldStateItemResult(edge));
  const extendedByResults = parent.extendedByItem.edges.map(edge => new FieldStateItemResult(edge));
  const ignoredByResults = parent.ignoredByItem.edges.map(edge => new FieldStateItemResult(edge));
  const resistedByResults = parent.resistedByItem.edges.map(edge => new FieldStateItemResult(edge));

  return (
    <ul className="planner-accordion__subitem-list">
      {activatesResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Activates item</h3>
        <ul className="planner-accordion__subitem-results">
          {activatesResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Item"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.requiredPokemonIconData,
                linkIconDatum: {
                  iconClass: 'item',
                  iconDatum: result.itemIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' activated by '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {extendedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Extended by item</h3>
        <p className="planner-accordion__clarification">
          When the owner of the item creates this field state, the field state will last for a greater number of turns than usual.
        </p>
        <ul className="planner-accordion__subitem-results">
          {extendedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Item"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[{key: 'TURN', title: 'Turns', value: result.turns || 0}]}
              icons={{
                dispatches,
                pokemonIconData: result.requiredPokemonIconData,
                linkIconDatum: {
                  iconClass: 'item',
                  iconDatum: result.itemIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' extends '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {ignoredByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Ignored by item</h3>
        <p className="planner-accordion__clarification">
          Item allows the owner to ignore the effects of the field state.
        </p>
        <ul className="planner-accordion__subitem-results">
          {ignoredByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Item"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.requiredPokemonIconData,
                linkIconDatum: {
                  iconClass: 'item',
                  iconDatum: result.itemIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' ignores '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {resistedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by item</h3>
        <p className="planner-accordion__clarification">
          Effects of the field state on the owner of the item are weakened (e.g. less damage).
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Item"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.requiredPokemonIconData,
                linkIconDatum: {
                  iconClass: 'item',
                  iconDatum: result.itemIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
    </ul>
  );
}

export const listRenderFieldStateMove = ({ data, dispatches, filters, }: ListRenderArgsIcons<FieldStateMoveQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const parent = data.fieldStateByName[0];

  const createdByResults = parent.createdByMove.edges.map(edge => new FieldStateMoveResult(edge));
  const enhancesResults = parent.enhancesMove.edges.map(edge => new FieldStateMoveResult(edge));
  const hindersResults = parent.hindersMove.edges.map(edge => new FieldStateMoveResult(edge));
  const removedByResults = parent.removedByMove.edges.map(edge => new FieldStateMoveResult(edge));

  return (
    <ul className="planner-accordion__subitem-list">
      {createdByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Created by move</h3>
        <ul className="planner-accordion__subitem-results">
          {createdByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Move"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              data={[{key: 'TURN', title: 'Turns', value: result.turns || 0}]}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData,
                linkIconDatum: {
                  iconClass: 'type',
                  iconDatum: result.typeIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' creates '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {enhancesResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Enhances move</h3>
        <p className="planner-accordion__clarification">
          Presence of the field state increases the effectiveness of the move in some way.
        </p>
        <ul className="planner-accordion__subitem-results">
          {enhancesResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Move"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData,
                linkIconDatum: {
                  iconClass: 'type',
                  iconDatum: result.typeIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' enhanced by '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {hindersResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Hinders move</h3>
        <p className="planner-accordion__clarification">
          Presence of the field state reduces the effectiveness of the move in some way.
        </p>
        <ul className="planner-accordion__subitem-results">
          {hindersResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Move"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData,
                linkIconDatum: {
                  iconClass: 'type',
                  iconDatum: result.typeIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' hindered by '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {removedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Removed by move</h3>
        <ul className="planner-accordion__subitem-results">
          {removedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Move"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData,
                linkIconDatum: {
                  iconClass: 'type',
                  iconDatum: result.typeIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' removes '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
    </ul>
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
    <ul className="planner-accordion__subitem-list">
      {boostStageResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Boosts by stage</h3>
        <ul className="planner-accordion__subitem-results">
        {boostStageResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Field state"
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
              parentEntityClass="Field state"
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
              parentEntityClass="Field state"
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
              parentEntityClass="Field state"
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

export const listRenderFieldStateStatus = ({ data, }: ListRenderArgs<FieldStateStatusQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'itemByName'.</div>);
  
  const parent = data.fieldStateByName[0];

  const causesResults = data.fieldStateByName
  [0].causesStatus.edges.map(edge => new FieldStateStatusResult(edge));
  const resistsResults = parent.resistsStatus.edges.map(edge => new FieldStateStatusResult(edge));

  return (
    <ul className="planner-accordion__subitem-list">
      {causesResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Causes status</h3>
        <ul className="planner-accordion__subitem-results">
          {causesResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
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
          Presence of the field state fully cures the status, prevents the status, or mitigates the status in some way.
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
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

export const listRenderFieldStateType = ({ data, dispatches, filters, }: ListRenderArgsIcons<FieldStateTypeQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);
  
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
    <ul className="planner-accordion__subitem-list">
      {boostsResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Boosts type</h3>
        <p className="planner-accordion__clarification">
          Presence of this field state boosts the power of moves of the listed type.
        </p>
        <ul className="planner-accordion__subitem-results">
        {boostsResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Field state"
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
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Weakens type</h3>
        <p className="planner-accordion__clarification">
          Presence of this field state weakens the power of moves of the listed type.
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistsResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
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
        {resistanceResults.filter(result => result.multiplier !== undefined && result.multiplier > 1).length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Strong against type</h3>
        <p className="planner-accordion__clarification">
          Negative effects of the field state on Pokemon of the listed type are heightened (e.g. more damage).
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistanceResults.filter(result => result.multiplier !== undefined && result.multiplier > 1).map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Type"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
                linkIconDatum: {
                  iconClass: 'type',
                  iconDatum: result.typeIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' weak to '${parent.formattedName}'.`,
              }}
              data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            />
          ))}
        </ul>
      </li>)}
      {weatherBallResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --positive">
        <div className="planner-accordion__subitem-shadow --positive" />
        <h3 className="planner-accordion__subitem-header">Weather Ball</h3>
        <p className="planner-accordion__clarification">
          Presence of this field state changes the type of Weather Ball to the listed type.
        </p>
        <ul className="planner-accordion__subitem-results">
          {weatherBallResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Type"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
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
      {ignoredByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Ignored by type</h3>
        <p className="planner-accordion__clarification">
          Effects of field state ignored by Pokemon of the listed type.
        </p>
        <ul className="planner-accordion__subitem-results">
          {ignoredByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Type"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
                linkIconDatum: {
                iconClass: 'type',
                iconDatum: result.typeIconDatum
              },
                filters,
                cartNote: `'${result.formattedName}' ignores '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {removedByResults.length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Removed by type</h3>
        <p className="planner-accordion__clarification">
          Pokemon of the listed type remove this field state upon entry.
        </p>
        <ul className="planner-accordion__subitem-results">
          {removedByResults.map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Type"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
                linkIconDatum: {
                  iconClass: 'type',
                  iconDatum: result.typeIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' removes '${parent.formattedName}'.`,
              }}
            />
          ))}
        </ul>
      </li>)}
      {resistanceResults.filter(result => result.multiplier !== undefined && result.multiplier < 1).length > 0 && (
      <li className="planner-accordion__subitem planner-accordion__subitem --negative">
        <div className="planner-accordion__subitem-shadow --negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by type</h3>
        <p className="planner-accordion__clarification">
          Negative effects of the field state on Pokemon of the listed type are mitigated (e.g. less damage).
        </p>
        <ul className="planner-accordion__subitem-results">
          {resistanceResults.filter(result => result.multiplier !== undefined && result.multiplier < 1).map(result => (
            <ConnectionAccordionEntry
              parentEntityClass="Field state"
              targetEntityClass="Type"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
              icons={{
                dispatches,
                pokemonIconData: result.pokemonIconData || [DUMMY_POKEMON_ICON_DATUM],
                linkIconDatum: {
                  iconClass: 'type',
                  iconDatum: result.typeIconDatum
                },
                filters,
                cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
              }}
              data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            />
          ))}
        </ul>
      </li>)}
    </ul>
  );
}