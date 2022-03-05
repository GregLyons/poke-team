import { MemberPokemon } from "../../../../../types-queries/Member/MemberPokemon";
import PokemonIcon from "../../../../Icons/PokemonIcon";
import { MemberDetailsHandlers } from "../../TeamView";
import MemberDetailBox from "../MemberDetailBox";
import CosmeticFormDropdown from "./CosmeticFormDropdown";

import './MemberDetailsCosmetic.css';

type MemberDetailsCosmeticProps = {
  member: MemberPokemon
  handlers: MemberDetailsHandlers
};

const MemberDetailsCosmetic = ({
  member,
  handlers,
}: MemberDetailsCosmeticProps) => {
  return (
    <MemberDetailBox
      forClass="cosmetic-wrapper"
      header={member.formattedName}
      content={<div
          className="member-details__icon-options-wrapper"
        >
          <div className="member-details__icon-wrapper">
            <PokemonIcon
              pokemonIconDatum={member.iconDatum}
              gender={member.gender}
            />
          </div>
          <div className="member-details__cosmetic">
            {member.cosmeticForms.length > 0 && <CosmeticFormDropdown
              member={member}
              updateCosmeticForm={handlers.updateCosmeticForm}
            />}
          </div>
        </div>}
    />
  );
};

export default MemberDetailsCosmetic;