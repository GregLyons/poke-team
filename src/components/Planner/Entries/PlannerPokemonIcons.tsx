import { useEffect, useRef } from "react";
import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter, validatePokemon } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";
import { TierFilter } from "../../../hooks/App/TierFilter";
import { SelectionAction, Selection } from "../../../hooks/Planner/Selections";
import { ItemIconDatum, PokemonIconDatum, psID } from "../../../types-queries/helpers";
import { DoublesTier, psIDToDoublesTier, } from '../../../utils/smogonLogic';
import { psIDToSinglesTier as psIDToSinglesTier } from "../../../utils/smogonLogic";
import PlannerPokemonIcon from "./PlannerPokemonIcon";
import SelectionControls from "./SelectionControls";

type PlannerPokemonIconsProps = {
  context: 'search' | 'accordion'
  key: string
  selection: Selection
  dispatchSelection: React.Dispatch<SelectionAction>
  toggleSelection: (psID: string) => void
  icons: {
    pokemonIconData: PokemonIconDatum[]
    itemIconDatum?: ItemIconDatum
    dispatchCart: React.Dispatch<CartAction>
    dispatchTeam: React.Dispatch<TeamAction>
    genFilter: GenFilter
    tierFilter: TierFilter
    pokemonFilter: PokemonFilter
    cartNote: string
  }
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
  // If there is no icon 
  const hasIcon = useRef(false);
  useEffect(() => {
    hasIcon.current = false;
  }, [icons?.tierFilter])

  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.
  let seenPokemon: {[k: string]: boolean} = {};

  return (
    <div className={`planner-${context}__entry-icons`}>
      {/* Will only render anything for entries which could have icons. */}
      {<SelectionControls
        dispatchSelection={dispatchSelection}
        handleAddToCart={handleAddToCart}
        hasIcon={hasIcon}
        icons={icons}
      />}
      <br />
      <div className={`planner__pokemon-icons-background`}>
        {icons.pokemonIconData.map(pokemonIconDatum => {
          const psID: psID = pokemonIconDatum.psID;

          // E.g. DUMMY_POKEMON_DATUM
          if (!psID) return;

          const tier = icons.tierFilter.format === 'singles' ? psIDToSinglesTier(icons.genFilter.gen, pokemonIconDatum.psID) : (psIDToDoublesTier(icons.genFilter.gen, pokemonIconDatum.psID)?.replace('LC', 'DLC').replace('NFE', 'DNFE') as DoublesTier);

          // Ignore duplicate Pokemon
          if(seenPokemon.hasOwnProperty(pokemonIconDatum.name)) return
        
          // Add Pokemon to list of seen Pokemon
          else seenPokemon[pokemonIconDatum.name] = true;
          
          // If tier is not selected, return
          if (tier && !icons.tierFilter['tiers'][tier]) return;

          if (!validatePokemon(pokemonIconDatum, icons.pokemonFilter)) return;

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
      </div>
    </div>
  )
}

export default PlannerPokemonIcons;