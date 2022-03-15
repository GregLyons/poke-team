import { ListRenderArgs, ListRenderArgsIcons } from "../../../hooks/Searches";
import {
  TypeAbilityQuery, TypeAbilityResult, TypeFieldStateQuery, TypeFieldStateResult, TypeItemQuery, TypeItemResult, TypeMoveQuery, TypeMoveResult
} from "../../../types-queries/Planner/Type";
import ConnectionAccordionEntry from "../Entries/ConnectionEntry/ConnectionEntry";

export const listRenderTypeAbility = ({ data, dispatches, filters, }: ListRenderArgsIcons<TypeAbilityQuery>) => {
  if (!data || !data.typeByName) return (<div>Data not found for the query 'typeByName'.</div>);

  const parent = data.typeByName[0];

  const boostedByResults = parent.boostedByAbility.edges.map(edge => new TypeAbilityResult(edge));
  const resistedByResults = parent.resistedByAbility.edges.map(edge => new TypeAbilityResult(edge));

  return (
    <>
      {boostedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosted by ability</h3>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Type"
            targetEntityClass="Ability"
            key={result.id}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' boosts '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by ability</h3>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Type"
            targetEntityClass="Ability"
            key={result.id}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' resists '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderTypeFieldState = ({ data, }: ListRenderArgs<TypeFieldStateQuery>) => {
  if (!data || !data.typeByName) return (<div>Data not found for the query 'typeByName'.</div>);

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
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosted by field state</h3>
        <p className="planner-accordion__clarification">
          Presence of the listed field state boosts the power of moves of this type.
        </p>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Type"
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
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {resistanceResults.filter(result => result.multiplier !== undefined && result.multiplier < 1).length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Resists field state</h3>
        <p className="planner-accordion__clarification">
          Negative effects of the listed field state on Pokemon of this type are mitigated.
        </p>
        {resistanceResults.filter(result => result.multiplier !== undefined && result.multiplier < 1).map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Type"
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
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {ignoresResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
          <h3 className="planner-accordion__subitem-header">Ignores field state</h3>
          <p className="planner-accordion__clarification">
            Effects of the listed field state ignored by Pokemon of this type.
          </p>
          {ignoresResults.map(result => (
            <ConnectionAccordionEntry
          parentEntityClass="Type"
              targetEntityClass="Field state"
              key={result.id}
              name={result.formattedName}
              linkName={result.name}
              description={result.description}
            />
          ))}
      </div>)}
      {removesResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Removes field state</h3>
        <p className="planner-accordion__clarification">
          Pokemon of this type remove the listed field state upon entry.
        </p>
        {removesResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Type"
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
      </div>)}
      {weatherBallResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Weather Ball</h3>
        <p className="planner-accordion__clarification">
          Presence of the listed field state changes the type of Weather Ball to this type.
        </p>
        {weatherBallResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Type"
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
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Weakened by field state</h3>
        <p className="planner-accordion__clarification">
          Presence of the listed field state weakens the power of moves of this type.
        </p>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
            parentEntityClass="Type"
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
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
      {resistanceResults.filter(result => result.multiplier !== undefined && result.multiplier > 1).length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Weak to field state</h3>
        <p className="planner-accordion__clarification">
          Negative effects of the listed field state on Pokemon of this type are increased.
        </p>
        {resistanceResults.filter(result => result.multiplier !== undefined && result.multiplier > 1).map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Type"
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
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
          />
        ))}
      </div>)}
    </>
  );
}

export const listRenderTypeItem = ({ data, dispatches, filters, }: ListRenderArgsIcons<TypeItemQuery>) => {
  if (!data || !data.typeByName) return (<div>Data not found for the query 'typeByName'.</div>);

  const parent = data.typeByName[0];

  const boostedByResults = parent.boostedByItem.edges.map(edge => new TypeItemResult(edge));
  const naturalGiftResults = parent.naturalGift.edges.map(edge => new TypeItemResult(edge));
  const resistedByResults = parent.resistedByItem.edges.map(edge => new TypeItemResult(edge));

  return (
    <>
      {boostedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Boosted by ability</h3>
        {boostedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Type"
            targetEntityClass="Item"
            key={result.id}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
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
      {naturalGiftResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--positive">
        <div className="planner-accordion__subitem-shadow--positive" />
        <h3 className="planner-accordion__subitem-header">Natural gift</h3>
        <p className="planner-accordion__clarification">
          When the owner of the listed item uses Natural Gift, the move will be of this type.
        </p>
        {naturalGiftResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Type"
            targetEntityClass="Item"
            key={result.id}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'POW', title: 'Power', value: result.power || 0}]}
            icons={{
              dispatches,
              pokemonIconData: result.requiredPokemonIconData,
              linkIconDatum: {
                iconClass: 'item',
                iconDatum: result.itemIconDatum
              },
              filters,
              cartNote: `'${result.formattedName}' has Natural Gift type '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
      {resistedByResults.length > 0 && (
      <div className="planner-accordion__subitem planner-accordion__subitem--negative">
        <div className="planner-accordion__subitem-shadow--negative" />
        <h3 className="planner-accordion__subitem-header">Resisted by ability</h3>
        {resistedByResults.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Type"
            targetEntityClass="Item"
            key={result.id}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            data={[{key: 'MULT', title: 'Multiplier', value: result.multiplier !== undefined ? result.multiplier : 1}]}
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
      </div>)}
    </>
  );
}

export const listRenderTypeMove = ({ data, dispatches, filters, }: ListRenderArgsIcons<TypeMoveQuery>) => {
  if (!data || !data.typeByName) return (<div>Data not found for the query 'typeByName'.</div>);

  const parent = data.typeByName[0];

  const enablesResult = parent.enablesMove.edges.map(edge => new TypeMoveResult(edge));

  return (
    <>
      {enablesResult.length > 0 && (
      <div className="planner-accordion__subitem">
        <h3 className="planner-accordion__subitem-header">Enables move</h3>
        <p className="planner-accordion__clarification">
          Moves of this type serve as the base move for the listed move.
        </p>
        {enablesResult.map(result => (
          <ConnectionAccordionEntry
          parentEntityClass="Type"
            targetEntityClass="Move"
            key={result.id}
            name={result.formattedName}
            linkName={result.name}
            description={result.description}
            icons={{
              dispatches,
              pokemonIconData: result.pokemonIconData,
              filters,
              cartNote: `'${result.formattedName}' enabled by '${parent.formattedName}'.`,
            }}
          />
        ))}
      </div>)}
    </>
  );
}
