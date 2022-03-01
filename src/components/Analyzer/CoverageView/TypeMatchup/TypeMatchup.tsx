import { useMemo } from "react";
import { Team } from "../../../../hooks/App/Team";
import { AbilityMatchupQuery, computeTypeMatchups, ItemMatchupQuery, TypingMatchupQuery, } from "../../../../types-queries/Analyzer/Matchups";
import { MemberPokemon } from "../../../../types-queries/Builder/MemberPokemon";
import { Filters } from "../../../App";

import './TypeMatchup.css';
import TypeMatchupEntry from "./TypeMatchupEntry";

type TypeMatchupProps = {
  filters: Filters
  team: Team
  abilityData: AbilityMatchupQuery
  itemData: ItemMatchupQuery
  typingData: TypingMatchupQuery
  onMouseOver: (psIDs: string[]) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
};

const TypeMatchup = ({
  filters,
  team,
  abilityData,
  itemData,
  typingData,
  onMouseOver,
  onMouseLeave,
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
        fromAbilities: abilityData.abilitiesByPSID,
        fromItems: itemData.itemsByPSID,
      },
      filters.genFilter.gen,
    );
  }, [abilityData, itemData, typingData, team, filters, ]);

  return (
    <div
      className="type-matchup__wrapper"
    >
      <div className="type-matchup__entry">
        <div className="type-matchup__entry-icon">
        </div>
        <div className="type-matchup__entry-0">
          0x
        </div>
        <div className="type-matchup__entry-1-4">
          &frac14;x
        </div>
        <div className="type-matchup__entry-1-2">
          &frac12;x
        </div>
        <div className="type-matchup__entry-1">
          1x
        </div>
        <div className="type-matchup__entry-2">
          2x
        </div>
        <div className="type-matchup__entry-4">
          4x
        </div>
      </div>
      {Array.from(typeMatchupMap.entries()).map(([key, value]) => {
        const [typeName, summary] = [key, value];
        return (
          <TypeMatchupEntry
            key={`type_matchup_${typeName}`}
            typeName={typeName}
            summary={summary}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          />
        )
      })}
    </div>
  )
};

export default TypeMatchup;