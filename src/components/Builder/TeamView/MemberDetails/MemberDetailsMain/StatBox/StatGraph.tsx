import { BaseStatName, GenNum, StatTable, toAbbreviatedBaseStatName } from "../../../../../../types-queries/entities";
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

    // Compute relevant factors 
    // #region 

    const base = baseStats[statName];
    const maxBase = 255;

    const natureMod = gen > 2
      // Gen 3 onward
      ? nature?.modifiesStat.boosts === statName
        // Nature boosts stat
        ? 1.1
        : nature?.modifiesStat.reduces === statName
          // Nature reduces stat
          ? 0.9
          // Nature doesn't modify stat
          : 1.0
      // Gens 1 and 2
      : 1.0;
    const maxNatureMod = statName === 'hp' ? 1.0 : 1.1;

    const ev = gen > 2
      // Gen 3 onward
      ? evs[statName]
      // Gens 1 and 2, same as max StatExp
      : 252;
    const maxEV = 252;
    
    const iv = gen > 2
      // Gen 3 onward
      ? ivs[statName]
      // Gens 1 and 2, same as DV * 2--except for IV of 31 
      : ivs[statName] * 2;
    const maxIV = gen > 2 ? 31 : 30;

    // #endregion

    // Compute stats themselves
    // #region

    // HP stat uses different formula
    if (statName === 'hp') {
      // Shedinja always has 1 hp
      if (isShedinja) {
        statObj[statName] = 1;
        maxStatObj[statName] = 1;
      }
      else {
        statObj[statName] = Math.floor(
          ((2 * base + iv + Math.floor(ev / 4)) * level) / 100
        ) + level + 10;
        maxStatObj[statName] = Math.floor(
          ((2 * maxBase + maxIV + Math.floor(maxEV / 4)) * 100) / 100
        ) + 100 + 10;
      }
    }
    // Other stats all use same formula
    else {
      statObj[statName] = (Math.floor(
        ((2 * base + iv + Math.floor(ev / 4)) * level) / 100
      ) + 5) * natureMod;
      maxStatObj[statName] = (Math.floor(
        ((2 * maxBase + maxIV + Math.floor(maxEV / 4)) * 100) / 100
      ) + 5) * maxNatureMod;
    }

    // #endregion

    // Compute stat percentages
    // #region

    statPercentObj[statName] = Math.pow( statObj[statName] / maxStatObj[statName], 0.7 ) * 100.0;

    // #endregion
  };

  return (
    <div
      className="member-details__graph-wrapper"
    >
      {Object.keys(evs).map(key => {
        // Type guard
        if (key === '__typename') return <div></div>;
        const statName: BaseStatName = (key as BaseStatName);
        if (!statName) return <div></div>;

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
          <div
            className="member-details__graph-row-wrapper"
            key={statName}
          >
            <div className="member-details__graph-name">
              {statName === 'hp'
                ? <>{toAbbreviatedBaseStatName(statName)}</>
                : toAbbreviatedBaseStatName(statName)
              }
            </div>
            <div className="member-details__graph-value">
              {Math.floor(value)}
            </div>
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
          </div>
        )
      })}
    </div>
  )
};

export default StatGraph;