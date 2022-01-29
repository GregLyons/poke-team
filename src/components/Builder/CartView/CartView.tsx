import { useState } from "react";
import { Box, Cart, CartAction, GenFilter, PokemonFilter, TeamAction } from "../../../hooks/app-hooks";
import { GenerationNum, PokemonIconDatum } from "../../../types-queries/helpers";
import { TierFilter } from "../../../utils/smogonLogic";
import CartViewAccordion from "./CartViewAccordion";
import CartViewBox from "./CartViewBox";
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
  const [intersectMode, setIntersectMode] = useState<{
    on: boolean
    box1: Box
  }>({
    on: false,
    box1: {
      note: '',
      pokemon: [],
    }
  });

  console.log(intersectMode);
  console.log(cart[8].intersectionBoxes);

  const handleIntersectClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, box: Box) => {
    console.log(box);
    if (!intersectMode.on) {
      // Load box to be intersected
      setIntersectMode({
        on: true,
        box1: box,
      });
    }
    else {
      dispatchCart({
        type: 'intersect',
        payload: {
          gen: genFilter.gen,
          box1: intersectMode.box1,
          box2: box,
        }
      })
      setIntersectMode({
        on: false,
        box1: {
          note: '',
          pokemon: [],
        }
      });
    }
  }

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
                                  <CartViewBox
                                    note={note}
                                    handleIntersectClick={handleIntersectClick}
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
      {cart[genFilter.gen].intersectionBoxes && Object.entries(cart[genFilter.gen].intersectionBoxes)
          .map(([note, pokemonIconData]) => {
            return (
              <>
                {note}
                <CartViewBox
                  note={note}
                  handleIntersectClick={handleIntersectClick}
                  pokemonIconData={pokemonIconData}
                  dispatchCart={dispatchCart}
                  dispatchTeam={dispatchTeam}
                  genFilter={genFilter}
                  tierFilter={tierFilter}
                  pokemonFilter={pokemonFilter}
                />
              </>
            )
          })}
    </div>
  );
}

export default CartView;