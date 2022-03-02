import { useCallback, useMemo } from "react";
import { TypeCoverageSummary } from "../../../../types-queries/Analyzer/Coverage";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { TypeMatchupSummary } from "../../../../types-queries/Analyzer/Matchups";
import { TypeName } from "../../../../types-queries/helpers";
import TypeIcon from "../../../Icons/TypeIcon";
import { TypeSummary } from "./TypeMatchup";

type TypeMatchupEntryProps = {
  typeName: TypeName
  summary: TypeSummary
  damagingMoveCount: number
  
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
};

const TypeMatchupEntry = ({
  typeName,
  summary,
  damagingMoveCount,

  onMouseOver,
  onMouseLeave,
}: TypeMatchupEntryProps) => {
  const { matchup, coverage } = summary;
  const { immunities, quadResistances, resistances, neutral: neutralMatchup, weaknesses, quadWeaknesses, } = matchup;
  const { noEffect, notVeryEffective, neutral: neutralCoverage, superEffective, } = coverage;

  const rankMatchupValue = useCallback((total: number, label: keyof TypeMatchupSummary) => {
    switch(label) {
      case 'immunities':
        if (total > 1) return 'great';
        if (total === 1) return 'good';
        else return 'decent';
      case 'quadResistances':
        if (total > 1) return 'great';
        if (total === 1) return 'good';
        else return 'decent';
      case 'resistances':
        if (total > 2) return 'great';
        else if (total === 2) return 'good';
        else if (total > 0) return 'decent';
        else return 'ok';
      case 'neutral':
        if (total > 4) return 'ok';
        if (total === 4) return 'decent';
        else return '';
      case 'weaknesses':
        if (total > 2) return 'bad';
        else if (total === 2) return 'ok';
        else if (total === 1) return 'decent';
        else return 'good';
      case 'quadWeaknesses':
        if (total > 1) return 'bad';
        else if (total === 1) return 'ok';
        else return 'good';
      default:
        return '';
    }
  }, []);
  const rankCoverageValue = useCallback((total: number, label: keyof TypeCoverageSummary) => {
    // If no damaging moves, type coverage is not relevant
    if (damagingMoveCount === 0) return '';
    const ratio = total / damagingMoveCount;

    switch(label) {
      case 'noEffect':
        if (ratio > 0.4) return 'bad';
        else if (ratio > 0.2) return 'ok';
        else if (ratio > 0) return 'decent';
        else return 'good';
      case 'notVeryEffective':
        if (ratio > 0.8) return 'bad';
        else if (ratio > 0.4) return 'ok';
        else if (ratio > 0) return 'decent';
        else return 'good';
      case 'neutral':
        if (total > 4) return 'good';
        if (total > 2) return 'decent';
        else return '';
      case 'superEffective':
        if (total > 4) return 'great';
        else if (total > 2) return 'good';
        else if (total > 0) return 'decent'; 
        else return 'ok';
      default:
        return '';
    }
  }, []);

  return (
    <div
      className="type-matchup__entry"
      onMouseLeave={onMouseLeave}
    >
      <div className="type-matchup__entry-icon">
        <TypeIcon
          typeName={typeName}
        />
      </div>
      <div
        className="type-matchup__entry-0"
        onMouseOver={onMouseOver(immunities.memberPSIDs)}
      >
        <span
          className={rankMatchupValue(immunities.total, 'immunities')}
        >
          {immunities.total}
        </span>
      </div>
      <div
        className="type-matchup__entry-1-4"
        onMouseOver={onMouseOver(quadResistances.memberPSIDs)}
      >
        <span
          className={rankMatchupValue(quadResistances.total, 'quadResistances')}
        >
          {quadResistances.total}
        </span>
      </div>
      <div
        className="type-matchup__entry-1-2"
        onMouseOver={onMouseOver(resistances.memberPSIDs)}
      >
        <span
          className={rankMatchupValue(resistances.total, 'resistances')}
        >
          {resistances.total}
        </span>
      </div>
      <div
        className="type-matchup__entry-1"
        onMouseOver={onMouseOver(neutralMatchup.memberPSIDs)}
      >
        <span
          className={rankMatchupValue(neutralMatchup.total, 'neutral')}
        >
          {neutralMatchup.total}
        </span>
      </div>
      <div
        className="type-matchup__entry-2"
        onMouseOver={onMouseOver(weaknesses.memberPSIDs)}
      >
        <span
          className={rankMatchupValue(weaknesses.total, 'weaknesses')}
        >
          {weaknesses.total}
        </span>
      </div>
      <div
        className="type-matchup__entry-4"
        onMouseOver={onMouseOver(quadWeaknesses.memberPSIDs)}
      >
        <span
          className={rankMatchupValue(quadWeaknesses.total, 'quadWeaknesses')}
        >
          {quadWeaknesses.total}
        </span>
      </div>
      <div className="type-matchup__buffer"></div>
      <div
        className="type-coverage__entry-0"
        onMouseOver={onMouseOver(noEffect.memberPSIDs)}
      >
        <span
          className={rankCoverageValue(noEffect.total, 'noEffect')}
        >
          {noEffect.total}
        </span>
      </div>
      <div
        className="type-coverage__entry-1-2"
        onMouseOver={onMouseOver(notVeryEffective.memberPSIDs)}
      >
        <span
          className={rankCoverageValue(notVeryEffective.total, 'notVeryEffective')}
        >
          {notVeryEffective.total}
        </span>
      </div>
      <div
        className="type-coverage__entry-1"
        onMouseOver={onMouseOver(neutralCoverage.memberPSIDs)}
      >
        <span
          className={rankCoverageValue(neutralMatchup.total, 'neutral')}
        >
          {neutralMatchup.total}
        </span>
      </div>
      <div
        className="type-coverage__entry-2"
        onMouseOver={onMouseOver(superEffective.memberPSIDs)}
      >
        <span
          className={rankCoverageValue(superEffective.total, 'superEffective')}
        >
          {superEffective.total}
        </span>
      </div>
    </div>
  )
};

export default TypeMatchupEntry;