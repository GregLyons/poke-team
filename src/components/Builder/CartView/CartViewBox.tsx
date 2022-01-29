import { useEffect, useRef } from "react";
import { Selection, SelectionAction } from "../../../hooks/planner-hooks";
import { GenerationNum, ItemIconDatum, PokemonIconDatum } from "../../../types-queries/helpers";
import { psIDToDoublesTier, TierFilter } from '../../../utils/smogonLogic';
import { psIDToSinglesTier as psIDToSinglesTier } from "../../../utils/smogonLogic";
import { Box, CartAction, GenFilter, PokemonFilter, TeamAction, validatePokemon } from "../../../hooks/app-hooks";

import CartViewPokemonIcons from "./CartViewPokemonIcons";

type CartViewBoxProps = {
  note: string
  pokemonIconData: PokemonIconDatum[]
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
  handleIntersectClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, box: Box) => void
}

const CartViewBox = ({
  note,
  pokemonIconData,
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
  handleIntersectClick,
}: CartViewBoxProps) => {
  return (
    <>
      <CartViewPokemonIcons
        note={note}
        pokemonIconData={pokemonIconData}
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        genFilter={genFilter}
        tierFilter={tierFilter}
        pokemonFilter={pokemonFilter}
      />
      <button
        onClick={(e) => handleIntersectClick(e, {note, pokemon: pokemonIconData})}
      >
        Intersect
      </button>
    </>
  )
};

export default CartViewBox;