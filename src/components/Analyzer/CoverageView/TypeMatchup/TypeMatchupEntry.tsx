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
        if (total > 0) return 'good';
        else return '';
      case 'quadResistances':
        if (total > 1) return 'great';
        if (total > 0) return 'good';
        else return '';
      case 'resistances':
        if (total > 2) return 'great';
        else if (total > 1) return 'good';
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
        else if (total > 0) return 'good';
        else return 'great';
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
        if (total > 3) return 'great';
        if (total > 0) return 'good';
        else return '';
      case 'superEffective':
        if (total > 3) return 'great';
        else if (total > 1) return 'good';
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
      <div className="type-matchup__icon">
        <TypeIcon
          typeName={typeName}
        />
      </div>
      <div
        className="type-matchup__0"
        onMouseOver={onMouseOver(immunities.memberPSIDs)}
      >
        <span
          className={rankMatchupValue(immunities.total, 'immunities')}
        >
          {immunities.total}
        </span>
      </div>
      <div
        className="type-matchup__1-4"
        onMouseOver={onMouseOver(quadResistances.memberPSIDs)}
      >
        <span
          className={rankMatchupValue(quadResistances.total, 'quadResistances')}
        >
          {quadResistances.total}
        </span>
      </div>
      <div
        className="type-matchup__1-2"
        onMouseOver={onMouseOver(resistances.memberPSIDs)}
      >
        <span
          className={rankMatchupValue(resistances.total, 'resistances')}
        >
          {resistances.total}
        </span>
      </div>
      <div
        className="type-matchup__1"
        onMouseOver={onMouseOver(neutralMatchup.memberPSIDs)}
      >
        <span
          className={rankMatchupValue(neutralMatchup.total, 'neutral')}
        >
          {neutralMatchup.total}
        </span>
      </div>
      <div
        className="type-matchup__2"
        onMouseOver={onMouseOver(weaknesses.memberPSIDs)}
      >
        <span
          className={rankMatchupValue(weaknesses.total, 'weaknesses')}
        >
          {weaknesses.total}
        </span>
      </div>
      <div
        className="type-matchup__4"
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
        className="type-coverage__0"
        onMouseOver={onMouseOver(noEffect.memberPSIDs)}
      >
        <span
          className={rankCoverageValue(noEffect.total, 'noEffect')}
        >
          {noEffect.total}
        </span>
      </div>
      <div
        className="type-coverage__1-2"
        onMouseOver={onMouseOver(notVeryEffective.memberPSIDs)}
      >
        <span
          className={rankCoverageValue(notVeryEffective.total, 'notVeryEffective')}
        >
          {notVeryEffective.total}
        </span>
      </div>
      <div
        className="type-coverage__1"
        onMouseOver={onMouseOver(neutralCoverage.memberPSIDs)}
      >
        <span
          className={rankCoverageValue(neutralCoverage.total, 'neutral')}
        >
          {neutralCoverage.total}
        </span>
      </div>
      <div
        className="type-coverage__2"
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