import {
  Cart,
} from "../../App";
import CartViewGroup from "./CartViewGroup";

type CartViewProps = {
  cart: Cart
}

const CartView = ({
  cart,
}: CartViewProps) => {
  return (
    <>
      {Object.entries(cart).map(([note, pokemon]) => {
        return (
          <div
            key={note}
            >
            <h2>{note}</h2>
            <CartViewGroup 
              pokemonIconData={pokemon}
            />
          </div>
        )
      })}
    </>
  )
}

export default CartView;