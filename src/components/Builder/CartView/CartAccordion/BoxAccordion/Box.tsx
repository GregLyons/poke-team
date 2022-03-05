import { useEffect, useRef } from "react";
import { BoxInCart } from "../../../../../hooks/App/Cart";
import { validatePokemon, ValidationFailureReason } from "../../../../../hooks/App/PokemonFilter";
import { Filters } from "../../../../App";
import BoxPokemonIcon from "./BoxPokemonIcon";

type BoxProps = {
  box: BoxInCart
  filters: Filters
  key: string
}

const Box = ({
  box,
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
              key={key + '_' + pokemonIconDatum.psID + '_icon'}
              pokemonIconDatum={pokemonIconDatum}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Box;