import { useEffect, useRef } from "react";
import { psIDToDoublesTier, psIDToSinglesTier as psIDToSinglesTier } from "../../../utils/smogonLogic";
import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter, validatePokemon } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";
import CartViewPokemonIcon from "./CartViewPokemonIcon";
import { PokemonIconDatum } from "../../../types-queries/helpers";
import { TierFilter } from "../../../hooks/App/TierFilter";

type CartViewPokemonIconProps = {
  note: string
  pokemonIconData: PokemonIconDatum[]
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const CartViewPokemonIcons = ({
  note,
  pokemonIconData,
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
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

        if (!validatePokemon(pokemonIconDatum, pokemonFilter)) return;

        hasIcon.current = true;

        return (
          <CartViewPokemonIcon
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            key={note + '_' + name + '_icon'}
            pokemonIconDatum={pokemonIconDatum}
          />
        );
      })}
    </div>
  )
}

export default CartViewPokemonIcons;