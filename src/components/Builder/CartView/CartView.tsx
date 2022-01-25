import { Cart, CartAction, TeamAction } from "../../../hooks/app-hooks";
import { GenerationNum } from "../../../types-queries/helpers";
import { EntityClass } from "../../../utils/constants";
import { TierFilter } from "../../../utils/smogonLogic";
import CartViewGroup from "./CartViewGroup";
import CartViewPokemonIcons from "./CartViewPokemonIcons";

type CartViewProps = {
  cart: Cart
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const CartView = ({
  cart,
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: CartViewProps) => {
  console.log(cart);
  return (
    <>
      {Object.entries(cart[gen].pokemon).map(([parentEntityClass, obj]) => {
        return (
          <>
            <h1>{parentEntityClass}</h1>
            {Object.entries(obj).map(([targetEntityClass, innerObj]) => {
              return (
              <>
                <h2>{targetEntityClass}</h2>
                {Object.entries(innerObj).map(([note, pokemonIconData]) => {
                  return (
                    <>
                      <h3>{note}</h3>
                      <CartViewPokemonIcons
                        key={note}
                        pokemonIconData={pokemonIconData}
                        dispatchCart={dispatchCart}
                        dispatchTeam={dispatchTeam}
                        gen={gen}
                        tierFilter={tierFilter}
                      />
                    </>
                  );
                })}
              </>
              )
            })}
          </>
        )
      })}
    </>
  )
}

export default CartView;