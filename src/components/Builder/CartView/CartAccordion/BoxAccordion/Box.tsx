import { useEffect, useRef } from "react";
import { BoxInCart } from "../../../../../hooks/App/Cart";
import { validatePokemon, ValidationFailureReason } from "../../../../../hooks/App/PokemonFilter";
import { PokemonIconDatum } from "../../../../../types-queries/helpers";
import { Dispatches, Filters } from "../../../../App";
import BoxPokemonIcon from "./BoxPokemonIcon";

type BoxProps = {
  box: BoxInCart
  dispatches: Dispatches
  filters: Filters
  key: string
}

const Box = ({
  box,
  dispatches,
  filters,
  key,
}: BoxProps) => {
  const reason = useRef<ValidationFailureReason>('');
  const hasIcon = useRef(false);
  useEffect(() => {
    hasIcon.current = false;
  }, [box.pokemon, filters]);

  return (
    <div className={`box__icons-wrapper`}>
      <div className="box__icons-background">
        {box && box.pokemon && box.pokemon.map(pokemonIconDatum => {
          const psID = pokemonIconDatum.psID;
          
          // E.g. DUMMY_POKEMON_DATUM
          if (!psID) return;

          const { validated, reason: reasonForFailure } = validatePokemon({
            pokemonIconDatum, 
            ...filters,
          });

          if (!validated) {
            reason.current = reasonForFailure || '';
            return;
          }

          hasIcon.current = true;

          return (
            <BoxPokemonIcon
              dispatches={dispatches}
              key={key + '_' + pokemonIconDatum.name + '_icon'}
              pokemonIconDatum={pokemonIconDatum}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Box;