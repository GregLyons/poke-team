import { useEffect, useRef } from "react";
import { validatePokemon, ValidationFailureReason } from "../../../../hooks/App/PokemonFilter";
import { PokemonIconDatum } from "../../../../types-queries/helpers";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../App";
import BoxPokemonIcon from "./BoxPokemonIcon";

type BoxProps = {
  pokemonIconData: PokemonIconDatum[]
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
  key: string
}

const Box = ({
  pokemonIconData,
  dispatches,
  filters,
  key,
}: BoxProps) => {
  const reason = useRef<ValidationFailureReason>('');
  const hasIcon = useRef(false);
  useEffect(() => {
    hasIcon.current = false;
  }, [pokemonIconData, filters]);

  return (
    <div className={`box__icons-wrapper`}>
      <div className="box__icons-background">
        {pokemonIconData.map(pokemonIconDatum => {
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