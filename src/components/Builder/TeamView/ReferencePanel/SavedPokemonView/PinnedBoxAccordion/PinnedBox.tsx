import { useEffect, useRef } from "react";
import { BoxInCart } from "../../../../../../hooks/App/Cart";
import { validatePokemon, ValidationFailureReason } from "../../../../../../hooks/App/PokemonFilter";
import { DUMMY_POKEMON_ICON_DATUM, PokemonIconDatum } from "../../../../../../types-queries/helpers";
import { Dispatches, Filters } from "../../../../../App";
import BoxPokemonIcon from "../../../../CartView/CartAccordion/BoxAccordion/BoxPokemonIcon";
import { ReferencePanelView, SavedPokemonClickHandlers } from "../../../TeamView";
import PinnedBoxPokemonIcon from "./PinnedBoxPokemonIcon";

type PinnedBoxProps = {
  box: {
    note: string
    pokemon: PokemonIconDatum[]
  }
  clickHandlers: SavedPokemonClickHandlers
  dispatches: Dispatches
  filters: Filters
  key: string
}

const PinnedBox = ({
  box,
  clickHandlers,
  dispatches,
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