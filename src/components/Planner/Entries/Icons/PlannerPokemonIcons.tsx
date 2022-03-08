import { useEffect, useRef } from "react";
import { displayReason, validatePokemon, ValidationFailureReason } from "../../../../hooks/App/PokemonFilter";
import { Selection, SelectionAction } from "../../../../hooks/Planner/Selections";
import { PokemonIconDatum } from "../../../../types-queries/helpers";
import Button from "../../../Reusables/Button/Button";
import { EntryIconData } from "../../helpers";
import './Icons.css';
import PlannerPokemonIcon from "./PlannerPokemonIcon";
import SelectionControls from "./SelectionControls";


type PlannerPokemonIconsProps = {
  context: 'search' | 'accordion'
  key: string
  selection: Selection
  expand: boolean
  dispatchSelection: React.Dispatch<SelectionAction>
  toggleSelection: (psID: string) => void
  icons: EntryIconData
  handleAddToCart: () => void
  expandListeners: {
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
}

const PlannerPokemonIcons = ({
  context,
  key,
  expandListeners,
  selection,
  expand,
  dispatchSelection,
  toggleSelection,
  icons,
  handleAddToCart,
}: PlannerPokemonIconsProps) => {

  // If there is no icon, display a reason for there not being icons
  const reason = useRef<ValidationFailureReason>('');
  const hasIcon = useRef(false);
  useEffect(() => {
    hasIcon.current = false;
  }, [icons?.filters]);

  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.
  let seenPokemon: {[k: string]: boolean} = {};

  return (
    <div className={`planner-${context}__entry-icons`}>
      <div className="planner__control-buttons">
        {/* Will only render anything for entries which could have icons. */}
        {icons.dispatches 
          ? <SelectionControls
              selection={selection}
              dispatchSelection={dispatchSelection}
              dispatches={icons.dispatches}
              handleAddToCart={handleAddToCart}
              hasIcon={hasIcon}
            />
          : <div>
              No Pokemon to show.
              <Button
                title=''
                label='A'
                active={false}
                onClick={() => null}
                disabled={true}
                immediate={false}
              />
            </div>
        }
      </div>
      <br />
      <div 
        onMouseEnter={expandListeners.onMouseEnter}
        onMouseLeave={() => {
          // If haven't expanded yet, then leaving will prevent the expand
          if (!expand) expandListeners.onMouseLeave();
        }}
        className={`planner__pokemon-icons-background`}
      >
        {icons.pokemonIconData && icons.pokemonIconData.map(pokemonIconDatum => {
          const psID = pokemonIconDatum.psID;

          // E.g. DUMMY_POKEMON_DATUM
          if (!icons.filters || !icons.dispatches) return;
          if (!psID) return;

          // Ignore duplicate Pokemon
          if(seenPokemon.hasOwnProperty(pokemonIconDatum.psID)) return
        
          // Add Pokemon to list of seen Pokemon
          else seenPokemon[pokemonIconDatum.psID] = true;

          const { validated, reason: reasonForFailure } = validatePokemon({
            pokemonIconDatum, 
            ...icons.filters,
          });

          if (!validated) {
            reason.current = reasonForFailure || '';
            return;
          }

          hasIcon.current = true;

          return (
            <PlannerPokemonIcon
              key={key + '_' + pokemonIconDatum.psID + '_icon'}
              pokemonIconDatum={pokemonIconDatum}
              selected={selection.hasOwnProperty(psID) && (selection[psID] as {
                nameData: PokemonIconDatum,
                selected: boolean,
              }).selected} 
              toggleSelection={toggleSelection}
            />
          );
        })}
        {!hasIcon.current && displayReason(reason.current).length > 0 && <div className="planner__pokemon-icons-reason">
          {displayReason(reason.current)}
        </div>}
      </div>
    </div>
  )
}

export default PlannerPokemonIcons;