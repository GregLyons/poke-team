import { MemberPokemon } from "../../../../types-queries/Builder/MemberPokemon";
import { iconEdgeToIconDatum } from "../../../../types-queries/helpers";
import DropdownMenu from "../../../Reusables/DropdownMenu/DropdownMenu";
import PokemonIcon from "../../../Icons/PokemonIcon";

type CosmeticFormDropdownProps = {
  member: MemberPokemon
  updateCosmeticForm: (psID: string) => void
};

const CosmeticFormDropdown = ({
  member,
  updateCosmeticForm,
}: CosmeticFormDropdownProps) => {
  return (
    <DropdownMenu
      title={`Cosmetic`}
      items={member.cosmeticForms.map(d => {
        const selected = d.psID === member.psID;

        return {  
          id: d.psID,
          label: (
            <div
              className={`
                member-details__cosmetic-form-icon
                ${selected 
                  ? "member-details__cosmetic-form-icon--selected"
                  : ''
                }
              `}
            >
              <PokemonIcon
                pokemonIconDatum={d}
                gender={member.gender}
              />
            </div>
          ),
          selected,
        }
      })}
      toggleSelect={updateCosmeticForm}
      dropdownWidth={'100%'}
      itemWidth={'50px'}
      backgroundLight="green"
    />
  )
};

export default CosmeticFormDropdown;