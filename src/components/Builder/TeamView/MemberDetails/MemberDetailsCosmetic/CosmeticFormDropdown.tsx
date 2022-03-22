import { MemberPokemon } from "../../../../../types-queries/Member/MemberPokemon";

type CosmeticFormDropdownProps = {
  member: MemberPokemon
  updateCosmeticForm: (psID: string) => void
};

const CosmeticFormDropdown = ({
  member,
  updateCosmeticForm,
}: CosmeticFormDropdownProps) => {
  return (
    <div></div>
    // <DropdownMenu
    //   title={`COSMETIC`}
    //   items={member.cosmeticForms.map(d => {
    //     const selected = d.psID === member.psID;

    //     return {  
    //       id: d.psID,
    //       label: (
    //         <div
    //           className={`
    //             member-details__cosmetic-form-icon
    //             ${selected 
    //               ? "--selected"
    //               : ''
    //             }
    //           `}
    //         >
    //           <PokemonIcon
    //             pokemonIconDatum={d}
    //             gender={member.gender}
    //           />
    //         </div>
    //       ),
    //       selected,
    //     }
    //   })}
    //   toggleSelect={updateCosmeticForm}
    //   dropdownWidth={'15ch'}
    //   itemWidth={'40px'}
    //   backgroundLight="green"
    // />
  )
};

export default CosmeticFormDropdown;