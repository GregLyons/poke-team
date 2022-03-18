import { BaseStatName, StatTable, toAbbreviatedBaseStatName, toFormattedBaseStatName } from "../../../../../../types-queries/entities";

type SpreadTableProps = {
  statTable: StatTable
  tableFor: 'ev' | 'iv'
};

const SpreadTable = ({
  statTable,
  tableFor,
}: SpreadTableProps) => {
  return (
    <ul
      className={`
        member-details__${tableFor}s-wrapper
      `}
    >
      {Object.entries(statTable).map(([key, value]) => {
        // Type guard
        const statName = (key as BaseStatName);
        if (!statName) return <></>;

        const abbrStatName = toAbbreviatedBaseStatName(statName);

        return (
          <li
            title={`
              Entry for ${toFormattedBaseStatName(statName)}.
            `}
            key={abbrStatName}
          >
            <dl
              className={`
                member-details__${tableFor}-wrapper
              `}
            >
              <dt
                className={`
                  member-details__${tableFor}-name
                `}
              >
                {abbrStatName.length === 3 ? abbrStatName : <>{abbrStatName}&nbsp;</>}
              </dt>
              <dd
                className={`
                  member-details__${tableFor}-value
                `}
              >
                {value}
              </dd>
            </dl>
          </li>
        )
      })}
    </ul>
  )
};

export default SpreadTable;