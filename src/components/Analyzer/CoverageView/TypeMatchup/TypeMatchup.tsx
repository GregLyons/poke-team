import { useMemo } from "react";
import { computeMemberTypeCoverage, countDamagingMoves, INITIAL_TYPECOVERAGE_SUMMARY, MoveCoverageQuery, TypeCoverageSummary } from "../../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { AbilityMatchupQuery, computeTypeMatchups, INITIAL_TYPEMATCHUP_SUMMARY, ItemMatchupQuery, TypeMatchupSummary, TypingMatchupQuery, } from "../../../../types-queries/Analyzer/Matchups";
import { TypeName, TYPENAMES } from "../../../../types-queries/helpers";
import { Filters } from "../../../App";

import './TypeMatchup.css';
import TypeMatchupEntry from "./TypeMatchupEntry";

type TypeMatchupProps = {
  filters: Filters

  abilityData: AbilityMatchupQuery
  itemData: ItemMatchupQuery
  typingData: TypingMatchupQuery
  moveData: MoveCoverageQuery

  memberAndEntityPSIDs: MemberAndEntityPSIDs
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
};

export type TypeSummary = {
  matchup: TypeMatchupSummary
  coverage: TypeCoverageSummary
};

const TypeMatchup = ({
  filters,

  abilityData,
  itemData,
  typingData,
  moveData,

  memberAndEntityPSIDs,
  onMouseOver,
  onMouseLeave,
}: TypeMatchupProps) => {
  const typeSummaryMap: Map<TypeName, TypeSummary> = useMemo(() => {
    const gen = filters.genFilter.gen;

    const typeMatchupMap = computeTypeMatchups(
      memberAndEntityPSIDs,
      {
        fromTypings: typingData.typesByName,
        fromAbilities: abilityData.abilitiesByPSID,
        fromItems: itemData.itemsByPSID,
      },
      gen,
    );

    const typeCoverageMap = computeMemberTypeCoverage(
      memberAndEntityPSIDs,
      moveData.movesByPSID,
      gen,
    );

    // Combine the two maps to get a summary
    const typeSummaryMap = new Map<TypeName, TypeSummary>();
    for (let [typeName, typeGen] of TYPENAMES) {
      if (typeGen <= gen) {
        typeSummaryMap.set(typeName, {
          matchup: typeMatchupMap.get(typeName) || { ...INITIAL_TYPEMATCHUP_SUMMARY, },
          coverage: typeCoverageMap.get(typeName) || { ...INITIAL_TYPECOVERAGE_SUMMARY, },
        });
      }
    }

    return typeSummaryMap;
  }, [filters, abilityData, itemData, typingData, moveData, memberAndEntityPSIDs, ]);

  return (
    <div
      className="type-matchup__wrapper"
    >
      <div className="type-matchup__entry">
        <div className="type-matchup__icon">
        </div>
        <div className="type-matchup__0">
          0x
        </div>
        <div className="type-matchup__1-4">
          &frac14;x
        </div>
        <div className="type-matchup__1-2">
          &frac12;x
        </div>
        <div className="type-matchup__1">
          1x
        </div>
        <div className="type-matchup__2">
          2x
        </div>
        <div className="type-matchup__4">
          4x
        </div>
        <div className="type-matchup__buffer"></div>
        <div className="type-coverage__0">
          0x
        </div>
        <div className="type-coverage__1-2">
          &frac12;x
        </div>
        <div className="type-coverage__1">
          1x
        </div>
        <div className="type-coverage__entry2">
          2x
        </div>
      </div>
      {Array.from(typeSummaryMap.entries()).map(([typeName, summary]) => (
          <TypeMatchupEntry
            key={`type_matchup_${typeName}`}
            typeName={typeName}
            summary={summary}

            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          />
        ))}
    </div>
  )
};

export default TypeMatchup;