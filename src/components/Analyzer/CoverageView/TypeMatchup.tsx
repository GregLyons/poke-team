import { useMemo } from "react";
import { Team } from "../../../hooks/App/Team";
import { AbilityMatchupQuery, computeTypeMatchups, ItemMatchupQuery, TypingMatchupQuery, } from "../../../types-queries/Analyzer/Matchups";
import { MemberPokemon } from "../../../types-queries/Builder/MemberPokemon";
import { Filters } from "../../App";

type TypeMatchupProps = {
  filters: Filters
  team: Team
  abilityData: AbilityMatchupQuery
  itemData: ItemMatchupQuery
  typingData: TypingMatchupQuery
};

const TypeMatchup = ({
  filters,
  team,
  abilityData,
  itemData,
  typingData,
}: TypeMatchupProps) => {
  const typeMatchupMap = useMemo(() => {
    const nonNullMembers: MemberPokemon[] = (team[filters.genFilter.gen].members.filter(d => d !== null) as MemberPokemon[]);

    return computeTypeMatchups(
      nonNullMembers.map(d => {
        return {
          psID: d.psID,
          typing: d.typing,
          ability: d.ability?.psID,
          item: d.item?.psID,
        }
      }),
      {
        fromTypings: typingData.typesByName,
        fromAbilities: abilityData.abilitiesByPSIDs,
        fromItems: itemData.itemsByPSIDs,
      },
      filters.genFilter.gen,
    );
  }, [abilityData, itemData, typingData, team, filters, ]);


  return (
    <div>
      TypeMatchupView
    </div>
  )
};

export default TypeMatchup;