import {
  PokemonIconDatum,
} from "../../../types-queries/helpers"



type CartViewGroupProps = {
  pokemonIconData: PokemonIconDatum[]
}

const CartViewGroup = ({
  pokemonIconData,
}: CartViewGroupProps) => {
  return (
    <>
      {pokemonIconData.map(icon => {
        return (
          <>
          </>
        );
      })}
    </>
  )
}

export default CartViewGroup