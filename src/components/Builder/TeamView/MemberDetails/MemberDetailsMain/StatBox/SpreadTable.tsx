import { BaseStatName, StatTable, toAbbreviatedBaseStatName } from "../../../../../../types-queries/entities";

type SpreadTableProps = {
  statTable: StatTable
  tableFor: 'ev' | 'iv'
};

const SpreadTable = ({
  statTable,
  tableFor,
}: SpreadTableProps) => {
  return (
    <div
      className={`
        member-details__${tableFor}s-wrapper
      `}
    >
      {Object.entries(statTable).map(([key, value]) => {
        // Type guard
        const statName = (key as BaseStatName);
        if (!statName) return <></>;
        
        let classSuffix;
        switch(statName) {
          case 'specialAttack':
            classSuffix = 'special-attack';
            break;
          case 'specialDefense':
            classSuffix = 'special-defense';
            break;
          default:
            classSuffix = statName;
        }

        const abbrStatName = toAbbreviatedBaseStatName(statName);

        return (
          <div
            key={abbrStatName}
            className={`
              member-details__${tableFor}-wrapper
              member-details__${tableFor}-wrapper--${classSuffix}
            `}
          >
            <div
              className={`
                member-details__${tableFor}-name
                member-details__${tableFor}-name--${classSuffix}
              `}
            >
              {abbrStatName.length === 3 ? abbrStatName : <>{abbrStatName}&nbsp;</>}
            </div>
            <div
              className={`
                member-details__${tableFor}-value
                member-details__${tableFor}-value--${classSuffix}
              `}
            >
              {value}
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default SpreadTable;