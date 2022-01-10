import { 
  createContext,
  FC,
  useState,
} from "react";

import { NUMBER_OF_GENS } from "./utils/constants";
import { Pokemon } from "./typeDefs/Pokemon";

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
    if (team.length > 6) return; 

    setTeam(
      team.concat(pokemon)
    );
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


// Gen context
// #region

interface GenContextInterface {
  gen: number,
  setGen: (newGen: number) => void,
}

export const GenContext = createContext<GenContextInterface>({
  gen: NUMBER_OF_GENS,
  setGen: (newGen) => { return; },
});

export const GenProvider: FC = ({ children }) => {
  const [gen, setTheGen] = useState<number>(NUMBER_OF_GENS);

  const setGen = (gen: number) => {
    setTheGen(gen);
  };

  return (
    <GenContext.Provider
      value={{
        gen,
        setGen,
      }}
    >
      {children}
    </GenContext.Provider>
  );
};

// #endregion

// Component composing all the providers
export const ContextProvider: FC = ({ children }) => {
  return (
    <GenProvider>
      <TeamProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </TeamProvider>
    </GenProvider>
  )
}