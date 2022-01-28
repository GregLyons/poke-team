import { Cart, CartAction, GenFilter, PokemonFilter, TeamAction } from "../../../hooks/app-hooks";
import { GenerationNum } from "../../../types-queries/helpers";
import { TierFilter } from "../../../utils/smogonLogic";
import CartViewAccordion from "./CartViewAccordion";
import CartViewPokemonIcons from "./CartViewPokemonIcons";

type CartViewProps = {
  cart: Cart
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const CartView = ({
  cart,
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
}: CartViewProps) => {
  return (
    <div className="builder__cart-view-wrapper">
      <CartViewAccordion
        accordionRole="parent-entity"
        accordionData={Object.entries(cart[genFilter.gen].pokemon).map(([parentEntityClass, obj]) => {
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
                                    genFilter={genFilter}
                                    tierFilter={tierFilter}
                                    pokemonFilter={pokemonFilter}
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