import { 
  createContext,
  FC,
  useState,
} from "react";

import { NUMBER_OF_GENS } from "./utils/constants";
import { Pokemon } from "./types-queries/Pokemon";
import { GenerationNum } from "./types-queries/Generation";

// Team context
// #region

export interface TeamContextInterface {
  team: Pokemon[],
  addToTeam: (pokemon: Pokemon) => void,
  removeFromTeam: (idx: number) => void,
}

export const TeamContext = createContext<TeamContextInterface>({
  team: [],
  addToTeam: (pokemon) => { return; },
  removeFromTeam: (pokemon) => { return; },
});

export const TeamProvider: FC = ({ children }) => {
  const [team, setTeam] = useState<Pokemon[]>([]);

  const addToTeam = (pokemon: Pokemon) => {
    if (team.length < 6) {
      setTeam(
        team.concat(pokemon)
      );
    }
  };

  const removeFromTeam = (idx: number) => {
    setTeam(
      team.filter((_: Pokemon, i: number) => idx !== i)
      );
    }

  return (
    <TeamContext.Provider
      value={{
        team,
        addToTeam,
        removeFromTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

// #endregion

// Cart context
// #region

export interface CartContextInterface {
  cart: Pokemon[],
  addToCart: (pokemon: Pokemon) => void,
  removeFromCart: (idx: number) => void,
}

export const CartContext = createContext<CartContextInterface>({
  cart: [],
  addToCart: (pokemon) => { return; },
  removeFromCart: (pokemon) => { return; },
});


export const CartProvider: FC = ({ children }) => {
  const [cart, setCart] = useState<Pokemon[]>([]);

  const addToCart = (pokemon: Pokemon) => {
    setCart(
      cart.concat(pokemon)
    );
  };

  const removeFromCart = (idx: number) => {
    setCart(
      cart.filter((_: Pokemon, i: number) => idx !== i)
      );
    }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// #endregion



// #endregion

// Component composing all the providers
export const ContextProvider: FC = ({ children }) => {
  return (
      <TeamProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </TeamProvider>
  )
}