import { useCallback } from "react";
import { TypeCoverageSummary } from "../../../../types-queries/Analyzer/Coverage";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { TypeMatchupSummary } from "../../../../types-queries/Analyzer/Matchups";
import { toFormattedTypeName, TypeName } from "../../../../types-queries/helpers";
import TypeIcon from "../../../Icons/TypeIcon";
import { TypeSummary } from "./TypeMatchup";

type TypeMatchupEntryProps = {
  typeName: TypeName
  summary: TypeSummary

  rowIdx: number
  
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
};

const TypeMatchupEntry = ({
  typeName,
  summary,
  
  rowIdx,

  onMouseOver,
  onMouseLeave,
}: TypeMatchupEntryProps) => {
  const { matchup, coverage } = summary;
  const { immunities, quadResistances, resistances, neutral: neutralMatchup, weaknesses, quadWeaknesses, } = matchup;
  const { noEffect, notVeryEffective, neutral: neutralCoverage, superEffective, } = coverage;

  const rankMatchupValue = useCallback((total: number, label: keyof TypeMatchupSummary) => {
    switch(label) {
      case 'immunities':
        if (total > 0) return 'good';
        else return '';
      case 'quadResistances':
        if (total > 0) return 'good';
        else return '';
      case 'resistances':
        if (total > 1) return 'good';
        else if (total > 0) return 'decent';
        else return 'ok';
      case 'neutral':
        if (total > 4) return 'ok';
        if (total === 4) return 'decent';
        else return 'good';
      case 'weaknesses':
        if (total > 3) return 'bad';
        else if (total > 2) return 'ok';
        else if (total > 1) return 'decent';
        else return 'good';
      case 'quadWeaknesses':
        if (total > 2) return 'bad';
        else if (total > 1) return 'ok';
        else if (total > 0) return 'decent';
        else return 'good';
      default:
        return '';
    }
  }, []);
  const rankCoverageValue = useCallback((total: number, label: keyof TypeCoverageSummary) => {
    switch(label) {
      case 'noEffect':
        if (total > 2) return 'bad';
        else if (total > 1) return 'ok';
        else if (total > 0) return 'decent';
        else return 'good';
      case 'notVeryEffective':
        if (total > 3) return 'bad';
        else if (total > 2) return 'ok';
        else if (total > 1) return 'decent';
        else return 'good';
      case 'neutral':
        if (total > 3) return 'good';
        if (total > 0) return '';
        else return '';
      case 'superEffective':
        if (total > 2) return 'good';
        else if (total > 0) return 'decent'; 
        else return 'ok';
      default:
        return '';
    }
  }, []);

  return (
    <tr
      role="row"
      aria-rowindex={rowIdx + 2}
      className="type-matchup__entry"
      onBlur={onMouseLeave}
      onMouseLeave={onMouseLeave}
    >
      <th
        scope="row"
        role="gridcell"
        aria-colindex={1}
        className={`
          type-matchup__icon
        `}
      >
        <TypeIcon
          typeIconDatum={{
            name: typeName,
            formattedName: toFormattedTypeName(typeName),
          }}
        />
      </th>
      <td
        role="gridcell"
        aria-colindex={2}
        className="type-matchup__0"
        onFocus={onMouseOver(immunities.memberPSIDs)}
        onMouseOver={onMouseOver(immunities.memberPSIDs)}
      >
        <a
          className={rankMatchupValue(immunities.total, 'immunities')}
        >
          {immunities.total}
        </a>
      </td>
      <td
        role="gridcell"
        aria-colindex={3}
        className="type-matchup__1-4"
        onFocus={onMouseOver(quadResistances.memberPSIDs)}
        onMouseOver={onMouseOver(quadResistances.memberPSIDs)}
      >
        <a
          className={rankMatchupValue(quadResistances.total, 'quadResistances')}
        >
          {quadResistances.total}
        </a>
      </td>
      <td
        role="gridcell"
        aria-colindex={4}
        className="type-matchup__1-2"
        onFocus={onMouseOver(resistances.memberPSIDs)}
        onMouseOver={onMouseOver(resistances.memberPSIDs)}
      >
        <a
          className={rankMatchupValue(resistances.total, 'resistances')}
        >
          {resistances.total}
        </a>
      </td>
      <td
        role="gridcell"
        aria-colindex={5}
        className="type-matchup__1"
        onFocus={onMouseOver(neutralMatchup.memberPSIDs)}
        onMouseOver={onMouseOver(neutralMatchup.memberPSIDs)}
      >
        <a
          className={rankMatchupValue(neutralMatchup.total, 'neutral')}
        >
          {neutralMatchup.total}
        </a>
      </td>
      <td
        role="gridcell"
        aria-colindex={6}
        className="type-matchup__2"
        onFocus={onMouseOver(weaknesses.memberPSIDs)}
        onMouseOver={onMouseOver(weaknesses.memberPSIDs)}
      >
        <a
          className={rankMatchupValue(weaknesses.total, 'weaknesses')}
        >
          {weaknesses.total}
        </a>
      </td>
      <td
        role="gridcell"
        aria-colindex={7}
        className="type-matchup__4"
        onFocus={onMouseOver(quadWeaknesses.memberPSIDs)}
        onMouseOver={onMouseOver(quadWeaknesses.memberPSIDs)}
      >
        <a
          className={rankMatchupValue(quadWeaknesses.total, 'quadWeaknesses')}
        >
          {quadWeaknesses.total}
        </a>
      </td>
      <td
        role="gridcell"
        aria-colindex={8}
        className="type-coverage__0"
        onFocus={onMouseOver(noEffect.memberPSIDs)}
        onMouseOver={onMouseOver(noEffect.memberPSIDs)}
      >
        <a
          className={rankCoverageValue(noEffect.total, 'noEffect')}
        >
          {noEffect.total}
        </a>
      </td>
      <td
        role="gridcell"
        aria-colindex={9}
        className="type-coverage__1-2"
        onFocus={onMouseOver(notVeryEffective.memberPSIDs)}
        onMouseOver={onMouseOver(notVeryEffective.memberPSIDs)}
      >
        <a
          className={rankCoverageValue(notVeryEffective.total, 'notVeryEffective')}
        >
          {notVeryEffective.total}
        </a>
      </td>
      <td
        role="gridcell"
        aria-colindex={10}
        className="type-coverage__1"
        onFocus={onMouseOver(neutralCoverage.memberPSIDs)}
        onMouseOver={onMouseOver(neutralCoverage.memberPSIDs)}
      >
        <a
          className={rankCoverageValue(neutralCoverage.total, 'neutral')}
        >
          {neutralCoverage.total}
        </a>
      </td>
      <td
        role="gridcell"
        aria-colindex={11}
        className="type-coverage__2"
        onFocus={onMouseOver(superEffective.memberPSIDs)}
        onMouseOver={onMouseOver(superEffective.memberPSIDs)}
      >
        <a
          className={rankCoverageValue(superEffective.total, 'superEffective')}
        >
          {superEffective.total}
        </a>
      </td>
    </tr>
  )
};

export default TypeMatchupEntry;