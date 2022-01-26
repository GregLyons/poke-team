import { Cart, CartAction, TeamAction } from "../../../hooks/app-hooks";
import { GenerationNum } from "../../../types-queries/helpers";
import { TierFilter } from "../../../utils/smogonLogic";
import CartViewAccordion from "./CartViewAccordion";
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
    <div className="builder__cart-view-wrapper">
      <CartViewAccordion
        accordionRole="parent-entity"
        accordionData={Object.entries(cart[gen].pokemon).map(([parentEntityClass, obj]) => {
          return {
            title: parentEntityClass,
            content: (
              <CartViewAccordion
              accordionRole="target-entity"
                accordionData={Object.entries(obj)
                  .map(([targetEntityClass, innerObj]) => {
                    return {
                      title: targetEntityClass,
                      content: (
                        <CartViewAccordion
                        accordionRole="note"
                          accordionData={Object.entries(innerObj)
                            .map(([note, pokemonIconData]) => {
                              return {
                                title: note,
                                content: (
                                  <CartViewPokemonIcons
                                    key={note}
                                    pokemonIconData={pokemonIconData}
                                    dispatchCart={dispatchCart}
                                    dispatchTeam={dispatchTeam}
                                    gen={gen}
                                    tierFilter={tierFilter}
                                  />
                                )
                              }
                            })}
                        />
                      )
                    };
                })}
              />
            ),
          }
        })}
      />
    </div>
  )
}

export default CartView;