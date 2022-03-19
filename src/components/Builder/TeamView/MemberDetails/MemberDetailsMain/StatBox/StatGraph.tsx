import { BaseStatName, computeMaxStat, computeStat, GenNum, StatTable, toAbbreviatedBaseStatName } from "../../../../../../types-queries/entities";
import { MemberNature } from "../../../../../../types-queries/Member/MemberNature";

type StatGraphProps = {
  gen: GenNum
  baseStats: StatTable
  level: number
  nature?: MemberNature
  evs: StatTable
  ivs: StatTable
  isShedinja: boolean
};

const StatGraph = ({
  gen,
  level,
  baseStats,
  nature,
  evs,
  ivs,
  isShedinja,
}: StatGraphProps) => {

  let statObj = { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0, };
  let maxStatObj = { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0, };
  let statPercentObj = { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0, };

  for (let key of Object.keys(evs)) {
    // Type guard
    if (key === '__typename') continue;
    const statName = (key as BaseStatName);
    if (!statName) continue;

    statObj[statName] = computeStat({
      statName,
      level,
      base: baseStats[statName],
      natureModifiesStat: nature?.modifiesStat,
      ev: evs[statName],
      ivOrDV: ivs[statName],
      gen,
      isShedinja,
    });
    maxStatObj[statName] = computeMaxStat({
      statName,
      gen,
      isShedinja,
    });

    statPercentObj[statName] = Math.pow( statObj[statName] / maxStatObj[statName], 0.7 ) * 100.0;
  };

  return (
    <ul
      className="member-details__graph-wrapper"
    >
      {Object.keys(evs).map(key => {
        // Type guard
        if (key === '__typename') return;
        const statName: BaseStatName = (key as BaseStatName);
        if (!statName) return;

        const value = statObj[statName];
        let rating: 'bad' | 'ok' | 'decent' | 'good' | 'great';
        if (value <= 150) {
          rating = 'bad';
        } else if (value <= 250) {
          rating = 'ok';
        } else if (value <= 350) {
          rating = 'decent';
        } else if (value <= 450) {
          rating = 'good';
        } else {
          rating = 'great';
        }

        return (
          <li
            key={statName}
          >
            <dl
              className="member-details__graph-row-wrapper"
            >
              <dt className="member-details__graph-name">
                {statName === 'hp'
                  ? <>{toAbbreviatedBaseStatName(statName)}</>
                  : toAbbreviatedBaseStatName(statName)
                }
              </dt>
              <dd className="member-details__graph-value">
                {Math.floor(value)}
              </dd>
              <div className={`
                member-details__graph-row
                ${rating}
              `}
                style={{
                  width: statPercentObj[statName] + '%',
                  minWidth: '10px',
                  height: '1rem',
                }}
              />
            </dl>
          </li>
        )
      })}
    </ul>
  )
};

export default StatGraph;