import { useEffect, useRef } from "react";
import { Selection, SelectionAction } from "../../../hooks/planner-hooks";
import { GenerationNum, ItemIconDatum, PokemonIconDatum } from "../../../types-queries/helpers";
import { psIDToDoublesTier, TierFilter } from '../../../utils/smogonLogic';
import { psIDToSinglesTier as psIDToSinglesTier } from "../../../utils/smogonLogic";
import { CartAction, GenFilter, TeamAction } from "../../../hooks/app-hooks";
import PlannerPokemonIcon from "../PlannerPokemonIcon";
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
    <div className={`planner__${context}-row-icons`}>
      {icons.pokemonIconData.map(pokemonIconDatum => {
        const { psID, } = pokemonIconDatum;
        const tier = icons.tierFilter.format === 'singles' ? psIDToSinglesTier(icons.genFilter.gen, pokemonIconDatum.psID) : psIDToDoublesTier(icons.genFilter.gen, pokemonIconDatum.psID);

        // Ignore duplicate Pokemon
        if(seenPokemon.hasOwnProperty(pokemonIconDatum.name)) return
      
        // Add Pokemon to list of seen Pokemon
        else seenPokemon[pokemonIconDatum.name] = true;
        
        // If tier is not selected, return
        if (tier && !icons.tierFilter['tiers'][tier]) return;

        hasIcon.current = true;
        console.log(psID);

        return (
          <PlannerPokemonIcon
            dispatchCart={icons.dispatchCart}
            dispatchTeam={icons.dispatchTeam}
            key={key + '_' + pokemonIconDatum.name + '_icon'}
            pokemonIconDatum={pokemonIconDatum}
            selected={selection[psID]?.selected}
            toggleSelection={toggleSelection}
          />
        );
      })}
      <br />
      {/* Will only render anything for entries which could have icons. */}
      {<SelectionControls
        dispatchSelection={dispatchSelection}
        handleAddToCart={handleAddToCart}
        hasIcon={hasIcon}
        icons={icons}
      />}
    </div>
  )
}

export default PlannerPokemonIcons;