import { HPTypeName } from "@pkmn/data";
import { Team } from "../../../../hooks/App/Team";
import { BaseStatName, DUMMY_POKEMON_ICON_DATUM, ivsToHiddenPower, toAbbreviatedBaseStatName, } from "../../../../types-queries/helpers";
import { Dispatches, Filters } from "../../../App";
import Slider from "../../../Reusables/Slider/Slider";
import TextInput from "../../../Reusables/TextInput/TextInput";
import ItemIcon from "../../../Icons/ItemIcon";
import PokemonIcon from "../../../Icons/PokemonIcon";
import TypeIcon from "../../../Icons/TypeIcon";
import { MemberDetailsHandlers, ReferencePanelView } from "../TeamView";
import StatGraph from "./MemberDetailsMain/StatBox/StatGraph";
import CosmeticFormDropdown from "./MemberDetailsCosmetic/CosmeticFormDropdown";

import './MemberDetails.css';
import MoveSlot from "./MemberDetailsMain/MoveSlot";
import MemberDetailBox from "./MemberDetailBox";
import MemberDetailsExtra from "./MemberDetailsExtra/MemberDetailsExtra";
import MemberDetailsMain from "./MemberDetailsMain/MemberDetailsMain";
import MemberDetailsCosmetic from "./MemberDetailsCosmetic/MemberDetailsCosmetic";

type MemberDetailsProps = {
  dispatches: Dispatches
  filters: Filters
  handlers: MemberDetailsHandlers
  team: Team
  memberSlot: number | null
  view: ReferencePanelView
};

const MemberDetails = ({
  filters,
  handlers,
  team,
  memberSlot,
  view,
}: MemberDetailsProps) => {
  const member = memberSlot !== null
    ? team[filters.genFilter.gen].members[memberSlot]
    : null;

  if (member === null || memberSlot === null) return (
    <div className="member-details__wrapper member-details__wrapper--inactive" />
  );

  const gen = filters.genFilter.gen;

  return (
    <div className="member-details__wrapper">
      <MemberDetailsCosmetic
        member={member}
        handlers={handlers}
      />
      <MemberDetailsExtra
        member={member}
        handlers={handlers}
        gen={gen}
      />
      <MemberDetailsMain
        member={member}
        handlers={handlers}
        gen={gen}
        view={view}
      />
    </div>
  )
};

let a: HPTypeName

export default MemberDetails;