import { useEffect, useRef, useState } from "react";
import { CartAction } from "../../../../hooks/App/Cart";
import { GenFilter } from "../../../../hooks/App/GenFilter";
import { displayReason, PokemonFilter, validatePokemon, ValidationFailureReason } from "../../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../../hooks/App/Team";
import { TierFilter } from "../../../../hooks/App/TierFilter";
import { SelectionAction, Selection } from "../../../../hooks/Planner/Selections";
import { ItemIconDatum, PokemonIconDatum, psID } from "../../../../types-queries/helpers";
import PlannerPokemonIcon from "./PlannerPokemonIcon";
import SelectionControls from "./SelectionControls";

import './Icons.css';
import { EntryIconData } from "../../helpers";

type PlannerPokemonIconsProps = {
  context: 'search' | 'accordion'
  key: string
  selection: Selection
  dispatchSelection: React.Dispatch<SelectionAction>
  toggleSelection: (psID: string) => void
  icons: EntryIconData
  handleAddToCart: () => void
}

const PlannerPokemonIcons = ({
  context,
  key,
  selection,
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
  }, [icons?.tierFilter, icons?.pokemonFilter, icons?.genFilter]);

  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.
  let seenPokemon: {[k: string]: boolean} = {};

  return (
    <div className={`planner-${context}__entry-icons`}>
      {/* Will only render anything for entries which could have icons. */}
      {<SelectionControls
        dispatchSelection={dispatchSelection}
        handleAddToCart={handleAddToCart}
        hasIcon={hasIcon}
        reason={reason}
        dispatchBGManager={icons.dispatchBGManager}
      />}
      <br />
      <div className={`planner__pokemon-icons-background`}>
        {icons.pokemonIconData.map(pokemonIconDatum => {
          const psID: psID = pokemonIconDatum.psID;

          // E.g. DUMMY_POKEMON_DATUM
          if (!psID) return;

          // Ignore duplicate Pokemon
          if(seenPokemon.hasOwnProperty(pokemonIconDatum.name)) return
        
          // Add Pokemon to list of seen Pokemon
          else seenPokemon[pokemonIconDatum.name] = true;

          const { validated, reason: reasonForFailure } = validatePokemon({
            pokemonIconDatum, 
            ...icons,
          });

          if (!validated) {
            reason.current = reasonForFailure || '';
            return;
          }

          hasIcon.current = true;

          return (
            <PlannerPokemonIcon
              dispatchCart={icons.dispatchCart}
              dispatchTeam={icons.dispatchTeam}
              key={key + '_' + pokemonIconDatum.name + '_icon'}
              pokemonIconDatum={pokemonIconDatum}
              selected={selection.hasOwnProperty(psID) && (selection[psID] as {
                nameData: PokemonIconDatum,
                selected: boolean,
              }).selected} 
              toggleSelection={toggleSelection}
            />
          );
        })}
        {!hasIcon.current && <div className="planner__pokemon-icons-reason">
          {displayReason(reason.current)}
        </div>}
      </div>
    </div>
  )
}

export default PlannerPokemonIcons;