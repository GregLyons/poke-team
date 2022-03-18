import { useMemo, useRef } from "react";
import { useRemoveFromTabOrder } from "../../../../hooks/useRemoveFromTabOrder";
import { computeMemberTypeCoverage, INITIAL_TYPECOVERAGE_SUMMARY, MoveCoverageQuery, TypeCoverageSummary } from "../../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { AbilityMatchupQuery, computeTypeMatchups, INITIAL_TYPEMATCHUP_SUMMARY, ItemMatchupQuery, TypeMatchupSummary, TypingMatchupQuery } from "../../../../types-queries/Analyzer/Matchups";
import { TypeName, TYPENAMES } from "../../../../types-queries/helpers";
import { handleGridKeyDown } from "../../../../utils/gridFocusManagement";
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
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
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

  const grid = useRef<HTMLTableSectionElement>(null);

  useRemoveFromTabOrder(grid);
  
  return (
    <table
      className="type-matchup__wrapper"
    >
      <tbody
        ref={grid}
        className="type-matchup__table-body"
        role="grid"
        tabIndex={0}
        onKeyDown={e => handleGridKeyDown({
          grid,
          numRows: Array.from(typeSummaryMap.keys()).length + 1,
          numCols: 11,
          e,
          interactiveHeaders: false,
        })}
      >
      <tr
        role="row"
        aria-rowindex={1}
        className="type-matchup__entry"
      >
        <th
          scope="col"  
          role="columnheader"
          aria-colindex={1}
          className={`
            type-matchup__icon
          `}
        >
          Type
        </th>
        <th
          scope="col"  
          role="columnheader"
          aria-colindex={2}
          className={`
            type-matchup__0
          `}
        >
          0x
        </th>
        <th
          scope="col"  
          role="columnheader"
          aria-colindex={3}
          className={`
            type-matchup__1-4
          `}
        >
          &frac14;x
        </th>
        <th
          scope="col"  
          role="columnheader"
          aria-colindex={4}
          className={`
            type-matchup__1-2
          `}
        >
          &frac12;x
        </th>
        <th
          scope="col"  
          role="columnheader"
          aria-colindex={5}
          className={`
            type-matchup__1
          `}
        >
          1x
        </th>
        <th
          scope="col"  
          role="columnheader"
          aria-colindex={6}
          className={`
            type-matchup__2
          `}
        >
          2x
        </th>
        <th
          scope="col"  
          role="columnheader"
          aria-colindex={7}
          className={`
            type-matchup__4
          `}
        >
          4x
        </th>
        <th
          scope="col"  
          role="columnheader"
          aria-colindex={8}
          className={`
            type-coverage__0
          `}
        >
          0x
        </th>
        <th
          scope="col"  
          role="columnheader"
          aria-colindex={9}
          className={`
            type-coverage__1-2
          `}
        >
          &frac12;x
        </th>
        <th
          scope="col"  
          role="columnheader"
          aria-colindex={10}
          className={`
            type-coverage__1
          `}
        >
          1x
        </th>
        <th
          scope="col"  
          role="columnheader"
          aria-colindex={11}
          className={`
            type-coverage__entry2
          `}
        >
          2x
        </th>
      </tr>
      {Array.from(typeSummaryMap.entries()).map(([typeName, summary], rowIdx) => (
          <TypeMatchupEntry
            key={typeName}
            rowIdx={rowIdx}
            typeName={typeName}
            summary={summary}

            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </tbody>
    </table>
  )
};

export default TypeMatchup;