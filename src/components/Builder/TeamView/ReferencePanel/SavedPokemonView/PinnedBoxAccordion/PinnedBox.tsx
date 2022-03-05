import { useEffect, useRef } from "react";
import { validatePokemon, ValidationFailureReason } from "../../../../../../hooks/App/PokemonFilter";
import { PokemonIconDatum } from "../../../../../../types-queries/helpers";
import { Dispatches, Filters } from "../../../../../App";
import { SavedPokemonClickHandlers } from "../../../TeamView";
import PinnedBoxPokemonIcon from "./PinnedBoxPokemonIcon";

type PinnedBoxProps = {
  box: {
    note: string
    pokemon: PokemonIconDatum[]
  }
  clickHandlers: SavedPokemonClickHandlers
  filters: Filters
  key: string
}

const PinnedBox = ({
  box,
  clickHandlers,
  filters,
  key,
}: PinnedBoxProps) => {
  const reason = useRef<ValidationFailureReason>('');
  const hasIcon = useRef(false);
  useEffect(() => {
    hasIcon.current = false;
  }, [box.pokemon, filters]);


  return (
    <div className={`box__icons-wrapper`}>
      <div className="box__icons-background">
        {box.pokemon.map(pokemonIconDatum => {
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
            <PinnedBoxPokemonIcon
              onPokemonSelect={clickHandlers.onPokemonSelect}
              key={key + '_' + pokemonIconDatum.psID + '_pinned-box_icon'}
              pokemonIconDatum={pokemonIconDatum}
            />
          )
        })}
      </div>
    </div>
  )
};

export default PinnedBox;