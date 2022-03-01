import { useCallback } from "react";
import { DefensiveTypeMatchupSummary } from "../../../../types-queries/Analyzer/Matchups";
import { TypeName } from "../../../../types-queries/helpers";
import TypeIcon from "../../../Icons/TypeIcon";

type TypeMatchupEntryProps = {
  typeName: TypeName
  summary: DefensiveTypeMatchupSummary
  onMouseOver: (psIDs: string[]) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
};

const TypeMatchupEntry = ({
  typeName,
  summary,
  onMouseOver,
  onMouseLeave,
}: TypeMatchupEntryProps) => {
  const { immunities, quadResistances, resistances, neutral, weaknesses, quadWeaknesses } = summary;

  const rankValue = useCallback((total: number, label: keyof DefensiveTypeMatchupSummary) => {
    switch(label) {
      case 'immunities':
        if (total > 0) return 'good';
        else return '';
      case 'quadResistances':
        if (total > 0) return 'good';
        else return '';
      case 'resistances':
        if (total > 2) return 'great';
        else if (total === 2) return 'good';
        else if (total === 1) return 'decent';
        else if (total === 0) return 'ok';
        else return '';
      case 'neutral':
        if (total > 5) return 'ok';
        else if (total === 5) return 'decent'; 
        else return '';
      case 'weaknesses':
        if (total > 2) return 'bad';
        else if (total === 2) return 'ok';
        else if (total === 1) return 'decent';
        else return 'good';
      case 'quadWeaknesses':
        if (total > 1) return 'bad';
        else if (total === 1) return 'ok';
        else return '';
      default:
        return '';
    }
  }, []);

  return (
    <div
      className="type-matchup__entry"
    >
      <div className="type-matchup__entry-icon">
        <TypeIcon
          typeName={typeName}
        />
      </div>
      <div
        className="type-matchup__entry-0"
        onMouseOver={onMouseOver(immunities.psIDs)}
        onMouseLeave={onMouseLeave}
      >
        <span
          className={rankValue(immunities.total, 'immunities')}
        >
          {immunities.total}
        </span>
      </div>
      <div
        className="type-matchup__entry-1-4"
        onMouseOver={onMouseOver(quadResistances.psIDs)}
        onMouseLeave={onMouseLeave}
      >
        <span
          className={rankValue(quadResistances.total, 'quadResistances')}
        >
          {quadResistances.total}
        </span>
      </div>
      <div
        className="type-matchup__entry-1-2"
        onMouseOver={onMouseOver(resistances.psIDs)}
        onMouseLeave={onMouseLeave}
      >
        <span
          className={rankValue(resistances.total, 'resistances')}
        >
          {resistances.total}
        </span>
      </div>
      <div
        className="type-matchup__entry-1"
        onMouseOver={onMouseOver(neutral.psIDs)}
        onMouseLeave={onMouseLeave}
      >
        <span
          className={rankValue(neutral.total, 'neutral')}
        >
          {neutral.total}
        </span>
      </div>
      <div
        className="type-matchup__entry-2"
        onMouseOver={onMouseOver(weaknesses.psIDs)}
        onMouseLeave={onMouseLeave}
      >
        <span
          className={rankValue(weaknesses.total, 'weaknesses')}
        >
          {weaknesses.total}
        </span>
      </div>
      <div
        className="type-matchup__entry-4"
        onMouseOver={onMouseOver(quadWeaknesses.psIDs)}
        onMouseLeave={onMouseLeave}
      >
        <span
          className={rankValue(quadWeaknesses.total, 'quadWeaknesses')}
        >
          {quadWeaknesses.total}
        </span>
      </div>
    </div>
  )
};

export default TypeMatchupEntry;