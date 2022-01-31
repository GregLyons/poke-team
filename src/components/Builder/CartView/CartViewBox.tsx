
import { Box, CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";
import { TierFilter } from "../../../hooks/App/TierFilter";
import { PokemonIconDatum } from "../../../types-queries/helpers";
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