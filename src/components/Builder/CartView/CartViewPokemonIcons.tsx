import { useEffect, useRef } from "react";
import { Selection, SelectionAction } from "../../../hooks/planner-hooks";
import { GenerationNum, ItemIconDatum, PokemonIconDatum } from "../../../types-queries/helpers";
import { psIDToDoublesTier, TierFilter } from '../../../utils/smogonLogic';
import { psIDToSinglesTier as psIDToSinglesTier } from "../../../utils/smogonLogic";
import { CartAction, GenFilter, TeamAction } from "../../../hooks/app-hooks";
import CartViewPokemonIcon from "./CartViewPokemonIcon";

type CartViewPokemonIconProps = {
  key: string
  pokemonIconData: PokemonIconDatum[]
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const CartViewPokemonIcons = ({
  key,
  pokemonIconData,
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: CartViewPokemonIconProps) => {
  // If there is no icon 
  const hasIcon = useRef(false);
  useEffect(() => {
    hasIcon.current = false;
  }, [tierFilter])

  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.
  let seenPokemon: {[k: string]: boolean} = {};

  return (
    <div className="builder__pokemon-icons">
      {pokemonIconData.map(pokemonIconDatum => {
        const { name, psID, } = pokemonIconDatum;
        const tier = tierFilter.format === 'singles' ? psIDToSinglesTier(genFilter.gen, psID) : psIDToDoublesTier(genFilter.gen, psID);

        // Ignore duplicate Pokemon
        if(seenPokemon.hasOwnProperty(name)) return
      
        // Add Pokemon to list of seen Pokemon
        else seenPokemon[name] = true;
        
        // If tier is not selected, return
        if (tier && !tierFilter['tiers'][tier]) return;

        hasIcon.current = true;

        return (
          <CartViewPokemonIcon
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            key={key + '_' + name + '_icon'}
            pokemonIconDatum={pokemonIconDatum}
          />
        );
      })}
    </div>
  )
}

export default CartViewPokemonIcons;