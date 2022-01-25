import {
  useState,
} from "react";
import {
  PokemonIconDatum,
} from "../../../types-queries/helpers";
import {
  getPokemonIcon,
} from "../../../utils/sprites";
import {
  CartAction,
  TeamAction,
} from "../../../hooks/app-hooks";

type CartViewPokemonIconProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  key: string
  pokemonIconDatum: PokemonIconDatum
}

const CartViewPokemonIcon = ({
  dispatchCart,
  dispatchTeam,
  key,
  pokemonIconDatum,
}: CartViewPokemonIconProps) => {
  const {left, top} = getPokemonIcon(pokemonIconDatum);

  return (
    <div className="builder__pokemon-icon-container"
      style={{
        width: '40px',
        height: '30px',
        display: 'inline-block',
      }}
    >
      <div className="builder__pokemon-icon-background" 
        style={{
          width: '40px',
          height: '30px',
        }}
      />
      <div
        className="builder__pokemon-icon"
        title={`Icon for the Pokemon ${pokemonIconDatum.formattedName}`}
        key={key}
        style={{
          width: '40px',
          height: '30px',
          display: 'inline-block',
          backgroundPosition: `${left}px ${top}px`,
        }}              
      />
    </div>
  );
};

export default CartViewPokemonIcon;