import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { DamageMatchupResult } from "../../../../utils/damageCalc";
import PokemonIcon from "../../../Icons/PokemonIcon";
import VersusMatchupCell from "./VersusMatchupCell";

type VersusMatchupRowProps = {
  userMember: MemberPokemon | null
  resultRow: (DamageMatchupResult | null)[]
};

const VersusMatchupRow = ({
  userMember,
  resultRow,
}: VersusMatchupRowProps) => {
  return (
    <>
      <div className="versus-matchup__icon">
        <PokemonIcon
          pokemonIconDatum={userMember?.iconDatum || DUMMY_POKEMON_ICON_DATUM}
          gender={userMember?.gender}
        />
      </div>
      {resultRow.map((result, colIdx) => <VersusMatchupCell
        key={colIdx}
        result={result}
      />)}
    </>
  );
};

export default VersusMatchupRow;